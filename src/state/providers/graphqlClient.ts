import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import {
  GraphQLClient,
  RequestDocument,
  RequestExtendedOptions,
  Variables,
  request,
} from "graphql-request";
import { pb } from "../pocketbase/client";

const endpoint = "https://api.github.com/graphql";
const token = localStorage.getItem("github_token");
const headers = {
  authorization: `Bearer ${token??import.meta.env.VITE_GH_PAT}`,
};
export const graphQLClient = new GraphQLClient(endpoint, { headers });

export type GraphQlRequestHelper<T, V> = Partial<
  Omit<RequestExtendedOptions<Variables, unknown>, "document">
> & {
  document: RequestDocument | TypedDocumentNode<T, V>;
  new_token?:string;
};

export function gql_request_helper<T = unknown, V = Variables>(
  {document,requestHeaders,variables,new_token}: GraphQlRequestHelper<T, V>) {
  const local_token = localStorage.getItem("github_token");
  
  const token =()=>{
    if(local_token&&local_token.length>0){
      return local_token;
    }
    if(new_token && new_token.length>0){
      return new_token;
    }
    return pb.authStore.model?.access_token as string;
  }

  const headers = {
    authorization: `Bearer ${token()}`,
  };
  return request<T>({
    url: endpoint,
    document,
    requestHeaders: { ...headers, ...requestHeaders },
    variables,
  });
}
