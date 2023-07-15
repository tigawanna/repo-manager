import { ProfileInfo } from "@/pages/profile/ProfileInfo";
import { getViewerRepositories } from "@/state/providers/home/viewer_query";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { ViewerDetails } from "./ViewerDetails";
import { GithubButton } from "./GithubButton";

interface ViewerHomepageProps {

}

export function ViewerHomepage({}:ViewerHomepageProps){
const query = useQuery({
    queryKey: ["viewer"],
    queryFn: getViewerRepositories,
    onError(err) {
    //   console.log("error message test ==",err.message.data);
    },
},
);

if(query.isLoading){
    return(
        <div className="w-full h-full flex items-center justify-center">
            <Loader className="w-5 h-5 animate-spin"/>
        </div>
    )
}
if(query.isError || !query.data){
    return (
      <div className="w-full h-full flex flex-col items-center justify-center rounded-lg">
        <GithubButton />
        <p className="test-sm  bg-red-950 text-red-200 px-3 border-red-300 border rounded-lg">
          {"error getting veiwer repos"}
        </p>
      </div>
    );
}
const data = query.data;
// console.log("data === ",data)
const viewer_detaills = data.viewer
return (
 <div className='w-full h-full flex flex-col items-center justify-center gap-1'>
 <ProfileInfo profile={viewer_detaills}/>
 {/* <ProfileStats profile={viewer_detaills}/> */}
<ViewerDetails profile={viewer_detaills}/>

 </div>
);
}
