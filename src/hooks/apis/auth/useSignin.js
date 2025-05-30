import { signInRequest } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/context/useAuth";

export const useSignin = () => {
  const { toast } = useToast();
  const { setAuth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signinMutation,
  } = useMutation({
    mutationFn: signInRequest,
    onSuccess: (response) => {
      console.log("User signed in successfully ", response);

      const userObject = JSON.stringify(response.data);

      localStorage.setItem("user", userObject);
      localStorage.setItem("token", response.data.token);

      setAuth({
        user: response.data,
        token: response.data.token,
        isLoading: false,
      });

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
