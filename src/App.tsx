import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import FundasPredeterminadas from "@/pages/FundasPredeterminadas";
import PredeterminadosID from "@/components/PredeterminadosID";
import FundasPersonalizadas from "@/pages/FundasPersonalizadas";
import PersonalizadosID from "@/components/PersonalizadosID/PersonalizadosID";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import { ToastContainer } from "react-toastify";
import PagosPage from "@/pages/Pagos";
import MediosDePagosPage from "@/pages/MediosDePagos";
import PaymentSuccessPage from "@/pages/PaymentSuccess";
import PaymentErrorPage from "@/pages/PaymentError";
function App() {
  return (
    <Layout>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/predeterminadas' element={<FundasPredeterminadas />} />
        <Route path='/predeterminadas/:id' element={<PredeterminadosID />} />
        <Route path='/personalizadas' element={<FundasPersonalizadas />} />
        <Route path='/personalizadas/:id' element={<PersonalizadosID />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/pagos' element={<PagosPage />} />
        <Route path='/medios-pagos' element={<MediosDePagosPage />} />
        <Route path='/payments/success' element={<PaymentSuccessPage />} />
        <Route path='/payments/error' element={<PaymentErrorPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
