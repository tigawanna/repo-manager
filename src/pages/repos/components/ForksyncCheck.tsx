import { IViewerOneRepoRepository } from "@/state/providers/repos/query/viewer_one_repos_types";
import { IRepositoriesNode } from "@/state/providers/repos/query/viwer_repo_types";

import { Chip, Typography } from "@mui/material";

interface ForksyncCheckProps {
  repo: IRepositoriesNode;
}

export function ForksyncCheck({repo}:ForksyncCheckProps){
if((!repo.isFork)||((repo.isFork &&  repo.parent) && repo.defaultBranchRef.target.history.nodes[0].oid === 
    repo.parent.defaultBranchRef.target.history.nodes[0].oid) ){
    return null
 } 

return <Typography variant="h6" sx={{color:"red",fontSize:"12px",padding:"5px"}}>your fork might be out of sync with parent</Typography>;
}
