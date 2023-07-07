import gql from "graphql-tag"

export const RepositoryTopicConnectionFragment = gql`
fragment RepositoryTopicConnectionFragment on RepositoryTopicConnection {
  nodes{
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

`

export const RepositoryConnectionFragment = gql`
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
${RepositoryTopicConnectionFragment}
`
