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
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
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
