import { Variables, gql } from "graphql-request";
import { gql_request_helper } from "../graphqlClient";
import { IViewerQuery } from "./viewr_query_types";



export async function getViewerRepositories() {
    try {
        // const data = sample_repos
        const data = await gql_request_helper<IViewerQuery,Variables>({document: ViewerQuery});
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
      status {
        id
      }
      starredRepositories(first: 10) {
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
      watching(first: 10) {
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
      gists(first: 10) {
        nodes {
          name
          url
          description
          stargazerCount
        }
        totalCount
      }
      followers(first: 1) {
        totalCount
      }
      followers(first: 1) {
        totalCount
      }
      repositories(first: 10) {
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
    }
  }`;

