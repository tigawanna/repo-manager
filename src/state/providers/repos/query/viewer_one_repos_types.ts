export interface IViewerOneRepo {
  user: IViewerOneRepoViewer;
}

export interface IViewerOneRepoViewer {
  repository: IViewerOneRepoRepository;
}

export interface IViewerOneRepoRepository {
  id: string;
  name: string;
  viewerPermission: "ADMIN" | "MAINTAIN" |"READ"|"WRITE"|"TRIAGE";
  nameWithOwner: string;
  isInOrganization: boolean;
  description: string;
  url: string;

  homepageUrl: string;
  openGraphImageUrl: string;
  updatedAt: string;
  isFork: boolean;
  isPrivate: boolean;
  isTemplate: boolean;
  isArchived: boolean;
  isEmpty: boolean;
  forkCount: number;
  stargazerCount: number;
  viewerCanUpdateTopics: boolean;
  viewerCanAdminister: boolean;
  hasIssuesEnabled: boolean;
  hasWikiEnabled: boolean;


  defaultBranchRef: DefaultBranchRef
  parent?: Parent

  repositoryTopics: RepositoryTopics;
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


export interface RepositoryTopics {
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
