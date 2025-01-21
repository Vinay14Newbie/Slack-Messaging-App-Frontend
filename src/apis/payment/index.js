import axios from "@/config/axiosConfig";

export const createOrderRequest = async ({ token, amount }) => {
  try {
    const response = await axios.post(
      "/payments/order",
      { amount },
      {
        headers: { "x-access-token": token },
      }
    );
    console.log("Response from createOrderRequest: ", response);
    return response?.data?.data;
  } catch (error) {
    console.log("Error while createOrderRequest: ", error);
    throw error.response;
  }
};

export const capturePaymentRequest = async ({
  token,
  orderId,
  status,
  paymentId,
  signature,
}) => {
  try {
    const response = await axios.post(
      "/payments/capture",
      {
        orderId,
        status,
        paymentId,
        signature,
      },
      {
        headers: { "x-access-token": token },
      }
    );
    console.log("Response of capturePaymentRequest: ", response);

    return response?.data?.data;
  } catch (error) {
    console.log("Error while capturePaymentRequest: ", error);
    throw error.response;
  }
};
