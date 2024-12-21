import { Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth/Auth";
import { SignupCard } from "./components/organisms/auth/SignupCard";
import { SigninCard } from "./components/organisms/auth/SigninCard";

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
    </Routes>
  );
}

export default App;
