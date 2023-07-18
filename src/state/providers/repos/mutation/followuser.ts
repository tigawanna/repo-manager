import axios from "axios";

export interface FollowUserMuation {
  username: string;
  shouldFollow: boolean;
}
export async function followOrUnfollowUser({
  username,
  shouldFollow,
}: FollowUserMuation) {
  const url = `https://api.github.com/user/following/${username}`;
  const method = shouldFollow ? "PUT" : "DELETE";

  try {
    const response = await axios({
      url,
      method,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GH_PAT}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      console.log(
        `You have ${shouldFollow ? "followed" : "unfollowed"} ${username}.`
      );
      return `You have ${
        shouldFollow ? "followed" : "unfollowed"
      } ${username}.`;
    } else {
      console.log(`An error occurred: ${response.data.message}`);
      throw response;
    }
  } catch (error: any) {
    console.log(`An error occurred: ${error.message}`);
    throw error;
  }
}
