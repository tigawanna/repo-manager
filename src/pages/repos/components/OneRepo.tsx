import React from "react";
import { Card, CardMedia } from "@mui/material";
import { Edit, GitFork, Loader, Lock } from "lucide-react";
import { MuiModal } from "@/components/shared/MuiModal";
import { Chip } from "@mui/material";
import { CardMenu } from "@/components/shared/CardMenu";
import MenuItem from "@mui/material/MenuItem";
import { UpdateRepoForm } from "./UpdateRepoForm";
import { useParams } from "react-router-dom";
import { useOne } from "@refinedev/core";
import { IViewerOneRepo } from "@/state/providers/repos/query/viewer_one_repos_types";
import { RepoTopicsForm } from "./RepotopicsForm";

interface OneRepoProps {}

export function OneRepo({}: OneRepoProps) {
  const params = useParams();
  // console.log("params === ",params)
  const query = useOne<IViewerOneRepo>({ resource: "repos", id: params.id });
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
        <p className="test-sm w-[80%] bg-red-300 text-red-950">
          {/* @ts-expect-error */}
          {error && error?.message}
        </p>
      </div>
    );
  }
  if (!data) {
    return <div className="min-h-screen w-full  flex flex-col">no data</div>;
  }

  const repo = data?.data.viewer.repository;
  const topics = repo?.repositoryTopics.nodes;

  return (
    <Card className="min-h-screen w-full  flex flex-col">
      <div className="w-full flex flex-col md:flex-row  justify-between p-3 gap-2 ">
        <div className="w-full  flex flex-col md:flex-row justify-between p-3">
          <div className="w-full flex flex-col  gap-5 p-2">
            <div className="flex flex-col gap-2">
              <a
                href={repo?.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-700 gap-2 "
              >
                <h1 className="w-full text-4xl md:text-6xl font-bold p-1">
                  {repo?.name}
                </h1>
                <h3 className="w-full text-xl md:text-2xl font-bold p-1">
                  {repo?.nameWithOwner}
                </h3>
              </a>
              <h4>{}</h4>

              <div className="w-full flex flex-wrap gap-1">
                {repo?.isPrivate && <Lock className="w-5 h-5 text-red-400" />}
                {repo?.isFork && (
                  <GitFork className="w-5 h-5 text-purple-400" />
                )}
                <Edit className="w-5 h-5 " onClick={() => setOpen(true)} />
                <CardMenu>
                  <MenuItem
                    sx={{
                      fontSize: "12px",
                      ":hover": {
                        color: "blue",
                      },
                    }}
                    onClick={() => setOpen(true)}
                  >
                    Edit
                  </MenuItem>

                  <MenuItem
                    sx={{
                      fontSize: "12px",
                      ":hover": {
                        color: "red",
                      },
                    }}
                    onClick={() => setOpen(true)}
                  >
                    Delete
                  </MenuItem>
                </CardMenu>
              </div>
            </div>
            <div>
              <h4 className="text-sm md:text-base  p-2">{repo?.description}</h4>

             <div className="w-full flex flex-wrap gap-1 border-t p-2 scrollbar-thin">
              {repo?.repositoryTopics.nodes.map((topic) => {
                  return <Chip key={topic.id} variant="outlined" label={topic.topic.name} />;
                })}
              </div>
       
                <RepoTopicsForm repo_topics={topics} resourceId={repo.id} />
              
            </div>

          </div>

          <CardMedia
            component="img"
            height={50}
            className="w-full md:w-[10%] md:max-w-[350px] lg:max-w-[500px] shadow rounded object-cover"
            image={repo?.openGraphImageUrl}
            alt={repo?.nameWithOwner}
            width={50}
          />
        </div>
      </div>

      <MuiModal open={open} setOpen={setOpen}>
        {/* @ts-expect-error */}
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
