export interface IViewerRepositoriesQuery {
    viewer: IViewer
}

export interface IViewer {
    repositories: IRepositories
}

export interface IRepositories {
    edges: IRepositoriesEdge[]
}

export interface IRepositoriesEdge {
    cursor: string
    node: IRepositoriesNode
}

export interface IRepositoriesNode {
    id: string
    name: string
    viewerPermission: string
    nameWithOwner: string
    description?: string
    url: string
    openGraphImageUrl: string
    homepageUrl: string
    updatedAt: string
    isFork: boolean
    isPrivate: boolean
    isTemplate: boolean
    isArchived: boolean
    isEmpty: boolean
    forkCount: number
    stargazerCount: number
    viewerCanUpdateTopics: boolean
    viewerCanAdminister: boolean
    repositoryTopics: IRepositoryTopics
}

export interface IRepositoryTopics {
    nodes: IRepositoryTopicsNode[]
}

export interface IRepositoryTopicsNode {
    id: string
    resourcePath: string
    topic: ITopic
    url: string
}

export interface ITopic {
    id: string
    name: string
}
