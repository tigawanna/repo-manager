import PocketBase from "pocketbase";
import { PBUser } from "./types";

export const pb = new PocketBase(import.meta.env.VITE_PB_URL);

export async function loginPocketbaseUser() {
  try {
    const authData = await pb.collection("devs").authWithOAuth2<PBUser>({ provider: "github", scopes: ["user", "repo", "delete_repo"] });
    console.log("pocketbase github user  === ", authData);
      if (authData?.meta?.accessToken){
          console.log("pocketbase github user  === ", authData?.meta?.accessToken);
          return await pb.collection("devs").update<PBUser>(authData.record.id, 
              { 
                access_token: authData?.meta.accessToken,
                  avatar: authData?.meta.avatarUrl??authData.record.avatar,
            });
     }
    return authData;
  } catch (error) {
    console.log("error getting pocketbase github user ==== ", error);
    throw error;
  }
}

export async function getPocketbaseUser() {
  try {
    return await pb.authStore.model;
  } catch (error) {
    return null;
  }
}
export async function logoutPocketbaseUser() {
  try {
    return await pb.authStore.clear();
  } catch (error) {
    return null;
  }
}
