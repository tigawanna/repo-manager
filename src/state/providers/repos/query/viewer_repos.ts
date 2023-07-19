import { gql } from "graphql-tag";
import { sample_repos } from "../sample_repos";
import { gql_request_helper, graphQLClient } from "../../graphqlClient";
import { IViewerRepositoriesQuery } from "./viwer_repo_types";
import { Variables } from "graphql-request";
import { parseGQLError } from "@/utility/parse_gql_err_response";

export interface RepoQueryVariables extends Variables {
  first: number | null;
  orderBy?: {
    field: "CREATED_AT" | "UPDATED_AT" | "PUSHED_AT" | "NAME" | "STARGAZERS";
    direction: "ASC" | "DESC";
  };
  before?: string | null;
  after?: string | null;
  last?: number | null;
  isFork?: boolean;
  affiliations?: ("OWNER" | "COLLABORATOR" | "ORGANIZATION_MEMBER")[];
  privacy?: "PUBLIC" | "PRIVATE";
}

export async function getViewerRepositories(variables: RepoQueryVariables) {
  // console.log("variables == ",variables)
  try {
    // const data = sample_repos
    const data = await gql_request_helper<
      IViewerRepositoriesQuery,
      RepoQueryVariables
    >({
      document: ViewerRepositoriesQuery,
      variables,
    });
    // const { data } = useQuery(ViewerRepositoriesQuery, { variables });
    // console.log("viewer repos response === ", data);
    return data;
  } catch (error: any) {
    const error_string = parseGQLError(error.response);
    console.log("error gettingviewer repos", error_string);
    throw new Error(error_string);
  }
}

export const ViewerRepositoriesQuery = gql`
  query viewerRepositories(
    $first: Int
    $orderBy: RepositoryOrder
    $before: String
    $after: String
    $last: Int
    $isFork: Boolean
    $affiliations: [RepositoryAffiliation]
    $privacy: RepositoryPrivacy
  ) {
    viewer {
      repositories(
        before: $before
        after: $after
        orderBy: $orderBy
        first: $first
        last: $last
        isFork: $isFork
        affiliations: $affiliations
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
            hasIssuesEnabled
            hasWikiEnabled

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
    }
  }
`;
