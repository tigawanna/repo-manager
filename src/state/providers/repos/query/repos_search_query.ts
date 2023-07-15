import { Variables, gql } from "graphql-request";
import { gql_request_helper } from "../../graphqlClient";
import { parseGQLError } from "@/utility/parse_gql_err_response";

export async function repoSearch(variables:Pick<IRepoSearchInput,"query">) {

try {
    const data = await gql_request_helper<IRepoSearchResult>({
        document: REPOS_SEARCH_QUERY,
        variables
    });
    console.log("search results === ",data)
    return data;
} catch (error:any) {
  const error_string = parseGQLError(error.response);
  console.log("error geting search results",error_string);  
  throw new Error(error_string);
}
}


export interface IRepoSearchInput{
    query:string;
    first:number;
    type:"REPOSITORY"|"USER"|"DISCUSSION"|"ISSUE";
}

const REPOS_SEARCH_QUERY=gql`
 query searchRepos($query: String!) {
    search(first: 10, type: REPOSITORY, query:$query) {
    repositoryCount
    nodes {
      ... on Repository {
        id
        name
        viewerPermission
        nameWithOwner
        description
        url
        openGraphImageUrl
        updatedAt
        homepageUrl
        isFork
        isPrivate
  }
    }
  }
 }
`
export interface IRepoSearchResult {
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

