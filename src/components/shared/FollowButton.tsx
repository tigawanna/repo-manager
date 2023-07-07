import { FollowUserMuation, followOrUnfollowUser } from "@/state/providers/repos/mutation/followuser";
import {Button} from "@mui/material"
import {useMutation} from "@tanstack/react-query"
interface FollowButtonProps {
  username: string;
  shouldFollow: boolean;
  shouldFollowback:boolean;
}

export function FollowButton({shouldFollow,username,shouldFollowback}:FollowButtonProps){
    const mutation = useMutation({
        mutationFn:(vars:FollowUserMuation)=>followOrUnfollowUser(vars)
    })
if(shouldFollow){
return (
  <Button
    size="small"
    variant="outlined"
    className="w-fit"
    sx={{ fontSize: "7px" , width:"100px"}}
    onClick={() => mutation.mutate({ username, shouldFollow: true })}>
    {shouldFollowback ? "Follow Back" : "Follow"}
  </Button>
);
}
return (
  <Button
    size="small"
    variant="outlined"
    className="text-xs"
    sx={{ fontSize: "7px", width: "100px" }}
    onClick={() => mutation.mutate({ username, shouldFollow: false })}>
    Unfollow
  </Button>
);
}
