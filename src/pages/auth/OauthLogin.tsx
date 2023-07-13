import { supabaseClient } from "@/utility";
import { Card, Button } from "@mui/material";
import { useLogin } from "@refinedev/core";
import { useMutation } from "@tanstack/react-query";

interface OauthLoginProps {}

export function OauthLogin({}: OauthLoginProps) {
  const { mutate: login, error } = useLogin();
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
          provider: "github",
        });
        console.log("oauth login response data==== ", data);
        console.log("oauth login response error==== ", error);
        if (error) {
          throw error;
        }
        return data;
      } catch (error) {
          console.log("oauth login response error==== ", error);
        throw error;
      }
    },
  });

  const handleLogin = () => {
    // Perform the OAuth login logic here
    // login(
    //   { provider: "github" },
    //   {
    //     onSuccess(data, variables, context) {
    //       console.log("Login Success: data variables", data, variables, context);
    //     },
    //     onError(error, variables, context) {
    //       console.log("login Error: data variables", error, variables, context);
    //     },
    //   }
    // );
    mutation.mutate();
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login with OAuth
        </Button>
      </Card>
    </div>
  );
}


