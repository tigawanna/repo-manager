export interface IViewerOneRepo {
  viewer: IViewerOneRepoViewer;
}

export interface IViewerOneRepoViewer {
  repository: IViewerOneRepoRepository;
}

export interface IViewerOneRepoRepository {
  id: string;
  name: string;
  viewerPermission: string;
  nameWithOwner: string;
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
  repositoryTopics: RepositoryTopics;
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
