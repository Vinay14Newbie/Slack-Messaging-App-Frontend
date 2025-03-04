import axios from "@/config/axiosConfig";

export const getPaginatedDMsRequest = async ({
  memberId,
  token,
  limit,
  page,
}) => {
  try {
    const response = await axios.get(`/dms/${memberId}`, {
      params: {
        limit: limit || 20,
        page: page || 0,
      },
      headers: { "x-access-token": token },
    });
    return response?.data?.data;
  } catch (error) {
    throw error.response;
  }
};
