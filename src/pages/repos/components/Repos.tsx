import { useQuery } from "@tanstack/react-query";

import { RepoCard } from "./RepoCard";
import React, { useEffect, useState } from "react";
import { Box, Card, Checkbox, Chip , Skeleton, useTheme } from "@mui/material";
import { Edit, Loader, Trash } from "lucide-react";
import { DeleteRepo } from "./DeleteRepo";
import { ItemList } from "./types";
import { MuiModal } from "@/components/shared/MuiModal";
import { IRepositoriesEdge } from "@/state/providers/repos/query/viwer_repo_types";
import { useList, useInfiniteList } from "@refinedev/core";
import { InfiniteButton } from "../../../components/shared/InfiniteButton";
import { RepoQueryVariables } from "@/state/providers/repos/query/viewer_repos";
import { ReposSortSection } from "./ReposSortSection";
import { useInView } from "react-intersection-observer";
interface ReposProps {}

export function Repos({}: ReposProps) {
    const { ref, inView } = useInView();
  const [editing, setEditing] = React.useState(true);
  const [selected, setSelected] = React.useState<ItemList[] | null>(null);
  const [opendelete, setOpenDelete] = React.useState(false);

  const [repovars, setRepoVars] = useState<RepoQueryVariables>({
    first: 12,
    orderBy: {
      field: "PUSHED_AT",
      direction: "DESC",
    },
    isFork: false,
  });
console.log("repovars === ",repovars)
  const selectItem = (item: ItemList) => {
    setSelected((prev) => {
      if (!prev) {
        return [item];
      }
      return [...prev, item]; // Using spread operator to create a new array
    });
  };
  const unselectItem = (item: ItemList) => {
    setSelected((prev) => {
      if (!prev) {
        return [item];
      }
      return [...prev.filter((i) => i.id !== item.id)]; // Using spread operator to create a new array
    });
  };

  const selectAll = (repos?: IRepositoriesEdge[]) => {
    setSelected((prev) => {
      if (repos) {
        return [
          ...repos.map((i) => {
            return {
              id: i.node.id,
              name: i.node.name,
              nameWithOwner: i.node.nameWithOwner,
            };
          }),
        ];
      }

      return prev;
    });
  };

  const deselectAll = () => {
    setSelected(null);
  };

  const query = useInfiniteList<IRepositoriesEdge>({
    resource: "repos",
    pagination: {
      pageSize: 10,
    },
    // @ts-expect-error
    sorters: repovars,
    queryOptions: {
      getNextPageParam: (lastPage) => {
        if (lastPage) {
          return lastPage.data[lastPage.data.length - 1].cursor;
        }
      },
    },
  });

  const { data, isError, isLoading, error } = query;
    
  useEffect(() => {
    if (inView) {
      query.fetchNextPage();
    }
  }, [inView]);
    const theme = useTheme();
  
  if (isLoading) {
    return (
    <div className="w-full h-full flex flex-wrap items-center justify-center gap-5 p-2 ">
    {[...Array(10)].map((_, i) => (
          
    <Card
    key={i}
      sx={{
        boxShadow: 10,
        borderRadius: 5,
        msOverflowY: "scroll",
        ":hover": {
          // boxShadow: "1px 1px 1px 1px" + theme.palette.secondary.main,
          color: "black",
        },
      }}
      className="sm:h-[250px] w-full sm:w-[45%] lg:w-[30%] 
      flex flex-col items-center justify-center shadow shadow-slate-500 gap-0 animate-pulse"
      variant="elevation">
        <Loader className="h-5 w-5 animate-spin" />
      </Card>
        ))}
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center">
        <p className="test-sm w-[80%] bg-red-300 text-red-950">
          {error && error.message}
        </p>
      </div>
    );
  }
  if (!data) {
    return <p>No data</p>;
  }

  const pages = data.pages;
  const repos = pages.flatMap((page) => page.data);
  const is_all_selected =
    selected && selected.length === repos?.length ? true : false;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-2">
      <div className="w-full flex items-center gap-3 sticky top-[10%]">
        <Edit
          onClick={() => setEditing(!editing)}
          className={
            editing
              ? "h-5 w-5 text-purple-600"
              : "h-5 w-5 hover:text-purple-600"
          }
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
          <DeleteRepo selected={selected} setOpen={setOpenDelete} setSelected={setSelected}/>
        </MuiModal>
        <ReposSortSection repovars={repovars} setRepoVars={setRepoVars} />
      </div>

      <div className="w-full h-full flex flex-wrap items-center justify-center gap-5 p-2 ">
        {repos &&
          repos.map((repo, i) => {
            return (
              <RepoCard
                key={repo.node.id}
                // @ts-expect-error
                viewer_repos={repo}
                selected={
                  selected ? selected.some((i) => i.id === repo.node.id) : false
                }
                selectItem={selectItem}
                unselectItem={unselectItem}
                editing={editing}
              />
            );
          })}
      </div>

      <InfiniteButton query={query} innerRef={ref}/>
    </div>
  );
}
