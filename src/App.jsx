import { Route, Routes } from "react-router-dom";
import { Auth } from "@/pages/auth/Auth";
import { NotfoundPage } from "@/pages/notFound/Notfound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignupContainer } from "@/components/organisms/auth/SignupContainer";
import { Toaster } from "@/components/ui/toaster";
import { SigninContainer } from "@/components/organisms/auth/SigninContainer";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
            <Auth>
              <h1>Home</h1>
            </Auth>
          }
        />

        <Route path="/*" element={<NotfoundPage />} />
      </Routes>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
