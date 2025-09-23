import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router";
import { IndexPage } from "./components/pages/index.page.jsx";
import { DashboardPage } from "./components/pages/dashboard.page";
import { SignUpPage } from "./components/pages/signup.page.jsx";
import { SignInPage } from "./components/molecules/signin.page.jsx";
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
        {/* TODO noch anpassen das es im Layout rendert */}
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<SignUpPage />} path="/signup/verify-email-address" />
        {/* Dashboard */}
        <Route element={<DashboardPage />} path="/dashboard">
          {/* <Route element={<DashboardPage />} index /> */}
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
