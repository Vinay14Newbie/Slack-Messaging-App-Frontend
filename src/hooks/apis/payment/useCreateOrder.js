import { createOrderRequest } from "@/apis/payment";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useCreateOrder = () => {
  const { auth } = useAuth();

  const {
    mutateAsync: createOrderMutation,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (amount) => createOrderRequest({ token: auth?.token, amount }),
    onSuccess: (data) => {
      console.log("Created order successfully: ", data);
    },
    onError: (error) => {
      console.log("Error in creating order: ", error);
    },
  });

  return {
    error,
    createOrderMutation,
    isPending,
    isSuccess,
  };
};
