import { signInRequest } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const useSignin = () => {
  const { toast } = useToast();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signinMutation,
  } = useMutation({
    mutationFn: signInRequest,
    onSuccess: (data) => {
      console.log("User signed in successfully ", data);
      toast({
        title: "Successfully signed in",
        message: "You will be redirected to the home page in a few seconds",
        type: "success",
      });
    },
    onError: (error) => {
      console.log("Failed to sign in ", error);
      toast({
        title: "Failed to signed in",
        message: error.message,
        type: "error",
        variant: "destructive",
      });
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    signinMutation,
  };
};