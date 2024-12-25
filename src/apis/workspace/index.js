import axios from "@/config/axiosConfig";

export const createWorkspaceRequest = async ({ name, description, token }) => {
  try {
    const response = await axios.post(
      "/workspaces",
      { name, description },
      { headers: { "x-access-token": token } }
    );
    console.log("Response of createWorkspaceRequest: ", response);
    return response?.data;
  } catch (error) {
    console.log("Error while creating a new Workspace: ", error);
    throw error.response.data;
  }
};

export const fetchWorkspacesRequest = async ({ token }) => {
  try {
    const response = await axios.get("/workspaces", {
      headers: { "x-access-token": token },
    });
    console.log("Response of fetchWorkspaceRequest: ", response);
    return response?.data;
  } catch (error) {
    console.log("Error while fetching the workspaces: ", error);
    throw error.response.data;
  }
};
