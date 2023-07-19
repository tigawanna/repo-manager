export interface IViewerQuery {
  viewer: Viewer;
}

export interface Viewer {
  __typename: string;
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;

  isViewer: boolean;
  location: string;
  login: string;

  company: any;
  createdAt: string;
  email: string;
  isFollowingViewer: boolean;
  isHireable: boolean;
  websiteUrl: string;
  viewerCanFollow: boolean;
  viewerIsFollowing: boolean;
  url: string;
  twitterUsername: any;
  status: any;
  starredRepositories: StarredRepositories;
  watching: Watching;
  gists: Gists;
  followers: Followers;
  following: Followers;
  repositories: Repositories;
}

export interface StarredRepositories {
  nodes: StarredRepositoriesNode[];
  totalCount: number;
}

export interface StarredRepositoriesNode {
  name: string;
  nameWithOwner: string;
  url: string;
  openGraphImageUrl: string;
  homepageUrl?: string;
  stargazerCount: number;
  forkCount: number;
}

export interface Watching {
  nodes: WatchingNode[];
  totalCount: number;
}

export interface WatchingNode {
  name: string;
  nameWithOwner: string;
  url: string;
  openGraphImageUrl: string;
  homepageUrl?: string;
  stargazerCount: number;
  forkCount: number;
}

export interface Gists {
  nodes: GistsNode[];
  totalCount: number;
}

export interface GistsNode {
  name: string;
  url: string;
  description: string;
  stargazerCount: number;
}

export interface Followers {
  totalCount: number;
  nodes: FollowerNode;
}
export interface FollowerNode {
  avatarUrl: string;
  name: string;
  bio: string;
  id: string;
  login: string;
  email: string;
}

export interface Repositories {
  nodes: RepositoriesNode[];
  totalCount: number;
}

export interface RepositoriesNode {
  name: string;
  nameWithOwner: string;
  url: string;
  openGraphImageUrl: string;
  homepageUrl: any;
  stargazerCount: number;
  forkCount: number;
}
