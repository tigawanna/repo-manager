import { useQuery } from "@tanstack/react-query";
import { GithubButton } from "./components/GithubButton";
import { getGithubAccessToken } from "@/state/pocketbase/token";
import { Loader } from "lucide-react";

interface HomePageProps {

}

export function HomePage({}:HomePageProps){
 const query = useQuery({
    queryKey: ["gh-token"],
    queryFn: getGithubAccessToken,
    onSuccess(data) {
      localStorage.setItem("github_token",data);
    },
  });
  // console.log("query === ",query.data)
  
  if(query.isLoading){
    return(
      <div className="w-full h-full flex items-center justify-center">
        <Loader className="w-5 h-5 animate-spin"/>
      </div>
    )
  }
  const token  = query.data;

return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <div className="text-2xl font-bold">HOME PAGE</div>
    {(!token||token.length<1)&&<GithubButton/>}
    
  </div>
);
}
