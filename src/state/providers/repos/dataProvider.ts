import { DataProvider } from "@refinedev/core";
import { getViewerRepositories } from "./query/viewer_repos";



export const reposDataProvider = (): Pick<Required<DataProvider>, "getList"> => ({
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const repos = await getViewerRepositories({first: 10}) as any
    const data = repos.viewer.repositories.edges
    // console.log("viewer response data provider=== ",data)

        return {
            data,
            total: repos.viewer.repositories.totalCount
        };
    },


});
