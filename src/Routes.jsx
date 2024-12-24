import { Route, Routes } from "react-router-dom";
import { Auth } from "@/pages/auth/Auth";
import { SignupContainer } from "@/components/organisms/auth/SignupContainer";
import { SigninContainer } from "@/components/organisms/auth/SigninContainer";
import { NotfoundPage } from "@/pages/notFound/Notfound";
import { ProtectedRoute } from "@/components/molecules/ProtectedRoute";
import { Home } from "@/pages/home/Home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/auth/signup"
        element={
          <Auth>
            <SignupContainer />
          </Auth>
        }
      />

      <Route
        path="/auth/signin"
        element={
          <Auth>
            <SigninContainer />
          </Auth>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route path="/*" element={<NotfoundPage />} />
    </Routes>
  );
};
