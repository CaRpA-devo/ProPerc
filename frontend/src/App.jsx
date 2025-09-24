import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router";
import { IndexPage } from "./components/pages/index.page.jsx";
import { DashboardPage } from "./components/pages/dashboard.page";
import { SignUpPage } from "./components/pages/signup.page.jsx";
import { SignInPage } from "./components/pages/signin.page.jsx";
import NotFoundPage from "./components/pages/notfound.page";

function App() {
  return (
    <>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<IndexPage />} />

        {/* SignIn / SignOut */}
        {/* TODO noch anpassen das es im Layout rendert */}
        <Route element={<SignInPage />} path="/signin" />
        <Route element={<SignInPage />} path="/signin/factor-one" />
        <Route element={<SignInPage />} path="/signin/reset-password" />
        <Route element={<SignInPage />} path="/signin/reset-password-success" />
        <Route element={<SignInPage />} path="/signin/sso-callback" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<SignUpPage />} path="/signup/verify-email-address" />

        {/* Dashboard */}
        <Route element={<DashboardPage />} path="/dashboard"></Route>

        {/* 404-Route*/}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
export default App;
