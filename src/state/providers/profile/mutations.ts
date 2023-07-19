import { Variables, gql } from "graphql-request";

export const FOLLOWUSER = gql`
  mutation ProfileInfofollowMutation($input: FollowUserInput!) {
    followUser(input: $input) {
      clientMutationId
    }
  }
`;

export const UNFOLLOWUSER = gql`
  mutation ProfileInfounfollowMutation($input: UnfollowUserInput!) {
    unfollowUser(input: $input) {
      clientMutationId
    }
  }
`;

// export async function unfollowUser(variables:Variables){
//   try {
//     const data = await gql_request_helper({
//       document: UNFOLLOWUSER,
//       variables
//     });
//     return data;
//   } catch (error: any) {
//     console.log("error unfollowing user === ", error.message); // Handle the error if the mutation fails
// }
// }
