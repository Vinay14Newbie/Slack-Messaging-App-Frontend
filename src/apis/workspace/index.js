import axios from "@/config/axiosConfig";

export const createWorkspaceRequest = async ({ name, description, token }) => {
  try {
    const response = await axios.post(
      "/workspaces",
      { name, description },
      { headers: { "x-access-token": token } }
    );
    console.log("Response of createWorkspaceRequest: ", response);
    return response?.data?.data;
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
    return response?.data?.data;
  } catch (error) {
    console.log("Error while fetching the workspaces: ", error);
    throw error.response.data;
  }
};

export const fetchWorkspaceDetailsByIdRequest = async ({
  workspaceId,
  token,
}) => {
  try {
    const response = await axios.get(`/workspaces/${workspaceId}`, {
      headers: { "x-access-token": token },
    });
    console.log("Response of get workspace by id: ", response);
    return response?.data?.data;
  } catch (error) {
    console.log("Error while fetching a workspace by id: ", error);
    throw error.response.data;
  }
};

export const updateWorkspaceDetailsRequest = async ({
  name,
  workspaceId,
  token,
}) => {
  try {
    const response = await axios.put(
      `/workspaces/${workspaceId}`,
      { name },
      { headers: { "x-access-token": token } }
    );
    console.log("Response of updateWorkspaceRequest: ", response);
    return response?.data?.data;
  } catch (error) {
    console.log("Error while updating the Workspace: ", error);
    throw error.response.data;
  }
};

export const deleteWorkspaceRequest = async ({ workspaceId, token }) => {
  try {
    const response = await axios.delete(`/workspaces/${workspaceId}`, {
      headers: { "x-access-token": token },
    });
    console.log("Response of deleteWorkspaceRequest: ", response);
    return response?.data?.data;
  } catch (error) {
    console.log("Error while deleting the workspace: ", error);
    throw error.response.data;
  }
};

export const addChannelToWorkspaceRequest = async ({
  channelName,
  token,
  workspaceId,
}) => {
  try {
    const response = await axios.put(
      `/workspaces/${workspaceId}/channels`,
      { channelName },
      { headers: { "x-access-token": token } }
    );
    console.log("Response in createChannelRequest: ", response);
    return response?.data?.data;
  } catch (error) {
    console.log("Error while creating a new Channel: ", error);
    throw error.response.data;
  }
};

export const resetJoinCodeOfWorkspaceRequest = async ({
  workspaceId,
  token,
}) => {
  try {
    console.log("log in request", token, workspaceId);

    const response = await axios.put(
      `/workspaces/${workspaceId}/joinCode/reset`,
      {},
      {
        headers: { "x-access-token": token },
      }
    );
    console.log("Response in resetJoinCodeOfWorkspaceRequest: ", response);
    return response?.data?.data;
  } catch (error) {
    console.log("Error while reseting the joinCode of workspace in request");
    throw error.response.data;
  }
};
