import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import FundasPredeterminadas from "./pages/FundasPredeterminadas";
import PredeterminadosID from "./components/PredeterminadosID";
import FundasPersonalizadas from "./pages/FundasPersonalizadas";
import PersonalizadosID from "./components/PersonalizadosID/PersonalizadosID";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predeterminadas" element={<FundasPredeterminadas />} />
        <Route path="/predeterminadas/:id" element={<PredeterminadosID />} />
        <Route path="/personalizadas" element={<FundasPersonalizadas />} />
        <Route path="/personalizadas/:id" element={<PersonalizadosID />} />
      </Routes>
    </Layout>
  );
}

export default App;
