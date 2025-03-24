import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import FundasPredeterminadas from "./pages/FundasPredeterminadas";
import PredeterminadosID from "./components/PredeterminadosID";
import FundasPersonalizadas from "./pages/FundasPersonalizadas";
import PersonalizadosID from "./components/PersonalizadosID/PersonalizadosID";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <Layout>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predeterminadas" element={<FundasPredeterminadas />} />
        <Route path="/predeterminadas/:id" element={<PredeterminadosID />} />
        <Route path="/personalizadas" element={<FundasPersonalizadas />} />
        <Route path="/personalizadas/:id" element={<PersonalizadosID />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
