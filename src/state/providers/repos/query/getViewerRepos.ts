import gql from "graphql-tag";
import { sample_repos } from "../sample_repos";
import { RepositoryConnectionFragment } from "./repo_fragment";

export async function getViewerRepos(){
    try {
      const data = sample_repos
        // const data = await graphQLClient.request<ViewerRepos>(ViewerReposQuery);
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


export const ViewerReposQuery = gql`
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
${RepositoryConnectionFragment}
`


