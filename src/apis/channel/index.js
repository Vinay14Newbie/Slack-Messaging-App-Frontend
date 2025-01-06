import axios from "@/config/axiosConfig";

export const getChannelByIdRequest = async ({ token, channelId }) => {
  try {
    const response = await axios.get(`/channels/${channelId}`, {
      headers: { "x-access-token": token },
    });
    console.log("Response of get channel by id: ", response);
    return response?.data?.data;
  } catch (error) {
    console.log("Error while fetching a channel by id: ", error);
    throw error.response;
  }
};

export const getPaginateMessagesRequest = async ({
  channelId,
  token,
  limit,
  offset,
}) => {
  try {
    const response = await axios.get(`/messages/${channelId}`, {
      params: {
        limit: limit || 20,
        offset: offset || 0,
      },
      headers: { "x-access-token": token },
    });
    console.log("Response from paginated messages: ", response);
    return response?.data?.data;
  } catch (error) {
    console.log("Error while fetching paginated messages: ", error);
    throw error.response;
  }
};
