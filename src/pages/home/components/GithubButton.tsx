import { Button,Chip,Stack,TextField } from "@mui/material";
import { Check, Github, Save } from "lucide-react";
import { useState } from "react";

interface GithubButtonProps {

}

export function GithubButton({}:GithubButtonProps){
const[input,setInput]=useState("")
return (
  <div
    className="flex flex-col items-center justify-center gap-3 rounded-lg border p-3 
  shadow shadow-slate-300">
    <p className="w-full text-sm">This app requires Github access to your repositories ,</p>
    <Button
      variant="outlined"
      className="flex items-center justify-center gap-3 rounded-lg m-0 p-0">
      <h4 className="font-bold"> Login with </h4>
      <Github />
    </Button>

    <div className="text-sm ">
      or provide a{" "}
      <a className="text-blue-600 hover:text-purple-600" href="https://github.com/settings/tokens">
        github personal access token
      </a>{" "}
      with scopes
      <br />
    </div>
    <p className="font-serif ">"user", "repo", "delete_repo"</p>
    <div className=" flex gap-2 items-center justify-center">
      <TextField
        id="token"
        name="token"
        placeholder="Personal access token"
        className="w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        size="small"
  
      />
    
      <Button 
      className="m-0 p-0 h-full"
      variant="outlined"
      size="small">
        <Check className="h-full"/>
      </Button>
    </div>
  </div>
);
}
