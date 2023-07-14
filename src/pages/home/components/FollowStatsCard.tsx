import { Viewer } from "@/state/providers/home/viewr_query_types";
import { Card, Typography, Chip, styled } from "@mui/material";
import { CircularDeterminate } from "@refinedev/mui";
import { Link } from "react-router-dom";

interface FollowStatsCardProps {
  profile: Viewer;
}

export function FollowStatsCard({profile}: FollowStatsCardProps) {
    const followers = profile?.followers
    const following = profile?.following

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "1.2rem",
    color: theme.palette.secondary.contrastText,
  }));

  return (
    <div className="w-full h-full flex items-center justify-center gap-2 ">
      <div className="min-w-[40%] border rounded-lg flex flex-col items-center justify-center p-2 hover:text-purple-400">
        {following.totalCount && <h3 className="text-6xl ">{following.totalCount}</h3>}
        {following && <Title className="text-xl">Following</Title>}
      </div>
      <div className="min-w-[40%] border rounded-lg flex flex-col items-center justify-center p-2 hover:text-purple-400">
        {followers.totalCount && <h3 className="text-6xl ">{followers.totalCount}</h3>}
        {following && <Title className="text-xl">Followers</Title>}
      </div>
    </div>
  );
}
