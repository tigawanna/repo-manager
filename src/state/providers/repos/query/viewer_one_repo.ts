import { Variables } from "graphql-request";
import { gql } from "graphql-tag";
import { gql_request_helper } from "@/state/providers/graphqlClient";
import { IViewerOneRepo } from "./viewer_one_repos_types";

export interface OneRepoQueryVariables extends Variables {
  name: string;
}

export async function getViewerOneRepository(variables: OneRepoQueryVariables) {
  try {
    // const data = sample_repos
    const data = await gql_request_helper<
      IViewerOneRepo,
      OneRepoQueryVariables
    >({
      document: ViewerOneRepositoryQuery,
      variables,
    });
    // const { data } = useQuery(ViewerRepositoriesQuery, { variables });
    console.log("viewer one repo response === ", data);
    return data;
  } catch (error) {
    console.log("error getting viewer oe repo", error);
    throw error;
  }
}

export const ViewerOneRepositoryQuery = gql`
  query viewerRepository($name: String!) {
    viewer {
      repository(name: $name) {
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
        isTemplate
        isArchived
        isEmpty
        forkCount
        stargazerCount
        viewerCanUpdateTopics
        viewerCanAdminister
        viewerPermission
        
        hasWikiEnabled
        hasIssuesEnabled,

        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 1) {
                totalCount
                nodes {
                  oid
                  committedDate
                  deletions
                  additions
                }
              }
            }
          }
        }
        
        parent {
          name
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 1) {
                  totalCount
                  nodes {
                    oid
                    committedDate
                    deletions
                    additions
                  }
                }
              }
            }
          }
        }

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
`;
