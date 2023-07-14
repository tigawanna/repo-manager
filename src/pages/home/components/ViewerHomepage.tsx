import { ProfileInfo } from "@/pages/profile/ProfileInfo";
import { getViewerRepositories } from "@/state/providers/home/viewer_query";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

interface ViewerHomepageProps {

}

export function ViewerHomepage({}:ViewerHomepageProps){
const query = useQuery({
    queryKey: ["viewer"],
    queryFn: getViewerRepositories
});

if(query.isLoading){
    return(
        <div className="w-full h-full flex items-center justify-center">
            <Loader className="w-5 h-5 animate-spin"/>
        </div>
    )
}
if(query.isError || !query.data){
    return(
        <div className="w-full h-full flex items-center justify-center">
            <p className="test-sm w-[80%] bg-red-400 text-red-950">
                {/* @ts-expect-error */}
                {query.error?.message}
            </p>
        </div>
    )
}
const data = query.data;
console.log("data === ",data)
const viewer_detaills = data.viewer
return (
 <div className='w-full h-full flex items-center justify-center'>
 <ProfileInfo profile={viewer_detaills}/>
 </div>
);
}
