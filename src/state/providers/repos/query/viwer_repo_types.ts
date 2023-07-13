export interface IViewerRepositoriesQuery {
  viewer: IViewer;
}

export interface IViewer {
  repositories: IRepositories;
}

export interface IRepositories {
  edges: IRepositoriesEdge[];
}

export interface IRepositoriesEdge {
  cursor: string;
  node: IRepositoriesNode;
}

export interface IRepositoriesNode {
  id: string;
  name: string;
  viewerPermission: string;
  nameWithOwner: string;
  description?: string;
  url: string;
  openGraphImageUrl: string;
  homepageUrl: string;
  updatedAt: string;
  isFork: boolean;
  isPrivate: boolean;
  isTemplate: boolean;
  isArchived: boolean;
  isEmpty: boolean;
  forkCount: number;

  defaultBranchRef: DefaultBranchRef
  parent?: Parent

  stargazerCount: number;
  viewerCanUpdateTopics: boolean;
  viewerCanAdminister: boolean;
  repositoryTopics: IRepositoryTopics;
}

export interface DefaultBranchRef {
  target: Target
}

export interface Target {
  history: History
}

export interface History {
  totalCount: number
  nodes: HistoryNode[]
}

export interface HistoryNode {
  oid: string
  committedDate: string
  deletions: number
  additions: number
}

export interface Parent {
  name: string
  defaultBranchRef: ParentDefaultBranchRef
}

export interface ParentDefaultBranchRef {
  target: ParentTarget
}

export interface ParentTarget {
  history: ParentHistory
}

export interface ParentHistory {
  totalCount: number
  nodes: ParentHistoryNode[]
}

export interface ParentHistoryNode {
  oid: string
  committedDate: string
  deletions: number
  additions: number
}

export interface IRepositoryTopics {
  nodes: IRepositoryTopicsNode[];
}

export interface IRepositoryTopicsNode {
  id: string;
  resourcePath: string;
  topic: ITopic;
  url: string;
}

export interface ITopic {
  id: string;
  name: string;
}
