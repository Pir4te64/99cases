import { useEffect, useRef, useState, RefObject } from "react";

interface InViewOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

function useInViewMobile(options?: InViewOptions): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIntersecting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Si el ancho de la ventana es menor a 768px, consideramos mobile.
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      options
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, options, isMobile]);

  // En desktop (isMobile === false) devolvemos false para que la lógica de hover se encargue.
  return [ref, isMobile ? isIntersecting : false];
}

export default useInViewMobile;
