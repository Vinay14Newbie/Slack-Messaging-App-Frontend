import { useSignup } from "@/hooks/apis/auth/useSignup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupCard } from "./SignupCard";

export const SignupContainer = () => {
  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState(null);

  const { isPending, isSuccess, error, signupMutation } = useSignup();

  async function onSignupFormSubmit(e) {
    e.preventDefault();
    console.log("Signup form submitted ", signupForm);

    if (
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.confirmPassword ||
      !signupForm.username
    ) {
      console.log("All fields are required");
      setValidationError({ message: "All fields are required" });
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      console.log("Passwords do not match");
      setValidationError({ message: "Passwords do not match" });
      return;
    }

    setValidationError(null);

    await signupMutation({
      email: signupForm.email,
      username: signupForm.username,
      password: signupForm.password,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/auth/signin");
      }, 3000);
    }
  }, [isSuccess, navigate]);

  return (
    <SignupCard
      signupForm={signupForm}
      setSignupForm={setSignupForm}
      error={error}
      isPending={isPending}
      isSuccess={isSuccess}
      validationError={validationError}
      onSignupFormSubmit={onSignupFormSubmit}
    />
  );
};
