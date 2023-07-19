import { DataProvider } from "@refinedev/core";
import {
  RepoQueryVariables,
  getViewerRepositories,
} from "./query/viewer_repos";
import { getViewerOneRepository } from "./query/viewer_one_repo";

export const reposDataProvider = (): Pick<
  Required<DataProvider>,
  "getList" | "getOne"
> => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    // console.log("repos getall params === ", { resource, meta, pagination, filters, sorters, });
    const { first, affiliations, isFork, last, orderBy, privacy } =
      sorters as unknown as RepoQueryVariables;

    const repos = (await getViewerRepositories({
      first,
      orderBy,
      isFork,
      after: pagination?.current as any,
    })) as any;
    // const repos = await getViewerRepositories({first: 10,after:pagination?.current as any}) as any
    const data = repos.viewer.repositories.edges;
    // console.log("viewer response data provider=== ",data)
    return {
      data,
      total: repos.viewer.repositories.totalCount,
    };
  },
  getOne: async ({ resource, id, meta }) => {
    // console.log("repos get one params === ", { resource, id, meta });
    const nameWithOwner = meta?.nameWithOwner.split("/");
    // console.log("name with owner === ", nameWithOwner);
    const name = nameWithOwner[1] ?? "";
    const login = nameWithOwner[0] ?? "";
    // const repo = (await getViewerOneRepository({ name: id as string })) as any;
    const repo = (await getViewerOneRepository({ name, login })) as any;
    const data = repo;
    // console.log("data provider getone response  === ",data)
    return {
      data,
    };
  },
});
