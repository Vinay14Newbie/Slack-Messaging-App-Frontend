import { Route, Routes } from "react-router-dom";
import { Auth } from "@/pages/auth/Auth";
import { SignupCard } from "@/components/organisms/auth/SignupCard";
import { SigninCard } from "@/components/organisms/auth/SigninCard";
import { NotfoundPage } from "@/pages/notFound/Notfound";

function App() {
  return (
    <Routes>
      <Route
        path="/auth/signup"
        element={
          <Auth>
            <SignupCard />
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
  );
}

export default App;
