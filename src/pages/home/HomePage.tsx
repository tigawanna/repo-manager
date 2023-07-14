import { useQuery } from "@tanstack/react-query";
import { GithubButton } from "./components/GithubButton";
import { getGithubAccessToken } from "@/state/pocketbase/token";
import { Loader } from "lucide-react";
import { ErrorrMessageComponent } from "@/components/shared/Errorrmessage";
import { ViewerHomepage } from "./components/ViewerHomepage";

interface HomePageProps {

}

export function HomePage({}:HomePageProps){

 const query = useQuery({
    queryKey: ["gh-token"],
    queryFn: getGithubAccessToken,
    onSuccess(data) {
      localStorage.setItem("github_token",data);
    }
  });
  // console.log("query === ",query.data)
  
  if(query.isLoading){
    return(
      <div className="w-full h-full flex items-center justify-center">
        <Loader className="w-5 h-5 animate-spin"/>
      </div>
    )
  }
  const token = query.data;
if(!token||token ==="" || query.isError){
return (
  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
    <GithubButton />
    {/* @ts-expect-error */}
  {query.isError && <ErrorrMessageComponent error_message={query.error?.message} />}
  </div>
);
  }


return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <ViewerHomepage/>
    </div>
);
}
