import { pb } from "./client";

export async function saveGithubPAT(token:string){
try {
    localStorage.setItem("GH_PAT",token);
} catch (error:any) {
    console.log("error saving PAT == ", error.message); // Handle the error if the mutation fails
}
}

export async function getGithubAccessToken(){
    try {
       const token = localStorage.getItem("GH_PAT");
       if(token && token.length > 0){
           return token;
       }
        pb.authStore.isValid && await pb.collection("devs").authRefresh()
       return pb.authStore.model?.access_token as string

        
    } catch (error:any) {
        console.log("error getting token == ", error.message);
        throw error.message;
    }
}
