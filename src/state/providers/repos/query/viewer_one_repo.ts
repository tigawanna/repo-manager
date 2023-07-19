import { Variables } from "graphql-request";
import { gql } from "graphql-tag";
import { gql_request_helper } from "@/state/providers/graphqlClient";
import { IViewerOneRepo } from "./viewer_one_repos_types";
import { parseGQLError } from "@/utility/parse_gql_err_response";

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
  } catch (error: any) {
    const error_string = parseGQLError(error.response);
    console.log("error getting viewer oe repo", error_string);
    throw new Error(error_string);
  }
}

export const ViewerOneRepositoryQuery = gql`
  query viewerRepository($name: String!, $login: String!) {
    user(login: $login) {
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
        hasIssuesEnabled

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

        languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
          totalCount
          nodes {
            color
            id
            name
          }
        }
      }
    }
  }
`;
