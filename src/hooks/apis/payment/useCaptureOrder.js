import { capturePaymentRequest } from "@/apis/payment";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useCaptureOrder = () => {
  const { auth } = useAuth();

  const {
    mutateAsync: captureOrderMutation,
    isSuccess,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ orderId, status, paymentId, signature }) =>
      capturePaymentRequest({
        token: auth?.token,
        orderId: orderId,
        status: status,
        paymentId: paymentId,
        signature: signature,
      }),
    onSuccess: () => {
      console.log("Payment captured successfully: ");
    },
    onError: () => {
      console.log("Error in capturing payment: ");
    },
  });

  return {
    captureOrderMutation,
    isSuccess,
    isPending,
    error,
  };
};
