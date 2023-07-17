import {
  FollowUserMuation,
  followOrUnfollowUser,
} from "@/state/providers/repos/mutation/followuser";
import { Button } from "@mui/material";
import { useNotification } from "@refinedev/core";
import { useMutation } from "@tanstack/react-query";
interface FollowButtonProps {
  username: string;
  shouldFollow: boolean;
  shouldFollowback: boolean;
}

export function FollowButton({
  shouldFollow,
  username,
  shouldFollowback,
}: FollowButtonProps) {
  const {open,close} =useNotification()
  const mutation = useMutation({
    mutationFn: (vars: FollowUserMuation) => followOrUnfollowUser(vars),
    onSuccess(data,{shouldFollow},context) {
      open?.({
        key: "follow-viewer-success",
        type: "success",
        message: "Success",
        description:shouldFollow?"successfully followed user":"successfully unfollowed user",
      })
    },
    onError(error: any, variables, context) {
      open?.({
        key: "follow-viewer-error",
        type: "error",
        message: "Error",
        description:shouldFollow?"successfully following user: ":"error unfollowing viewer user: "+error?.message,
      })
    }
  });
  if (shouldFollow) {
    return (
      <Button
        size="small"
        variant="outlined"
        className="w-fit"
        sx={{ fontSize: "7px", width: "150px" }}
        onClick={() => mutation.mutate({ username, shouldFollow: true })}
      >
        {shouldFollowback ? "Follow Back" : "Follow"}
      </Button>
    );
  }
  return (
    <Button
      size="small"
      variant="outlined"
      className="text-xs"
      sx={{ fontSize: "7px", width: "150px" }}
      onClick={() => mutation.mutate({ username, shouldFollow: false })}
    >
      Unfollow
    </Button>
  );
}
