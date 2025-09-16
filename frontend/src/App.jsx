import "./App.css";
import { Route, Routes } from "react-router";
import { IndexPage } from "./components/pages/index.page.jsx";
import { DashboardPage } from './components/pages/dasboard.page';



function App() {
  return (
    <>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<IndexPage />} />
        <Route path="/dash" element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default App;
