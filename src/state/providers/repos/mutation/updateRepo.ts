import { gql } from "graphql-request";
import { graphQLClient } from "../../graphqlClient";
import { IViewerOneRepo } from "../query/viewer_one_repos_types";
import { parseGQLError } from "@/utility/parse_gql_err_response";

export interface UpdateRepositoryInput {
  repositoryId: string;
  name?: string;
  description?: string;
  homepageUrl?: string;
  hasIssuesEnabled?: boolean;
  hasWikiEnabled?: boolean;
  template?: boolean;
}

const UpdateRepositoryMutation = gql`
  mutation updateRepository($input: UpdateRepositoryInput!) {
    updateRepository(input: $input) {
      repository {
        createdAt
        description
        forkCount
        homepageUrl
        id
        isPrivate
        name
        nameWithOwner
        openGraphImageUrl
        hasIssuesEnabled
        hasWikiEnabled
        hasDiscussionsEnabled
        isTemplate
        owner {
          avatarUrl(size: 10)
          id
          login
          url
        }
        url
        visibility
        isFork
        isArchived
        forkingAllowed

        isLocked
        languages(first: 10) {
          edges {
            cursor
            node {
              color
              id
              name
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
        lockReason
        stargazerCount
        stargazers(first: 50) {
          edges {
            cursor
            node {
              email
              avatarUrl
              isFollowingViewer
              isGitHubStar
              isViewer
              viewerIsFollowing
              viewerCanFollow
              url
              twitterUsername
              login
              location
            }
          }
        }
        repositoryTopics(first: 10) {
          nodes {
            id
            resourcePath
            url
            topic {
              id
              name
              stargazerCount
              viewerHasStarred
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    }
  }
`;

export async function updateRepository(input: UpdateRepositoryInput) {
  try {
    const variables = { input };
    const data = await graphQLClient.request<IViewerOneRepo>(
      UpdateRepositoryMutation,
      variables
    );
    //console.log("succesfull update === ", data);
    return data;
  } catch (error: any) {
    const error_string = parseGQLError(error.response);
    //console.log("error updating repository", error_string);
    throw new Error(error_string);
  }
}
