import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ChartPage } from "./pages/ChartPage";
import { CalcPage } from "./pages/CalcPage";
import { Layout } from "./components/Layout";
import { ErrorPage } from "./pages/ErrorPage";

function App() {
  return (
    <BrowserRouter basename={"/NNtask"}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Navigate replace to="/tabela" />} index />
          <Route path="/tabela" element={<HomePage />} />
          <Route path="/tabela/wykres/:currency" element={<ChartPage />} />
          <Route path="/zamien" element={<CalcPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
