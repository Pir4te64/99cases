// src/components/PersonalizadosID/CaseDesignerSimple.tsx
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";

interface Props {
  /** URL (o ruta local) del SVG de la funda, con hueco transparente y <clipPath id="clip_safe"> */
  frameUrl: string;
  /** ID del clipPath en el SVG (por defecto "clip_safe") */
  clipId?: string;
}

const CaseDesignerSimple: React.FC<Props> = ({ frameUrl, clipId = "clip_safe" }) => {
  const photo = usePersonalizadoStore((s) => s.photo);
  const scale = usePersonalizadoStore((s) => s.scale);
  const rotation = usePersonalizadoStore((s) => s.rotation);
  const flipH = usePersonalizadoStore((s) => s.flipH);
  const flipV = usePersonalizadoStore((s) => s.flipV);

  // Construye la cadena CSS de transformaciones
  const transform = [
    `scale(${scale})`,
    `rotate(${rotation}deg)`,
    flipH ? "scaleX(-1)" : "",
    flipV ? "scaleY(-1)" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="relative w-[300px] select-none">
      {/* Foto del cliente con transform */}
      {photo && (
        <img
          src={photo}
          alt="Personalizada"
          style={{
            transform,
            clipPath: `url(#${clipId})`,
            WebkitClipPath: `url(#${clipId})`,
          }}
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
      )}

      {/* Marco SVG encima */}
      <img
        src={frameUrl}
        alt="Carcasa"
        className="pointer-events-none relative z-10 h-auto w-full"
      />
    </div>
  );
};

export default CaseDesignerSimple;
