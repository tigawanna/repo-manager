
export type ItemList = {
    id: string;
    name: string;
    nameWithOwner: string;
}
export interface Root {
    errors: Error[]
}

export interface Error {
    message: string
    locations: Location[]
}

export interface Location {
    line: number
    column: number
}




export interface ViewerRepos{
    viewer: Viewer
}

export interface Viewer {
    anyPinnableItems: boolean
    id: string
    email: string
    repositories: Repositories
}

export interface Repositories {
    edges: RepositoriesEdge[]
}

export interface RepositoriesEdge {
    cursor: string
    node: RepositoriesNode
}

export interface RepositoriesNode {
    createdAt: string
    description?: string
    forkCount: number
    homepageUrl?: string
    id: string
    isPrivate: boolean
    name: string
    nameWithOwner: string
    openGraphImageUrl: string
    hasIssuesEnabled: boolean
    hasWikiEnabled: boolean
    hasDiscussionsEnabled: boolean
    isTemplate: boolean
    owner: Owner
    url: string
    visibility: string
    isFork: boolean
    isArchived: boolean
    forkingAllowed: boolean
    repositoryTopics: RepositoryTopics
    isLocked: boolean
    languages: Languages
    lockReason: any
    stargazerCount: number
    stargazers: Stargazers
}

export interface Owner {
    avatarUrl: string
    id: string
    login: string
    url: string
}

export interface PageInfo {
    endCursor?: string
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor?: string
}

export interface Languages {
    edges:LanguagesEdge[]
    totalCount: number
    pageInfo: PageInfo
}

export interface LanguagesEdge {
    cursor: string
    node: LanguagesNode
}

export interface LanguagesNode {
    color: string
    id: string
    name: string
}

export interface RepositoryTopics {
    nodes: RepositoryTopicsNode[]
    edges: RepositoryTopicEdge[]
}

export interface RepositoryTopicsNode {
    id: string
    resourcePath: string
    topic: Topic
    url: string
}

export interface Topic {
    id: string
    name: string
}

export interface RepositoryTopicEdge {
    cursor: string
}

export interface Stargazers {
    edges: StargazersEdge[]
}

export interface StargazersEdge {
    cursor: string
    node: StargazersNode
}

export interface GithubUser{
    email: string
    avatarUrl: string
    isFollowingViewer: boolean
    isGitHubStar: boolean
    isViewer: boolean
    viewerIsFollowing: boolean
    viewerCanFollow: boolean
    url: string
    twitterUsername?: string
    login: string
    location?: string
}
export type StargazersNode = GithubUser;
