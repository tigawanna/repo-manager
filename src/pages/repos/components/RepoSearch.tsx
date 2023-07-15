import { repoSearch } from "@/state/providers/repos/query/repos_search_query";
import { Container, InputAdornment, TextField } from "@mui/material";
import { Search } from "lucide-react";
import { useState } from "react";
interface RepoSearchProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
}

export function RepoSearch({searchTerm,setSearchTerm}: RepoSearchProps) {
return (
    <Container maxWidth="md" sx={{ mt:"1px" }}>
      <TextField
        id="search"
        type="search"
        label="Search"
        size="small"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        onDoubleClick={async()=>{
          await repoSearch({query:searchTerm})
        }}
        sx={{ width: "100%" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}
