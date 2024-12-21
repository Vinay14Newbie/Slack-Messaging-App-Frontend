import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaCheck } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LucideLoader2, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SignupCard = ({
  signupForm,
  setSignupForm,
  validationError,
  onSignupFormSubmit,
  error,
  isPending,
  isSuccess,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Sign up to create your account</CardDescription>

        {validationError && (
          <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert className="size-5" />
            <p>{validationError.message}</p>
          </div>
        )}

        {error && (
          <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert className="size-5" />
            <p>{error.message}</p>
          </div>
        )}

        {isSuccess && (
          <div className="bg-primary/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-primary mb-6">
            <FaCheck className="size-5" />
            <p className="ml-3">
              Successfully signed up. You will be redirected to the login page
              in a few seconds
              <LucideLoader2 className="animate-spin ml-2" />
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form className="space-y-3" onSubmit={onSignupFormSubmit}>
          <Input
            placeholder="Email"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, email: e.target.value })
            }
            value={signupForm.email}
            type="email"
            disabled={isPending}
          />
          <Input
            placeholder="Your username"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, username: e.target.value })
            }
            value={signupForm.username}
            type="text"
            disabled={isPending}
          />
          <Input
            placeholder="Password"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
            }
            value={signupForm.password}
            type="password"
            disabled={isPending}
          />
          <Input
            placeholder="Confirm Passowrd"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, confirmPassword: e.target.value })
            }
            value={signupForm.confirmPassword}
            type="password"
            disabled={isPending}
          />
          <Button
            disabled={isPending}
            size="lg"
            type="submit"
            className="w-full"
          >
            Continue
          </Button>
        </form>

        <Separator className="my-5" />

        <p className="text-s text-muted-foreground mt-4">
          Already have an account?{" "}
          <span
            className="text-sky-600 hover:underline cursor-pointer"
            onClick={() => navigate("/auth/signin")}
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
