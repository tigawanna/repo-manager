export interface GithubUser {
  email: string;
  avatarUrl: string;
  isFollowingViewer: boolean;
  isGitHubStar: boolean;
  isViewer: boolean;
  viewerIsFollowing: boolean;
  viewerCanFollow: boolean;
  url: string;
  twitterUsername?: string;
  login: string;
  location?: string;
}
export type StargazersNode = GithubUser;

export interface Error {
  message: string;
  locations: Location[];
}

export interface Location {
  line: number;
  column: number;
}
export type ItemList = {
  id: string;
  name: string;
  nameWithOwner: string;
};
