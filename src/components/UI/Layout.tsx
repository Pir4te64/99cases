import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/UI/Footer";
import CartSidebar from "@/components/Sidebar/CartSidebar";
import useAuthStore from "@/store/authStore";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const showCartSidebar = pathname !== "/pagos" && pathname !== "/medios-pagos";
  const getMe = useAuthStore((s) => s.getMe);

  useEffect(() => {
    getMe();
    window.scrollTo(0, 0);
  }, [getMe, pathname]);

  return (
    <div
      className="flex min-h-screen flex-col overflow-x-hidden bg-black text-white"
      style={{
        WebkitUserSelect: "none",
        userSelect: "none",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
        WebkitFilter: "invert(0)",
        filter: "invert(0)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
        WebkitPerspective: "1000",
        perspective: "1000",
        WebkitTransformStyle: "preserve-3d",
        transformStyle: "preserve-3d",
      }}
    >
      <Navbar />
      {showCartSidebar && <CartSidebar />}
      <main className="flex-1 pt-32">{children}</main>
      <Footer />
    </div>
  );
}
