import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import FundasPredeterminadas from "./pages/FundasPredeterminadas";
import PredeterminadosID from "./components/PredeterminadosID";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predeterminadas" element={<FundasPredeterminadas />} />
        <Route path="/predeterminadas/:id" element={<PredeterminadosID />} />
      </Routes>
    </Layout>
  );
}

export default App;
