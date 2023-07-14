import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import {
  GraphQLClient,
  RequestDocument,
  RequestExtendedOptions,
  Variables,
  request,
} from "graphql-request";

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
};

export function gql_request_helper<T = unknown, V = Variables>({
  document,
  requestHeaders,
  variables,
}: GraphQlRequestHelper<T, V>) {
  return request<T>({
    url: endpoint,
    document,
    requestHeaders: { ...headers, ...requestHeaders },
    variables,
  });
}
