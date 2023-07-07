import { gql } from "graphql-request";
import { graphQLClient } from "../graphqlClient";
import { ViewerRepos } from "./types";
import { sample_repos } from "./sample_repos";

export async function getViewerRepos(){
    try {
      const data = sample_repos
        // const data = await graphQLClient.request<ViewerRepos>(viewerReposQuery);
        console.log("viewer response === ",data)
        return data
    } catch (error) {
        console.log("error getting viewer repos",error)
        throw error
        
    }
}


type RepositoryOrderBYFileds = "UPDATED_AT"|"CREATED_AT"|"STARGAZER_COUNT"|"FORK_COUNT"|"NAME"
type RepositoryOptions = {
first:number;
after?:string //cursor
before?:string //cursor
orderBy:{
    field:RepositoryOrderBYFileds
    direction:"DESC"|"ASC"
  }
isFork?:boolean
affiliations:"OWNER"|"COLLABORATOR"|"ORGANIZATION_MEMBER";
privacy:"PUBLIC"|"PRIVATE"
}


export const ViewerReposQueryQuery = gql`
  query viewerRepositories {
    viewer {
      anyPinnableItems
      id
      email
      repositories(first: 100,orderBy: {field:PUSHED_AT, direction: DESC}) {
        edges {
          cursor
          node {
            id
            viewerPermission
            isFork
            forkCount
            name
            nameWithOwner
            description
            url
            openGraphImageUrl
            updatedAt
            stargazerCount
            isPrivate
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
              edges {
                cursor
              }
            }
          }
        }
      }
    }
  }
`;



const FullViewerReposQuery = gql`
query viewerRepositories {
  viewer {
    id
    email
    bio
    repositories(first: 100, orderBy: { field: PUSHED_AT, direction: DESC }) {
      ...RepositoryConnectionFragment
    }
  }
}

fragment RepositoryConnectionFragment on RepositoryConnection {
  edges {
    cursor
    node {
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
      repositoryTopics(first: 10) {
        ...RepositoryTopicConnectionFragment
      }
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
    }
  }
  totalCount
}

fragment RepositoryTopicConnectionFragment on RepositoryTopicConnection {
  edges {
    cursor
    node {
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
  }
  totalCount
  pageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
}

`
