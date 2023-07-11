import { gql } from "graphql-request";
import { graphQLClient } from "../../graphqlClient";
import { ViewerRepos } from "../types";

// const UpdateRepositoryMutation = gql`
// mutation {
//   updateRepository(input: {
//     repositoryId: "R_kgDOJRF48w",
//     # name: "NEW_REPOSITORY_NAME",
//     description: "NEW_REPOSITORY_DESCRIPTION",
//     # homepageUrl: "NEW_HOMEPAGE_URL",
//     # hasIssuesEnabled: true,
//     # hasProjectsEnabled: true,
//     # hasWikiEnabled: true,
//     }) {
//     repository {
//        id
//           viewerPermission
//           isFork
//           forkCount
//           name
//           nameWithOwner
//           description
//           url
//           openGraphImageUrl
//           updatedAt
//           stargazerCount
//           isPrivate
//           repositoryTopics(first: 10) {
//             nodes {
//               id
//               resourcePath
//               topic {
//                 id
//                 name
//               }
//               url
//             }
//             edges {
//               cursor
//             }
//           }

//     }
//   }
// }

// `
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
    const data = await graphQLClient.request<ViewerRepos>(
      UpdateRepositoryMutation,
      variables
    );
    console.log("succesfull update === ", data);
    return data;
  } catch (error: any) {
    console.log("error updating repository  == ", error.message); // Handle the error if the mutation fails
    throw error;
  }
}
