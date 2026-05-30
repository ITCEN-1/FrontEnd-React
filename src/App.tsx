import { BrowserRouter } from "react-router-dom";
import "./App.css";
import DashBoardPage from "./pages/DashBoardPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header.tsx";
import SurveyWizard from "./components/common/survey/SurveyWizard.tsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SurveyWizard />}></Route>
        <Route path="/dashboard" element={<DashBoardPage />}></Route>
        <Route path="/history" element={<HistoryPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
