import {  gql } from 'graphql-request';
import { gql_request_helper } from '../../graphqlClient';

const UPDATE_RESOURCE_TAGS = gql`
     mutation UpdateResourceTags($resourceId: ID!, $tags: [String!]!) {
       updateResourceTags(resourceId: $resourceId, tags: $tags) {
         id
         name
         tags
       }
     }
   `;

// const resourceId = 'abc123'; // ID of the resource you want to update
// const tags = ['tag1', 'tag2', 'tag3']; // New tags

// const variables = {
//     resourceId,
//     tags,
// };

export async function updateRepoTags(variables: {
    resourceId: string;
    tags: string[];
}) {
    try {
        // const data = sample_repos
        const data = await gql_request_helper({
            document: UPDATE_RESOURCE_TAGS,
            variables,
        });
        // const { data } = useQuery(ViewerRepositoriesQuery, { variables });
        console.log("update repo tags response === ", data);
        return data;
    } catch (error) {
        console.log("error updating repo tags", error);
        throw error;
    }
}
