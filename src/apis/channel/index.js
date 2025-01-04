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
