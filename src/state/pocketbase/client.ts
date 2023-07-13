import PocketBase from "pocketbase";

export const pb = new PocketBase(import.meta.env.VITE_PB_URL);

export async function loginPocketbaseUser() {
  try {
    const authData = await pb
      .collection("devs")
      .authWithOAuth2({ provider: "github", scopes: ["user", "repo", "delete_repo"] });
    console.log("pocketbase gihub user  === ", authData);
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
