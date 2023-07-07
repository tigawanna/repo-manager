import { GraphQLClient } from "graphql-request";

const endpoint = "https://api.github.com/graphql";
export const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
        authorization: `Bearer ${import.meta.env.VITE_GH_PAT}`,
    },
});

