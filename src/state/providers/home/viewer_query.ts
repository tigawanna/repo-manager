import { Variables, gql } from "graphql-request";
import { gql_request_helper } from "../graphqlClient";
import { IViewerQuery } from "./viewr_query_types";

export async function getViewerRepositories() {
  try {
    // const data = sample_repos
    const data = await gql_request_helper<IViewerQuery, Variables>({ document: ViewerQuery });
    // const { data } = useQuery(ViewerRepositoriesQuery, { variables });
    console.log("viewer repos response === ", data);
    return data;
  } catch (error) {
    console.log("error getting viewer repos", error);
    throw error;
  }
}

const ViewerQuery = gql`
  {
    viewer {
      __typename
      id
      name
      avatarUrl
      bio
      company
      createdAt
      email
      isFollowingViewer
      isHireable
      websiteUrl
      viewerCanFollow
      viewerIsFollowing
      url
      twitterUsername
      company
      login
      isViewer
      location
      status {
        id
      }
      starredRepositories(first: 10,orderBy: { field:STARRED_AT, direction: DESC }) {
        nodes {
          name
          nameWithOwner
          url
          openGraphImageUrl
          homepageUrl
          stargazerCount
          forkCount
        }
        totalCount
      }
      watching(first: 10,orderBy: { field: PUSHED_AT, direction: DESC }) {
        nodes {
          name
          nameWithOwner
          url
          openGraphImageUrl
          homepageUrl
          stargazerCount
          forkCount
        }
        totalCount
      }
      gists(first: 10,orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          name
          url
          description
          stargazerCount
        }
        totalCount
      }
      following(first: 1) {
        totalCount
              nodes {
        avatarUrl
        name
        bio
        id
        login
        email
      }
      }
      followers(first: 1) {
        totalCount
        nodes {
        avatarUrl
        name
        bio
        id
        login
        email
      }
      }

      repositories(first: 10,orderBy: { field: PUSHED_AT, direction: DESC }) {
        nodes {
          name
          nameWithOwner
          url
          openGraphImageUrl
          homepageUrl
          stargazerCount
          forkCount
          isFork
        }
        totalCount
      }
    }
  }
`;
