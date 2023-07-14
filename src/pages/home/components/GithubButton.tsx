import { loginPocketbaseUser } from "@/state/pocketbase/client";
import { Button,Chip,Stack,TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Check, Github, Loader, Save } from "lucide-react";
import { useState } from "react";

interface GithubButtonProps {

}

export function GithubButton({}:GithubButtonProps){
const[input,setInput]=useState("")
const mutation = useMutation({
  mutationFn: loginPocketbaseUser,
  onSuccess(data, variables, context) {
    console.log("login success data,var,cxt ==", data, variables, context);
  },
  onError(error) {
    console.log("error loggin in with github appp ", error);
  },
});
return (
  <div
    className="h-full flex flex-col items-center justify-center gap-3 rounded-lg border p-3 
  shadow shadow-slate-300">
    <p className="w-full text-sm text-center">This app requires github access</p>
    <Button
      variant="outlined"
      className="w-[60%] flex items-center justify-center gap-3 rounded-lg m-0 p-0"
      onClick={() => mutation.mutate()}>
        {mutation.isLoading?<Loader className="h-5 w-5 animate-spin"/>
:       <div className="font-bold flex gap-2">
        {" "}
        Login with <Github />
      </div>}
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
        className="w-full text-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        size="small"
      />

      <Button className="m-0 p-0 h-full" variant="outlined" size="small">
        <Check className="h-full" />
      </Button>
    </div>
  </div>
);
}
