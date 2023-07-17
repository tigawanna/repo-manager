import { Variables, gql } from "graphql-request";
import { gql_request_helper } from "../../graphqlClient";
import { parseGQLError } from "@/utility/parse_gql_err_response";

export interface UpdateRepoTagsInput extends Variables {
  input: {
    repositoryId: string;
    topicNames: string[];
  };
}
const UPDATE_RESOURCE_TAGS = gql`
  mutation UpdateRepositoryTopics($input: UpdateTopicsInput!) {
    updateTopics(input: $input) {
      clientMutationId
      invalidTopicNames
      repository {
        id
      }
    }
  }
`;

// const resourceId = 'abc123'; // ID of the resource you want to update
// const tags = ['tag1', 'tag2', 'tag3']; // New tags

// const variables = {
//     resourceId,
//     tags,
// };

export async function updateRepoTags(variables: UpdateRepoTagsInput) {
  try {
    // const data = sample_repos
    const data = await gql_request_helper({
      document: UPDATE_RESOURCE_TAGS,
      variables,
    });
    // const { data } = useQuery(ViewerRepositoriesQuery, { variables });
    console.log("update repo tags response === ", data);
    return data;
  } catch (error: any) {
    const error_string = parseGQLError(error.response);
    console.log("error updating repo tags", error_string);
    throw new Error(error_string);
  }
}
