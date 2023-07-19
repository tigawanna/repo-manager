import { RepoStatCards } from "@/pages/home/components/RepoStatCards";
import { Viewer } from "@/state/providers/home/viewr_query_types";
import { FollowStatsCard } from "./FollowStatsCard";
import { OtherStatsCard } from "./OtherStatsCard";
import { StaredRepoStatCards } from "./StaredRepoStatCards";
import { GistsStatCards } from "./GistsStatCards";

interface ViewerDetailsProps {
  profile: Viewer;
}

export function ViewerDetails({ profile }: ViewerDetailsProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <RepoStatCards profile={profile} />
      <FollowStatsCard profile={profile} />
      <StaredRepoStatCards profile={profile} />
      <GistsStatCards profile={profile} />
    </div>
  );
}
