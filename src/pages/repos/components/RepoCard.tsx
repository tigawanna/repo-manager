import { UpdateRepoForm } from "./UpdateRepoForm";
import React from "react";
import {
  Checkbox,
  MenuItem,
  Chip,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  Tooltip,
  Stack,
} from "@mui/material";
import { MuiModal } from "@/components/shared/MuiModal";
import { CardMenu } from "@/components/shared/CardMenu";
import {
  Star,
  GitFork,
  Lock,
  Building,
  Construction,
  Search,
} from "lucide-react";
import { ForksyncCheck } from "./ForksyncCheck";
import { IRepositoriesNode } from "@/state/providers/repos/query/viwer_repo_types";
import { useNavigate } from "react-router-dom";

export type ItemList = {
  id: string;
  name: string;
  nameWithOwner: string;
};

interface RepoCard {
  viewer_repos: IRepositoriesNode;
  selected: boolean;
  editing: boolean;
  is_search_result?: boolean;
  selectItem: (item: ItemList) => void;
  unselectItem: (item: ItemList) => void;
}

export function RepoCard({
  viewer_repos,
  selectItem,
  selected,
  unselectItem,
  is_search_result,
  editing,
}: RepoCard) {
  const [repo, setRepos] = React.useState(viewer_repos);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const topics = repo.repositoryTopics.nodes;
  const stars = repo.stargazerCount;
  const forks = repo.forkCount;

  return (
    <Card
      sx={{
        boxShadow: 10,
        borderRadius: 5,
        msOverflowY: "scroll",
        ":hover": {
          boxShadow: "1px 1px 1px 1px" + theme.palette.secondary.main,
          color: "black",
        },
      }}
      className="sm:h-[350px] w-full sm:w-[45%] lg:w-[30%] flex flex-col  gap-0 "
      variant="elevation"
    >
      <div className="w-full flex flex-wrap lg:flex-row  justify-between p-3 gap-2 ">
        <div className="w-full flex justify-between items-center gap-2">
          {editing &&
            !repo.isInOrganization &&
            repo.viewerPermission === "ADMIN" && (
              <Checkbox
                className="mr-1"
                size="small"
                sx={{
                  color: theme.palette.secondary.main,
                }}
                checked={selected}
                onClick={() => {
                  if (selected) {
                    unselectItem(repo);
                  } else {
                    selectItem(repo);
                  }
                }}
              />
            )}

          <div className="w-[100%] flex  items-center justify-between">
            <div className="w-[100%] max-w-[60%] flex flex-col justify-between">
              <Tooltip title={repo.nameWithOwner}>
                <Stack>
                  <h1 className=" text-lg font-bold line-clamp-1">
                    {repo.name}
                  </h1>
                  <h3 className="w-full text-xs flex line-clamp-1">
                    {repo.nameWithOwner}
                  </h3>
                </Stack>
              </Tooltip>
            </div>
            <div className="flex  items-center gap-1">
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
              {repo.isInOrganization && (
                <Tooltip title="organisation repos will be opened in github">
                  <Building className="h-4 w-4 text-orange-500" />
                </Tooltip>
              )}

              {repo.viewerPermission !== "ADMIN" && (
                <Tooltip title="no admin permissions ">
                  <Construction className="h-4 w-4 text-yellow-500" />
                </Tooltip>
              )}
              {is_search_result && (
                <Tooltip title="search result">
                  <Search className="h-4 w-4 text-yellow-300" />
                </Tooltip>
              )}
            </div>
          </div>

          {repo.viewerPermission === "ADMIN" && (
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
          )}
        </div>
      </div>

      <Card
        onClick={() => {
          if (!repo.isInOrganization) {
            navigate({
              pathname: "/repos/show/" + repo.name,
              search: "?nameWithOwner=" + repo.nameWithOwner,
            });
          } else {
            window.open(`https://github.com/${repo.nameWithOwner}`);
          }
        }}
        // to={"/repos/show/"+repo.name}
        // to={{
        //   pathname: "/repos/show/" + repo.name,
        //   search: "?nameWithOwner=" + repo.nameWithOwner,
        // }}
        className="flex flex-col h-full hover:brightness-[80%]"
      >
        <CardMedia
          component="img"
          height={50}
          className="w-full h-full  aspect-video shadow rounded"
          image={repo.openGraphImageUrl}
          alt={repo.nameWithOwner}
          width={50}
        />
        <CardContent style={{ padding: 1 }} className="w-fit p-1">
          <h4 className="text-sm  line-clamp-1 p-1 px-2 font-light">
            {repo.description}
          </h4>
          <div className="flex  w-fit">
            {stars > 0 && (
              <div className="flex gap-1 text-sm items-center justify-center px-2">
                {stars}
                <Star className="w-4 h-4 fill-yellow-400" />
              </div>
            )}
            {forks > 0 && (
              <div className="flex gap-1 text-sm items-center justify-center px-2">
                {forks}
                <GitFork className="w-4 h-4 text-purple-600" />
              </div>
            )}
            <ForksyncCheck repo={repo} />
          </div>
        </CardContent>
      </Card>

      <div className="w-full  min-h-[50px]  flex flex-wrap gap-1  border-t p-2  scrollbar-thin overflow-x-scroll">
        {topics.length < 1 && (
          <Chip variant="outlined" label={repo.name} size="small" />
        )}
        {topics.map((topic) => {
          return (
            <Chip
              key={topic.id}
              variant="outlined"
              label={topic.topic.name}
              size="small"
            />
          );
        })}
      </div>

      <MuiModal open={open} setOpen={setOpen}>
        <UpdateRepoForm input={repo} />
      </MuiModal>
    </Card>
  );
}
