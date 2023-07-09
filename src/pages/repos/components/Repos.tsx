import { useQuery } from "@tanstack/react-query";

import { RepoCard } from "./RepoCard";
import React from "react";
import { Checkbox, Chip } from "@mui/material";
import { Edit,Loader,Trash } from "lucide-react";
import { DeleteRepo } from "./DeleteRepo";
import { RepositoriesEdge } from "@/state/providers/repos/types";
import { ItemList } from "./types";
import { MuiModal } from "@/components/shared/MuiModal";
import { IRepositoriesEdge } from "@/state/providers/repos/query/viwer_repo_types";
import { useList,useInfiniteList } from "@refinedev/core";
import { InfiniteButton } from "../../../components/shared/InfiniteButton";


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

// const list = useList<IRepositoriesEdge>({ dataProviderName: "repos" });
    const query  =
      useInfiniteList<IRepositoriesEdge>({
        resource: "repos",
        pagination: {
          pageSize: 10,
        },
        queryOptions: {
          getNextPageParam: (lastPage) => {
            if (lastPage) {
              return lastPage.data[lastPage.data.length - 1].cursor;
            }
          }
        }
      });

const { data, isError, isLoading,error }=query
// const query = useList({ dataProviderName: "repos" });
// const repos = query.data&&query.data.viewer.repositories.edges

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
      <p className="test-sm w-[80%] bg-red-300 text-red-950">{error&&error.message}</p>
    </div>
  );
}
 if(!data){
   return <p>No data</p>
 }



const pages = data.pages 
const repos= pages.flatMap((page) => page.data)
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
      )}
      {editing && selected && selected?.length > 0 && (
        <Chip variant="outlined" label={selected?.length} size="small" />
      )}

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
    <div className="w-full h-full flex flex-wrap items-center justify-center gap-5 p-2 ">
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

  <InfiniteButton query={query} />
  </div>
);
}




