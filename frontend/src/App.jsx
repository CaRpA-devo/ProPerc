import "./App.css";

import { Route, Routes } from "react-router-dom";
import { IndexPage } from "./components/pages/index.page.jsx";
import { DashboardPage } from "./components/pages/dashboard.page.jsx";

import NotFoundPage from "./components/pages/notfound.page.jsx";
import { SettingsPage } from "./components/pages/settings.page.jsx";
import { WikiPage } from "./components/pages/wiki.page.jsx";
import { SignInPage } from "./components/pages/signin.page.jsx";
import { SignUpPage } from "./components/pages/signup.page.jsx";

function App() {
  return (
    <>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<IndexPage />} />
        Signin/Signout
        <Route element={<SignInPage />} path="/signin" />
        <Route element={<SignInPage />} path="/signin/factor-one" />
        <Route element={<SignInPage />} path="/signin/reset-password" />
        <Route element={<SignInPage />} path="/signin/reset-password-success" />
        <Route element={<SignInPage />} path="/signin/sso-callback" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<SignUpPage />} path="/signup/verify-email-address" />
        {/* Dashboard */}
        <Route element={<DashboardPage />} path="/dashboard" />
        {/* Settings */}
        <Route element={<SettingsPage />} path="/settings" />
        {/* Wiki */}
        <Route element={<WikiPage />} path="/wiki" />
        {/* 404-Route*/}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
export default App;
