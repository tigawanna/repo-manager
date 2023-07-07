import { DataProvider } from "@refinedev/core";
import { getViewerRepos } from "./getViewerRepos";

export const reposDataProvider = (): Pick<Required<DataProvider>, "getList"> => ({
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const repos = await getViewerRepos() as any
    const data = repos.viewer.repositories.edges
    // console.log("viewer response data provider=== ",data)

        return {
            data,
            total: repos.viewer.repositories.totalCount
        };
    },


});
