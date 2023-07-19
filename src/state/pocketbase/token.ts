import { gql } from "graphql-request";
import { gql_request_helper } from "../providers/graphqlClient";
import { pb } from "./client";

export async function saveGithubPAT(token: string) {
  try {
    localStorage.setItem("GH_PAT", token);
  } catch (error: any) {
    //console.log("error saving PAT == ", error.message); // Handle the error if the mutation fails
  }
}

export async function githubloginPocketbase() {
  try {
    return await pb.collection("devs").authWithOAuth2({ provider: "github" });
  } catch (error: any) {
    //console.log("error logging in with github == ", error.message); // Handle the error if the mutation fails
  }
}

export async function getGithubAccessToken() {
  try {
    const token = localStorage.getItem("github_token");
    if (token && token.length > 0) {
      return token;
    }
    return pb.authStore.model?.access_token as string;
  } catch (error: any) {
    //console.log("error getting token == ", error.message);
    if (!pb.authStore.isValid) {
      try {
        pb.authStore.isValid && (await pb.collection("devs").authRefresh());
        return pb.authStore.model?.access_token as string;
      } catch (error: any) {
        //console.log("error refreshing token == ", error.message);
        throw error;
      }
    } else {
      localStorage.removeItem("github_token");
    }
    throw new Error("invalid github token");
  }
}

export async function checkToken(token: string) {
  try {
    // send viewer query to github graphql api
    const ViewerQuery = gql`
      query ViewerQuery {
        viewer {
          id
        }
      }
    `;
    const data = await gql_request_helper({
      document: ViewerQuery,
      new_token: token,
    });
    return token;
  } catch (error: any) {
    throw new Error("bad token");
  }
}
