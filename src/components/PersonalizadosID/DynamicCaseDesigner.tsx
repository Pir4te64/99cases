/*******************************************************************
 * CaseDesignerSimple.tsx
 * 
 *  ❏  Muestra la carcasa (SVG con hueco transparente)
 *  ❏  Permite subir una foto y la recorta con clip-path (margen seguro)
 *  ❏  No modifica el SVG por código: todo el recorte está en el propio SVG
 *******************************************************************/
import { useState } from "react";

interface Props {
  /** URL (o ruta local) del SVG de la funda
   *  El SVG DEBE tener:
   *    • El hueco blanco con fill="none"
   *    • <clipPath id="clip_safe"> … </clipPath> (zona de impresión con margen)
   */
  frameUrl: string;
  /** ID del clipPath de margen seguro. Por defecto "clip_safe" */
  clipId?: string;
}

const CaseDesignerSimple: React.FC<Props> = ({ frameUrl, clipId = "clip_safe" }) => {
  const [photo, setPhoto] = useState<string | null>(null);

  /* ─────────── manejador subida de imagen ─────────── */
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <div className="relative w-[300px] select-none">
      {/* Input para que el cliente suba su foto */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="mb-2"
      />

      {/* ─────────── Capa 0: foto del cliente ─────────── */}
      {photo && (
        <img
          src={photo}
          alt="Foto personalizada"
          style={{
            clipPath: `url(#${clipId})`,
            WebkitClipPath: `url(#${clipId})`,
          }}
          className="
            absolute inset-0
            w-full h-full
            object-cover
            z-0
          "
        />
      )}

      {/* ─────────── Capa 1: carcasa (SVG con hueco transparente) ─────────── */}
      <img
        src={frameUrl}
        alt="Carcasa"
        className="relative w-full h-auto z-10 pointer-events-none"
      />
    </div>
  );
};

export default CaseDesignerSimple;
