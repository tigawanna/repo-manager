import { repoSearch } from "@/state/providers/repos/query/repos_search_query";
import { Box, Card, Container, InputAdornment, TextField, useTheme } from "@mui/material";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface RepoSearchProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  enable_search: boolean;
}

export function RepoSearch({searchTerm,setSearchTerm,enable_search}: RepoSearchProps) {
  const theme = useTheme()
  const query = useQuery(  ["repo-search", searchTerm],()=>repoSearch({query:searchTerm}),{
    enabled: enable_search,
  })

const data = query.data?.search.nodes;

return (
    <Container maxWidth="md" sx={{ mt:"1px", }}>
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
{ enable_search && <div className="flex  flex-col gap-3 w-full overflow-auto ">
  {data && data.length > 0 && (
    data.map((item)=>{
      return (
      <Card key={item.id} 
        className="w-full flex flex-col gap-1 p-2 rounded-lg"
        elevation={2}
          sx={{
          boxShadow: "1px 1px 1px 1px" + theme.palette.primary.main,
          // backgroundColor:theme.palette.background.paper
        }}
          >
          <p 
          style={{color:theme.palette.primary.main}}
          className="text-lg font-bold ">{item.nameWithOwner}</p>
          <p className="text-sm line-clap-2">{item.description}</p>

        </Card>
      )
    })
  )}
  </div>}
    </Container>
  );
}
