import { UpdateRepoForm } from "./UpdateRepoForm";
import React from "react";
import { Checkbox, MenuItem, Chip, Card, CardMedia, CardContent } from "@mui/material";
import { MuiModal } from "@/components/shared/MuiModal";
import { CardMenu } from "@/components/shared/CardMenu";
import { ItemList, RepositoriesEdge } from "@/state/providers/repos/types";
import { Link } from "react-router-dom";
import { Star, GitFork } from "lucide-react";

interface RepoCard {
  viewer_repos: RepositoriesEdge;
  selected: boolean;
  editing: boolean;
  selectItem: (item: ItemList) => void;
  unselectItem: (item: ItemList) => void;
}

export function RepoCard({ viewer_repos, selectItem, selected, unselectItem, editing }: RepoCard) {
  const [repo, setRepos] = React.useState(viewer_repos.node);
  const [open, setOpen] = React.useState(false);
  const topics = repo.repositoryTopics.nodes;
  const stars = repo.stargazerCount;
  const forks = repo.forkCount;

  //  console.log("repo === ",repo.repositoryTopics);
  return (
    <Card
      sx={{
        boxShadow: 10,
        borderRadius: 5,
        msOverflowY: "scroll",
        ":hover": {
          boxShadow: "1px 1px 1px 1px purple",
          color: "black",
        },
      }}
      className="sm:h-[350px] w-full sm:w-[45%] lg:w-[30%] flex flex-col  gap-0 "
      variant="elevation">
      <div className="w-full flex flex-wrap lg:flex-row  justify-between p-3 gap-2 ">
        <div className="w-full flex justify-between items-center gap-1">
          {editing && (
            <Checkbox
              className=" border-purple-600 mr-1"
              size="small"
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

          <div className="w-[100%] flex  items-center">
            <div className="w-[100%] flex flex-col justify-between">
              <h1 className="text-lg font-bold line-clamp-1">{repo.name}</h1>
              <h3 className="line-clamp-1 text-sm">{repo.nameWithOwner}</h3>
            </div>
          </div>

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
        </div>
      </div>

      <Link
        to={"/repos/show/" + repo.name}
        className="flex flex-col h-full hover:brightness-50 hover:border-4 hover:border-purple-500">
        <CardMedia
          component="img"
          height={50}
          className="w-full h-full  aspect-video shadow rounded"
          image={repo.openGraphImageUrl}
          alt={repo.nameWithOwner}
          width={50}
        />
        <CardContent style={{ padding: 1 }} className="w-fit p-1">
          <h4 className="text-sm  line-clamp-1 p-1 px-2 font-light">{repo.description}</h4>
          <div className="flex rounded-full border shadow shadow-slate-500 w-fit">
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
          </div>
        </CardContent>
      </Link>

      <div className="w-full  min-h-[50px]  flex flex-wrap gap-1  border-t p-2  scrollbar-thin overflow-x-scroll">
        {topics.length < 1 && <Chip variant="outlined" label="Add topic" size="small" />}

        {topics.map((topic) => {
          return <Chip key={topic.id} variant="outlined" label={topic.topic.name} size="small" />;
        })}
      </div>

      <MuiModal open={open} setOpen={setOpen}>
        <UpdateRepoForm input={repo} />
      </MuiModal>
    </Card>
  );
}
