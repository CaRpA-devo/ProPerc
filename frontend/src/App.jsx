import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { FoodProvider } from "./context/FoodContext";
import { IndexPage } from "./components/pages/index.page.jsx";
import { DashboardPage } from "./components/pages/dashboard.page.jsx";
import { SetupGuard } from "./components/atoms/setup-guard.comp.jsx";

import NotFoundPage from "./components/pages/notfound.page.jsx";
import { SettingsPage } from "./components/pages/settings.page.jsx";
import { WikiPage } from "./components/pages/wiki.page.jsx";
import { SignInPage } from "./components/pages/signin.page.jsx";
import { SignUpPage } from "./components/pages/signup.page.jsx";
import { SetupPage } from "./components/pages/setup.page.jsx";
import FoodPage from "./components/pages/food.page.jsx";

function App() {
  return (
    <UserProvider>
      <FoodProvider>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<IndexPage />} />

          <Route element={<SignInPage />} path="/signin" />
          <Route element={<SignInPage />} path="/signin/factor-one" />
          <Route element={<SignInPage />} path="/signin/reset-password" />
          <Route
            element={<SignInPage />}
            path="/signin/reset-password-success"
          />
          <Route element={<SignInPage />} path="/signin/sso-callback" />
          <Route element={<SignUpPage />} path="/signup" />
          <Route element={<SignUpPage />} path="/signup/verify-email-address" />
          {/* Dashboard - nur für Benutzer mit abgeschlossenem Setup */}
          <Route
            element={
              <SetupGuard>
                <DashboardPage />
              </SetupGuard>
            }
            path="/dashboard"
          />
          {/* Settings - geschützte Route */}
          <Route
            element={
              <SetupGuard>
                <SettingsPage />
              </SetupGuard>
            }
            path="/settings"
          />
          {/* Setup */}
          <Route element={<SetupPage />} path="/setup" />
          {/* Food Tracking */}
          <Route
            element={
              <SetupGuard>
                <FoodPage />
              </SetupGuard>
            }
            path="/food"
          />
          {/* Wiki */}
          <Route element={<WikiPage />} path="/wiki" />
          {/* Onboarding */}
          <Route element={<SetupPage />} path="/onboarding" />
          {/* 404-Route*/}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </FoodProvider>
    </UserProvider>
  );
}
export default App;
