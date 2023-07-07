
import { UpdateRepoForm } from "./UpdateRepoForm";
import React from "react";
import { Checkbox,MenuItem, Chip,Card,CardMedia,CardContent } from "@mui/material";
import { MuiModal } from "@/components/shared/MuiModal";
import { CardMenu } from "@/components/shared/CardMenu";
import { ItemList, RepositoriesEdge } from "@/state/providers/repos/types";


interface RepoCard {
  viewer_repos: RepositoriesEdge;
  selected: boolean;
  editing: boolean;
  selectItem: (item: ItemList) => void;
  unselectItem: (item: ItemList) => void;
}

export function RepoCard({ viewer_repos,selectItem,selected,unselectItem,editing }: RepoCard) {
const [repo, setRepos] = React.useState(viewer_repos.node);
const [open,setOpen]=React.useState(false)

const topics = repo.repositoryTopics.nodes;
const many_topics_card_styles=""

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
        <div className="w-full flex justify-between items-center gap-2">
          {editing && (
            <Checkbox
              className="border-2 border-purple-600 mr-2"
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

          <div className="w-[90%] flex flex-col justify-between line-clamp-2">
            <h1 className="text-xl font-bold line-clamp-1">{repo.name}</h1>
            <h3 className="line-clamp-1">{repo.nameWithOwner}</h3>
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

      <div className="flex flex-col h-full">
        <CardMedia
          component="img"
          height={50}
          className="w-full h-full  aspect-video shadow rounded"
          image={repo.openGraphImageUrl}
          alt={repo.nameWithOwner}
          width={50}
        />
        <CardContent style={{ padding:1 }} className="w-fit p-1">
          <h4 className="text-sm  line-clamp-1 p-1 px-2 font-light">{repo.description}</h4>
        </CardContent>
      </div>

      <div className="w-full  min-h-[50px]  flex flex-wrap gap-1  border-t p-2  scrollbar-thin overflow-x-scroll">
        {topics.length<1 && <Chip variant="outlined" label="No topics" size="small" />} 
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
