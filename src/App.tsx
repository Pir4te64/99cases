// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import FundasPredeterminadas from './pages/FundasPredeterminadas';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predeterminadas" element={<FundasPredeterminadas />} />
      </Routes>
    </Layout>
  );
}

export default App;
