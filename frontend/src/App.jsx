import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { BackendFoodProvider } from "./context/BackendFoodContext";
import { IndexPage } from "./components/pages/index.page.jsx";
import { DashboardPage } from "./components/pages/dashboard.page.jsx";
import { SetupGuard } from "./components/atoms/setup-guard.comp.jsx";
import { PageTransition } from "./components/atoms/page-transition.comp.jsx";

import NotFoundPage from "./components/pages/notfound.page.jsx";
import { SettingsPage } from "./components/pages/settings.page.jsx";
import { WikiPage } from "./components/pages/wiki.page.jsx";
import { SignInPage } from "./components/pages/signin.page.jsx";
import { SignUpPage } from "./components/pages/signup.page.jsx";
import { SetupPage } from "./components/pages/setup.page.jsx";
import FoodPage from "./components/pages/food.page.jsx";
import AddFoodApiPage from "./components/pages/add-food-api.page.jsx";
import AddFoodLocalPage from "./components/pages/add-food-local.page.jsx";

import AgbPage from "./components/pages/agb.page.jsx";
import AboutUsPage from "./components/pages/aboutus.page.jsx";
import PlanerPage from "./components/pages/planer.page.jsx";
import ProfilePage from "./components/pages/profile.page.jsx";
import SupportPage from "./components/pages/support.page.jsx";
import SupportConfirmationPage from "./components/pages/support-confirmation.page.jsx";
import ProfileSettingsPage from "./components/pages/profile-settings.page.jsx";
import NewsPage from "./components/pages/news.page.jsx";

function App() {
  return (
    <UserProvider>
      <BackendFoodProvider>
        <PageTransition>
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
            <Route
              element={<SignUpPage />}
              path="/signup/verify-email-address"
            />
            <Route element={<SignUpPage />} path="/signup/sso-callback" />
            <Route element={<SignUpPage />} path="/signup/continue" />
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
            {/* Add Food - API */}
            <Route
              element={
                <SetupGuard>
                  <AddFoodApiPage />
                </SetupGuard>
              }
              path="/add-food-api"
            />
            {/* Add Food - Local */}
            <Route
              element={
                <SetupGuard>
                  <AddFoodLocalPage />
                </SetupGuard>
              }
              path="/add-food-local"
            />

            {/* Wiki */}
            <Route element={<WikiPage />} path="/wiki" />
            {/* News */}
            <Route element={<NewsPage />} path="/news" />
            {/* Support */}
            <Route element={<SupportPage />} path="/support" />
            {/* Planer */}
            <Route element={<PlanerPage />} path="/planer" />
            {/* Profil */}
            <Route element={<ProfilePage />} path="/profile" />
            {/* Profil Einstellungen */}
            <Route
              element={
                <SetupGuard>
                  <ProfileSettingsPage />
                </SetupGuard>
              }
              path="/profile-settings"
            />
            {/* AGB */}
            <Route element={<AgbPage />} path="/agb" />
            {/* About Us */}
            <Route element={<AboutUsPage />} path="/aboutus" />
            {/* Onboarding */}
            <Route element={<SetupPage />} path="/onboarding" />
            {/* 404-Route*/}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>
      </BackendFoodProvider>
    </UserProvider>
  );
}
export default App;
