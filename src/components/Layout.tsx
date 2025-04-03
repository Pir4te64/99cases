import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartSidebar from "./CartSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const showCartSidebar = pathname !== "/pagos" && pathname !== "/medios-pagos";

  return (
    <div className='min-h-screen flex flex-col bg-black text-white'>
      <Navbar />
      {showCartSidebar && <CartSidebar />}
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
