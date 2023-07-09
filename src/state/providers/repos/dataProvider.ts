import { DataProvider } from "@refinedev/core";
import { getViewerRepositories } from "./query/viewer_repos";
import { getViewerOneRepository } from "./query/viewer_one_repo";



export const reposDataProvider = (): Pick<Required<DataProvider>, "getList"|"getOne"> => ({
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
    // console.log("repos getall params === ", { resource, meta, pagination, filters, sorters, });
    const repos = await getViewerRepositories({first: 10,after:pagination?.current as any}) as any
    const data = repos.viewer.repositories.edges
    // console.log("viewer response data provider=== ",data)
     return {
            data,
            total: repos.viewer.repositories.totalCount
        };
    },
    getOne: async ({ resource, id, meta }) => {
        // console.log("repos get one params === ", { resource, id, meta });
        const repo = await getViewerOneRepository({ name:id as string }) as any
        const data  = repo
        // console.log("data provider getone response  === ",data)
        return {
            data
        
        };
    }


});
