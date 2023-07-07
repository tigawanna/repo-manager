import { GithubUser } from "@/state/providers/repos/types";
import { Card,CardMedia } from "@mui/material";
import {useState} from "react" 
import { FollowButton } from "./FollowButton";

interface GithubUserCardProps {
  github_user: GithubUser
}

export function GithubUserCard({ github_user }: GithubUserCardProps) {
    const [shouldFollox,setShoulFollow] = useState(!github_user.viewerIsFollowing)
  return (
    <Card className="w-full h-full flex items-center justify-center gap-2">
      <CardMedia
        component="img"
        width={"50px"}
        height={"50px"}
        className="rounded-full "
        sx={{ objectFit: "cover", width: "40px", height: "40px" }}
        image={github_user.avatarUrl}
        alt={github_user.login}
      />
      <div className="w-full h-full flex flex-col justify-center gap-1 ">
        <h3 className="text-sm">{github_user.login}</h3>
        <h3 className="text-sm">{github_user.email}</h3>
        <h3 className="text-sm">{github_user.twitterUsername}</h3>
      </div>
    <FollowButton 
    shouldFollow={shouldFollox} 
    username={github_user.login} 
    shouldFollowback={github_user.viewerCanFollow&&!github_user.viewerIsFollowing}/>
    </Card>
  );
}
