import { Variables, gql } from "graphql-request";
import { gql_request_helper } from "../../graphqlClient";

export async function repo_search(variables:Pick<IRepoSearchInput,"query">) {
try {
    const data = await gql_request_helper({
        document: REPOS_SEARCH_QUERY,
        variables
    });
    return data;
} catch (error:any) {
  console.log("error geting search results",error.message);  
  throw error;
}
}


export interface IRepoSearchInput{
    query:string;
    first:number;
    type:"REPOSITORY"|"USER"|"DISCUSSION"|"ISSUE";
}

const REPOS_SEARCH_QUERY=gql`
 query searchRepos($query: String) {
    search(first: 10, type: REPOSITORY, query:$query) {
    repositoryCount
    nodes {
      ... on Repository {
        id
        name
        nameWithOwner
        description
        url
        updatedAt
      }
    }
  }
 }
`
export interface IRepoSearchResul {
    search: IRepoSearch
}

export interface IRepoSearch {
    repositoryCount: number
    nodes: IRepoSearchNode[]
}

export interface IRepoSearchNode {
    id: string
    name: string
    nameWithOwner: string
    description?: string
    url: string
    updatedAt: string
}

