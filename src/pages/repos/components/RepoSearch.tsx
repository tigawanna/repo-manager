import { repoSearch } from "@/state/providers/repos/query/repos_search_query";
import { Box, Card, Container, InputAdornment, TextField, useTheme } from "@mui/material";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ItemList, RepoCard } from "./RepoCard";
import React from "react";

interface RepoSearchProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  enable_search: boolean;
}

export function RepoSearch({searchTerm,setSearchTerm,enable_search}: RepoSearchProps) {
  const theme = useTheme()
    const [editing, setEditing] = React.useState(true);
    const [selected, setSelected] = React.useState<ItemList[] | null>(null);

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

  const query = useQuery(  ["repo-search", searchTerm],()=>repoSearch({query:searchTerm}),{
    enabled: enable_search,
  })

const data = query.data?.search.nodes;

return (
  <Container maxWidth="md" sx={{ mt: "1px" }}>
    <TextField
      id="search"
      type="search"
      label="Search"
      size="small"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
      }}
      // onDoubleClick={async()=>{
      //   await repoSearch({query:searchTerm})
      // }}
      sx={{ width: "100%" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
    />
    {enable_search && (
      <div className="w-full h-full flex flex-wrap items-center justify-center gap-5 p-2 mb-3">
        {data &&
          data.length > 0 &&
          data.map((repo) => {
            return (
              <RepoCard
                key={repo.id}
                viewer_repos={repo}
                selected={selected ? selected.some((i) => i.id === repo.id) : false}
                selectItem={selectItem}
                unselectItem={unselectItem}
                editing={editing}
                is_search_result={true}
              />
            );
          })}
      </div>
    )}
  </Container>
);
}
