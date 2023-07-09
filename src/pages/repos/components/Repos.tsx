import { useQuery } from "@tanstack/react-query";

import { RepoCard } from "./RepoCard";
import React from "react";
import { Checkbox, Chip } from "@mui/material";
import { Edit,Trash } from "lucide-react";
import { DeleteRepo } from "./DeleteRepo";
import { RepositoriesEdge, RepositoriesNode } from "@/state/providers/repos/types";
import { ItemList } from "./types";
import { MuiModal } from "@/components/shared/MuiModal";
import { getViewerRepositories } from "@/state/providers/repos/query/viewer_repos";
import { useList } from "@refinedev/core";
import { IRepositoriesEdge } from "@/state/providers/repos/query/viwer_repo_types";

interface ReposProps {

}

export function Repos({}:ReposProps){

const [editing,setEditing]=React.useState(true)
const [selected, setSelected] = React.useState<ItemList[] | null>(null);
const [opendelete,setOpenDelete]=React.useState(false)

const selectItem = (item:ItemList) => {
  setSelected((prev) => {
    if (!prev) {
      return [item];
    }
    return [...prev, item]; // Using spread operator to create a new array
  });
}; 
const unselectItem = (item:ItemList) => {
  setSelected((prev) => {
    if (!prev) {
      return [item];
    }
    return [...prev.filter((i) => i.id !== item.id)]; // Using spread operator to create a new array
  });
};

const selectAll = (repos?:RepositoriesEdge[]) => {
  setSelected((prev) => {
    if(repos){
          return [
            ...repos.map((i) => {
              return { id: i.node.id, name: i.node.name, nameWithOwner: i.node.nameWithOwner };
            }),
          ];
    }

  return prev
  });
}

const deselectAll=()=>{
  setSelected(null)
}

// const query = useQuery({queryKey: ["viewerRepos"], queryFn:()=>getViewerRepositories({
//   first: 100
// })})

const list = useList<IRepositoriesEdge>({ dataProviderName: "repos" });


// const query = useList({ dataProviderName: "repos" });

// const repos = query.data&&query.data.viewer.repositories.edges
const repos= list.data?.data
const is_all_selected = selected && selected.length === repos?.length?true:false

return (
  <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-2">
    <div className="w-full flex items-center gap-3">
      <Edit
        onClick={() => setEditing(!editing)}
        className={editing ? "h-5 w-5 text-purple-600" : "h-5 w-5 hover:text-purple-600"}
      />
      {editing && (
        <Checkbox
          className=""
          checked={is_all_selected}
          onClick={() => {
            if (is_all_selected) {
              deselectAll();
            } else {
              // @ts-expect-error
              selectAll(repos);
            }
          }}
        />
        )
        }
          {(editing&&selected&&selected?.length>0) && <Chip variant="outlined" label={selected?.length} size="small" />}


      <div className="flex items-center justify-center gap-3">
        {selected && selected.length > 0 && (
          <Trash
            onClick={() => setOpenDelete(true)}
            className="h-5 w-5 text-red-700 hover:fill-red-700 "
          />
        )}
      </div>
      <MuiModal open={opendelete} setOpen={setOpenDelete}>
        {/* @ts-expect-error */}
        <DeleteRepo selected={selected} setOpen={setOpenDelete} />
      </MuiModal>
    </div>
    <div className="w-full h-full flex flex-wrap items-center justify-start gap-5 p-2 ">
      {repos &&
        repos.map((repo, i) => {
          return (
            <RepoCard
              key={repo.node.id}
              // @ts-expect-error
              viewer_repos={repo}
              selected={selected ? selected.some((i) => i.id === repo.node.id) : false}
              selectItem={selectItem}
              unselectItem={unselectItem}
              editing={editing}
            />
          );
        })}
    </div>
  </div>
);
}




