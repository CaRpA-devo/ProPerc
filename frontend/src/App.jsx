import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router";
import { IndexPage } from "./components/pages/index.page.jsx";
import { DashboardPage } from "./components/pages/dashboard.page";
import { SignUpPage } from "./components/pages/signup.page.jsx";
import { SignInPage } from "./components/pages/signin.page.jsx";
import { DashboardLayout } from "./components/layouts/dashboard.layout";

// TODO Lazyloading implementieren

function App() {
  return (
    <>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<IndexPage />} />

        {/* SignIn / SignOut */}
        {/* TODO noch anpassen das es im Layout rendert */}

        <Route element={<SignInPage />} path="/signin/factor-one" />
        <Route element={<SignInPage />} path="/signin/reset-password" />
        <Route element={<SignInPage />} path="/signin/reset-password-success" />
        <Route element={<SignInPage />} path="/signin/sso-callback" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<SignUpPage />} path="/signup/verify-email-address" />

        {/* Dashboard */}
        <Route element={<DashboardLayout />} path="/dashboard">
          <Route element={<DashboardPage />} index />
        </Route>

        {/* Error */}
        {/* <Route element={<NotFoundPage />} path="*" /> */}
      </Routes>
    </>
  );
}
export default App;
