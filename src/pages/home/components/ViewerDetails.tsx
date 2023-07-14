import { RepoStatCards } from "@/pages/home/components/RepoStatCards";
import { Viewer } from "@/state/providers/home/viewr_query_types";
import { FollowStatsCard } from "./FollowStatsCard";

interface ViewerDetailsProps {
profile:Viewer
}

export function ViewerDetails({profile}:ViewerDetailsProps){
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <RepoStatCards profile={profile} />
    <FollowStatsCard profile={profile}/>
  </div>
);
}
