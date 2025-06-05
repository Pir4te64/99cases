import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/UI/Footer";
import CartSidebar from "@/components/Sidebar/CartSidebar";
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const showCartSidebar = pathname !== "/pagos" && pathname !== "/medios-pagos";
  const getMe = useAuthStore((s) => s.getMe);
  const [isPrintScreenPressed, setIsPrintScreenPressed] = useState(false);

  useEffect(() => {
    getMe();
    window.scrollTo(0, 0);
  }, [getMe, pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Detecta Print Screen (código 44) o Alt + Print Screen
      if (e.key === "PrintScreen" || (e.altKey && e.key === "PrintScreen")) {
        setIsPrintScreenPressed(true);
        // Prevenir el comportamiento por defecto
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        setIsPrintScreenPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col overflow-x-hidden bg-black text-white"
      style={{
        WebkitUserSelect: "none",
        userSelect: "none",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
        WebkitFilter: isPrintScreenPressed ? "brightness(0)" : "invert(0)",
        filter: isPrintScreenPressed ? "brightness(0)" : "invert(0)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
        WebkitPerspective: "1000",
        perspective: "1000",
        WebkitTransformStyle: "preserve-3d",
        transformStyle: "preserve-3d",
        transition: "filter 0.1s ease-in-out",
      }}
    >
      <Navbar />
      {showCartSidebar && <CartSidebar />}
      <main className="flex-1 pt-32">{children}</main>
      <Footer />
    </div>
  );
}
