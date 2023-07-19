import React from "react";
import { Card, CardMedia, Tooltip } from "@mui/material";
import { Building, Construction, Edit, GitFork, Loader, Lock } from "lucide-react";
import { MuiModal } from "@/components/shared/MuiModal";
import { Chip,Stack } from "@mui/material";
import { CardMenu } from "@/components/shared/CardMenu";
import MenuItem from "@mui/material/MenuItem";
import { UpdateRepoForm } from "./UpdateRepoForm";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useOne } from "@refinedev/core";
import { IViewerOneRepo } from "@/state/providers/repos/query/viewer_one_repos_types";
import { RepoTopicsForm } from "./RepotopicsForm";
import { ForksyncCheck } from "./ForksyncCheck";
import { RepoLanguages } from "./RepoLanguages";
import { ErrorrMessageComponent } from "@/components/shared/Errorrmessage";
import { StepBack } from "lucide-react";
import { PackageJason } from "./PackageJason";


interface OneRepoProps {}

export function OneRepo({}: OneRepoProps) {
  const params = useParams();


const [searchParams, setSearchParams] = useSearchParams();
const nameWithOwner = searchParams.get("nameWithOwner");
  React.useEffect(() => {
    document.title = `${nameWithOwner}`;
  }, [nameWithOwner]);

  const query = useOne<IViewerOneRepo>({
    resource: "repos",
    id: params.id,
    meta: { nameWithOwner },
  });
  const [open, setOpen] = React.useState<boolean>(false);
  const { data, isLoading, isError, error } = query;

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center">
        <Loader className="w-5 h-5 animate-spin" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center">
        <Link to={".."}><StepBack/></Link>
        {/* @ts-expect-error */}
        <ErrorrMessageComponent error_message={query.error?.message} />
      </div>
    );
  }
  if (!data) {
    return <div className="min-h-screen w-full  flex flex-col">no data</div>;
  }
  // console.log("data === ",data)
  const repo = data?.data?.user?.repository;
  const topics = repo?.repositoryTopics?.nodes;

  return (
    <Card className="min-h-screen w-full  flex flex-col">
      <div className="w-full flex flex-col md:flex-row  justify-between p-3 gap-2 ">
        <div className="w-full  grid gap-2 sm:grid-cols-2">
          <div className="w-full  flex flex-col  gap-5 p-2  ">
            <div className="flex flex-col gap-2">
              <a
                href={repo?.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-700 gap-2 ">
                <h1 className="w-full text-4xl md:text-6xl font-bold p-1">{repo?.name}</h1>
                <h3 className="w-full text-xl md:text-2xl font-bold p-1">{repo?.nameWithOwner}</h3>
              </a>
              <ForksyncCheck repo={repo} />

              <div className="w-full flex flex-wrap gap-2">
                <a
                  href={"https://vscode.dev/" + repo?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-purple-700 gap-2 text-sm border rounded-full p-1">
                  open in vscode
                </a>
                {repo.isFork && (
                  <Tooltip title="forked repos">
                    <GitFork className="h-4 w-4 text-blue-600" />
                  </Tooltip>
                )}
                {repo.isPrivate && (
                  <Tooltip title="private repo">
                    <Lock className="h-4 w-4 text-red-600" />
                  </Tooltip>
                )}

                {repo.viewerPermission !== "ADMIN" && (
                  <Tooltip title="no admin permissions ">
                    <Construction className="h-4 w-4 text-yellow-500" />
                  </Tooltip>
                )}

                {repo.viewerPermission === "ADMIN" && (
                  <Edit className="w-5 h-5 " onClick={() => setOpen(true)} />
                )}

                {repo.viewerPermission === "ADMIN" && (
                  <CardMenu>
                    <MenuItem
                      sx={{
                        fontSize: "12px",
                        ":hover": {
                          color: "blue",
                        },
                      }}
                      onClick={() => setOpen(true)}>
                      Edit
                    </MenuItem>

                    <MenuItem
                      sx={{
                        fontSize: "12px",
                        ":hover": {
                          color: "red",
                        },
                      }}
                      onClick={() => setOpen(true)}>
                      Delete
                    </MenuItem>
                  </CardMenu>
                )}
              </div>
            </div>
          </div>

          <CardMedia
            component="img"
            height={50}
            className="w-full lg:w-[40%]   shadow rounded object-cover "
            image={repo?.openGraphImageUrl}
            alt={repo?.nameWithOwner}
            width={50}
          />
        </div>
      </div>
      <div>
        <h4 className="text-sm md:text-base  p-2">{repo?.description}</h4>

        <div className="w-full flex flex-wrap gap-1 border-t p-2 scrollbar-thin">
          {repo?.repositoryTopics.nodes.map((topic) => {
            return <Chip key={topic.id} variant="outlined" label={topic.topic.name} />;
          })}
        </div>

        <RepoTopicsForm
          repo_topics={topics}
          resourceId={repo.id}
          is_admin={repo.viewerPermission === "ADMIN"}
        />
      </div>
      <Stack gap={1}>
      <RepoLanguages repo={repo} />
      <PackageJason repo={repo}/>
      </Stack>

      <MuiModal open={open} setOpen={setOpen}>
        <UpdateRepoForm input={repo} />
      </MuiModal>
      {/* {stars?.length>0&&<h2 className="text-xl font-bold p-2">stargazers</h2>}         */}
      {/* <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2  gap-5">
        {stars?.map((star) => {
          return (
            <GithubUserCard key={star.node.url} github_user={star.node as any}/>
          )
        })}
      </div> */}

    </Card>
  );
}
