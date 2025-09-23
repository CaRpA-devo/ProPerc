import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router";
import { IndexPage } from "./components/pages/index.page.jsx";
import { DashboardPage } from "./components/pages/dashboard.page";
import { SignUpPage } from "./components/pages/signup.page.jsx";
import { SignInPage } from "./components/pages/signin.page.jsx";
import { ProjectProvider } from "./components/context/project.context.jsx";
import { DashboardLayout } from "./components/layouts/dashboard.layout.jsx";

// TODO Lazyloading implementieren

function App() {
  return (
    <>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<IndexPage />} />

        {/* SignIn / SignOut */}
        <Route element={<SignInPage />} path="/signin" />
        <Route element={<SignInPage />} path="/signin/factor-one" />
        <Route element={<SignInPage />} path="/signin/reset-password" />
        <Route element={<SignInPage />} path="/signin/reset-password-success" />
        <Route element={<SignInPage />} path="/signin/sso-callback" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<SignUpPage />} path="/signup/verify-email-address" />

        {/* Dashboard */}
        <Route
          element={
            <ProjectProvider>
              <DashboardLayout />
            </ProjectProvider>
          }
          path="/dashboard"
        >
          <Route element={<DashboardPage />} index />
          {/* <Route element={<DashboardSupportPage />} path="/dashboard/support" />
          <Route
            element={<DashboardProjectPage />}
            path="/dashboard/list/:id"
          /> */}
        </Route>
      </Routes>
    </>
  );
}
export default App;
