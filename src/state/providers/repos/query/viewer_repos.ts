import { gql }from "graphql-tag";
import { sample_repos } from "../sample_repos";
import { gql_request_helper, graphQLClient } from "../../graphqlClient";
import { IViewerRepositoriesQuery } from "./viwer_repo_types";
import { Variables } from "graphql-request";




enum RepositoryOrder {
    CREATED_AT = 'CREATED_AT',
    UPDATED_AT = 'UPDATED_AT',
    PUSHED_AT = 'PUSHED_AT',
    NAME = 'NAME',
    STARGAZERS = 'STARGAZERS',
}

export interface RepoQueryVariables extends Variables{
    first: number | null;
    orderBy?:{
        field:"CREATED_AT" | "UPDATED_AT" | "PUSHED_AT" | "NAME" | "STARGAZERS",
        order: "ASC" | "DESC",
    };
    before?: string | null;
    after?: string | null;
    last?: number | null;
    isFork?: boolean;
    affiliations?: ("OWNER" | "COLLABORATOR" | "ORGANIZATION_MEMBER")[];
    privacy?: "PUBLIC" | "PRIVATE";
}


export async function getViewerRepositories(variables:RepoQueryVariables) {
    // const variables = {
    //     first: 100,
    // }
    // console.log("variables  === ",variables)
    try {
        // const data = sample_repos
        
        const data = await gql_request_helper<IViewerRepositoriesQuery,RepoQueryVariables>({document:ViewerRepositoriesQuery,variables})
            // const { data } = useQuery(ViewerRepositoriesQuery, { variables });
        console.log("viewer response === ", data)
        return data
    } catch (error) {
        console.log("error getting viewer repos", error)
        throw error

    }
}



export const ViewerRepositoriesQuery = gql`
query viewerRepositories(
  $first: Int,
  $orderBy: RepositoryOrder,
  $before: String,
  $after: String,
  $last: Int,
  $isFork: Boolean,
  $affiliations: [RepositoryAffiliation],
  $privacy: RepositoryPrivacy
  
  ) {
  viewer {
    repositories(
      before: $before,
      after: $after,
      orderBy: $orderBy,
      first: $first,
      last: $last,
      isFork: $isFork,
      affiliations: $affiliations,
      privacy: $privacy
      
    ) {
      edges {
        cursor
        node {
          id
          name
          viewerPermission
          nameWithOwner
          description
          url
          openGraphImageUrl
          updatedAt

          isFork
          isPrivate
          isTemplate
          isArchived
          isEmpty
          
          
          forkCount
          stargazerCount
          
          viewerCanUpdateTopics
          viewerCanAdminister
          viewerPermission
          
          
          repositoryTopics(first: 10) {
            nodes {
              id
              resourcePath
              topic {
                id
                name
              }
              url
            }
          }


        }
      }
    }
  }
}


`
