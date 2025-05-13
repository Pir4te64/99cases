// src/components/PersonalizadosID/CaseDesignerSimple.tsx
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";

interface Props {
  /** URL del SVG de la funda, con hueco transparente */
  frameUrl: string;
}

const CaseDesignerSimple: React.FC<Props> = ({ frameUrl }) => {
  // Foto y transform del store
  const photo = usePersonalizadoStore((s) => s.photo);
  const scale = usePersonalizadoStore((s) => s.scale);
  const rotation = usePersonalizadoStore((s) => s.rotation);
  const flipH = usePersonalizadoStore((s) => s.flipH);
  const flipV = usePersonalizadoStore((s) => s.flipV);

  // Cadena CSS de transformaciones
  const transform = [
    `scale(${scale})`,
    `rotate(${rotation}deg)`,
    flipH ? "scaleX(-1)" : "",
    flipV ? "scaleY(-1)" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="/* Ancho fijo igual al SVG */ Alto relative h-[500px] w-[300px] select-none overflow-hidden"
    >
      {/* FOTO DEL CLIENTE */}
      {photo && (
        <img
          src={photo}
          alt="Personalizada"
          className="absolute inset-0 z-0 h-full w-full object-cover"
          style={{
            transform,
            transformOrigin: "center center",
          }}
        />
      )}

      {/* MARCO SVG ENCIMA */}
      <img
        src={frameUrl}
        alt="Carcasa"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      />
    </div>
  );
};

export default CaseDesignerSimple;
