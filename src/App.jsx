import { Route, Routes } from "react-router-dom";
import { Auth } from "@/pages/auth/Auth";
import { SigninCard } from "@/components/organisms/auth/SigninCard";
import { NotfoundPage } from "@/pages/notFound/Notfound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignupContainer } from "./components/organisms/auth/SignupContainer";

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
              <SigninCard />
            </Auth>
          }
        />

        <Route path="/*" element={<NotfoundPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
