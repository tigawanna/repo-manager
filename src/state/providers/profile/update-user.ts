import axios from "axios";

export interface UpdateViewerInput {
  name?: string;
  email?: string;
  blog?: string;
  company?: string;
  location?: string;
  hireable?: boolean;
  bio?: string;
  twitter_username?: string;
}

export async function updateViewer(input: UpdateViewerInput) {
  try {
    const token = localStorage.getItem("github_token");
    const response = await axios.patch("https://api.github.com/user", input, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Bearer ${token ?? import.meta.env.VITE_GH_PAT}`,
      },
    });
    //console.log("User updated successfully:", response.data);
  } catch (error) {
    // @ts-expect-error
    console.error("Error updating user:", error.response.data);
  }
}

// // Example usage
// const userInput: UpdateUserInput = {
//     name: "New Name",
//     email: "newemail@example.com",
//     blog: "https://example.com",
//     company: "Example Company",
//     location: "San Francisco",
//     hireable: true,
//     bio: "Hello, I'm a developer.",
// };

// const accessToken = "YOUR_ACCESS_TOKEN";
// updateUser(userInput, accessToken);
