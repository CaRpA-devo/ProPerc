import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router";
import { IndexPage } from "./components/pages/index.page.jsx";
import { DashboardPage } from "./components/pages/dashboard.page";

import NotFoundPage from "./components/pages/notfound.page";
import { SettingsPage } from "./components/pages/settings.page.jsx";
import { WikiPage } from "./components/pages/wiki.page.jsx";

function App() {
  return (
    <>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<IndexPage />} />

        {/* SignIn / SignOut */}
        {/* TODO brauchen wir nicht erst für regestrierung so ist das übern händler geregelt */}
        {/* <Route path="/signin/*" element={<SignInPage />} />
        <Route path="/signup/*" element={<SignUpPage />} /> */}

        {/* Dashboard */}
        <Route element={<DashboardPage />} path="/dashboard"></Route>

        {/* Settings */}
        <Route element={<SettingsPage />} path="/settings"></Route>

        {/* Wiki */}
        <Route element={<WikiPage />} path="/wiki"></Route>

        {/* 404-Route*/}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
export default App;
