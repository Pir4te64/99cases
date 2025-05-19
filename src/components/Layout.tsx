import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import useAuthStore from "@/store/authStore";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const showCartSidebar = pathname !== "/pagos" && pathname !== "/medios-pagos";
  const getMe = useAuthStore((s) => s.getMe);

  useEffect(() => {
    getMe();
    window.scrollTo(0, 0);
  }, [getMe]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-black text-white">
      <Navbar />
      {showCartSidebar && <CartSidebar />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
