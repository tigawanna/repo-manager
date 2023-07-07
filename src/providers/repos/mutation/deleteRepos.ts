import { ItemList } from "../types";
import axios from "axios";

export async function deleteRepos(repos: ItemList[]) {
  try {
    for await (const repo of repos) {
      const response = await axios.delete(`https://api.github.com/repos/${repo.nameWithOwner}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GH_PAT}`,
        },
      });

      if (response.statusText === "OK") {
        console.log(`Repository ${repo.nameWithOwner} deleted successfully`);
      } else {
        console.log(`Failed to delete repository ${repo.nameWithOwner}`);
      }
      return response
    }
  } catch (error) {
    console.log("error deleting viewer repos", error);
    throw error;
  }
}
