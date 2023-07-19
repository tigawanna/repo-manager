import { loginPocketbaseUser } from "@/state/pocketbase/client";
import { Button, Card, TextField, useTheme } from "@mui/material";
import { SaveButton } from "@refinedev/mui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Github, Loader } from "lucide-react";
import { useState } from "react";
import { useNotification } from "@refinedev/core";
import { checkToken } from "@/state/pocketbase/token";

interface GithubButtonProps {}

export function GithubButton({}: GithubButtonProps) {
  const qc = useQueryClient();
  const { open, close } = useNotification();
  const theme = useTheme();
  const [input, setInput] = useState("");

  const mutation = useMutation({
    mutationFn: loginPocketbaseUser,
    onSuccess(data, variables, context) {
      //console.log("data");
      qc.setQueryData(["gh-token"], data.access_token);
      localStorage.setItem("github_token", data.access_token);
      open?.({
        key: "update-token-success",
        type: "success",
        message: "Success",
        description: "Login success",
      });
      close?.("update-token-success");
      // location.reload();
    },
    onError(error: any) {
      //console.log("error loggin in with github appp ", error);
      open?.({
        key: "update-viewer-error",
        type: "error",
        message: "Error with login",
        description: error.message,
      });
      close?.("update-token-error");
    },
  });

  const add_pat_mutation = useMutation({
    mutationFn: async () => {
      const valid_token = await checkToken(input);
      //console.log("valid_token === ", valid_token);
      return valid_token;
    },
    onSuccess(data, variables, context) {
      qc.setQueryData(["gh-token"], data);
      localStorage.setItem("github_token", data);
    },
    onError(error: any) {
      open?.({
        key: "update-token-error",
        type: "error",
        message: "Error with login",
        description: "invalid personal access token",
      });
    },
  });
  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
      }}
      className="h-full flex flex-col items-center justify-center gap-3 rounded-lg border p-3 
  shadow "
    >
      <p className="w-full text-sm text-center">
        This app requires github access
      </p>
      <Button
        variant="outlined"
        className="w-[60%] flex items-center justify-center gap-3 rounded-lg m-0 p-0"
        onClick={() => mutation.mutate()}
      >
        {mutation.isLoading ? (
          <Loader className="h-5 w-5 animate-spin" />
        ) : (
          <div className="font-bold flex gap-2">
            {" "}
            Login with <Github />
          </div>
        )}
      </Button>

      <div className="text-sm ">
        or provide a{" "}
        <a
          className="text-blue-600 hover:text-purple-600"
          href="https://github.com/settings/tokens"
        >
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

        <SaveButton
          onClick={() => {
            add_pat_mutation.mutate();
          }}
        >
          {add_pat_mutation.isLoading && (
            <Loader className="h-5 w-5 animate-spin" />
          )}
        </SaveButton>
      </div>
    </Card>
  );
}
