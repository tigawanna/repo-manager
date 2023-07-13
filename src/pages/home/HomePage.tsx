import { useQuery } from "@tanstack/react-query";
import { GithubButton } from "./components/GithubButton";
import { getGithubAccessToken } from "@/state/pocketbase/token";

interface HomePageProps {

}

export function HomePage({}:HomePageProps){
 const query = useQuery({
    queryKey: ["gh-token"],
    queryFn: getGithubAccessToken
  });
  // console.log("query === ",query.data)
  const token  = query.data;
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <div className="text-2xl font-bold">HOME PAGE</div>
    {(!token||token.length<1)&&<GithubButton/>}
    
  </div>
);
}
