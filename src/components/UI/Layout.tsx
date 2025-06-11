import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/UI/Footer";
import CartSidebar from "@/components/Sidebar/CartSidebar";
import useAuthStore from "@/store/authStore";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const showCartSidebar = pathname !== "/pagos" && pathname !== "/medios-pagos";
  const getMe = useAuthStore((s) => s.getMe);
  const [, setIsDevToolsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMe();
    window.scrollTo(0, 0);
  }, [getMe, pathname]);

  // Detectar DevTools
  useEffect(() => {
    const detectDevTools = () => {
       const threshold = 160;
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        setIsDevToolsOpen(true);
      } else {
        setIsDevToolsOpen(false);
      } 
    };

       window.addEventListener("resize", detectDevTools);
       detectDevTools();

       return () => window.removeEventListener("resize", detectDevTools);
    }, []);

  // Prevenir captura de pantalla
  useEffect(() => {
    const preventScreenshot = (e: KeyboardEvent) => {
      // Detectar Print Screen
      if (e.keyCode === 44) {
        e.preventDefault();
        Swal.fire({
          title: "Acción no permitida",
          text: "Las capturas de pantalla están deshabilitadas",
          icon: "warning",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#000",
          background: "#1a1a1a",
          color: "#fff",
        });
        return false;
      }

      // Detectar Ctrl+Shift+S (captura en algunos navegadores)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 83) {
        e.preventDefault();
        Swal.fire({
          title: "Acción no permitida",
          text: "Las capturas de pantalla están deshabilitadas",
          icon: "warning",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#000",
          background: "#1a1a1a",
          color: "#fff",
        });
        return false;
      }

      // Detectar F12 (DevTools)
      if (e.keyCode === 123) {
        e.preventDefault();
        Swal.fire({
          title: "Acción no permitida",
          text: "Las herramientas de desarrollador están deshabilitadas",
          icon: "warning",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#000",
          background: "#1a1a1a",
          color: "#fff",
        });
        return false;
      }

      // Detectar Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        Swal.fire({
          title: "Acción no permitida",
          text: "Las herramientas de desarrollador están deshabilitadas",
          icon: "warning",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#000",
          background: "#1a1a1a",
          color: "#fff",
        });
        return false;
      }

      // Detectar Ctrl+U (ver código fuente)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        Swal.fire({
          title: "Acción no permitida",
          text: "Ver código fuente está deshabilitado",
          icon: "warning",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#000",
          background: "#1a1a1a",
          color: "#fff",
        });
        return false;
      } 
    };

    const preventRightClick = (e: MouseEvent) => {
      e.preventDefault();
      Swal.fire({
        title: "Acción no permitida",
        text: "Clic derecho deshabilitado",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#000",
        background: "#1a1a1a",
        color: "#fff",
      }); 
      return false;
    };

    // Detectar cuando la ventana pierde el foco (posible captura)
    const handleBlur = () => {
      if (overlayRef.current) {
        overlayRef.current.style.display = "block";
      } 
    };

    const handleFocus = () => {
      if (overlayRef.current) {
        overlayRef.current.style.display = "none";
      } 
    };

    document.addEventListener("keydown", preventScreenshot);
    document.addEventListener("contextmenu", preventRightClick);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("keydown", preventScreenshot);
      document.removeEventListener("contextmenu", preventRightClick);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col overflow-hidden overflow-x-hidden bg-black text-white"
      style={{
        WebkitUserSelect: "none",
        userSelect: "none", 
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
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
      <div
        ref={overlayRef}
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          zIndex: 9999,
        }}
      />
      <Navbar />
      {showCartSidebar && <CartSidebar />}
      <main className="flex-1 pt-32">{children}</main>
      <Footer />
    </div>
  );
}
