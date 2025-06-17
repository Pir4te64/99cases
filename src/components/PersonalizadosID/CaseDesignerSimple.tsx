// src/components/PersonalizadosID/CaseDesignerSimple.tsx
import { useState, useEffect } from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";

interface Props {
  /** URL del SVG de la funda, con hueco transparente */
  frameUrl: string;
}

const CaseTuFoto: React.FC<Props> = ({ frameUrl }) => {
  const [svgContent, setSvgContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const photo = usePersonalizadoStore((s) => s.photo);
  const scale = usePersonalizadoStore((s) => s.scale);
  const rotation = usePersonalizadoStore((s) => s.rotation);
  const flipH = usePersonalizadoStore((s) => s.flipH);
  const flipV = usePersonalizadoStore((s) => s.flipV);

  // Descargar y procesar el SVG
  useEffect(() => {
    const fetchSvg = async () => {
      try {
        setLoading(true);
        const response = await fetch(frameUrl);
        let svgText = await response.text();

        // Si hay una foto, modificar el SVG para incluir la imagen
        if (photo) {
          // Crear un pattern con la imagen del usuario
          const patternDef = `
            <defs>
              <pattern id="userImagePattern" patternUnits="objectBoundingBox" width="1" height="1">
                <image 
                  href="${photo}" 
                  width="490.45" 
                  height="927.09" 
                  preserveAspectRatio="xMidYMid slice"
                  style="transform: scale(${scale}) rotate(${rotation}deg) ${flipH ? 'scaleX(-1)' : ''} ${flipV ? 'scaleY(-1)' : ''}; transform-origin: center center;"
                />
              </pattern>
            </defs>`;

          // Insertar el pattern después de la etiqueta <svg> o dentro de <defs> existente
          if (svgText.includes('<defs>')) {
            svgText = svgText.replace('<defs>', `<defs>${patternDef.replace('<defs>', '').replace('</defs>', '')}`);
          } else {
            svgText = svgText.replace(/(<svg[^>]*>)/, `$1${patternDef}`);
          }

          // Modificar la clase cls-1 para usar el pattern como fill
          svgText = svgText.replace(
            /\.cls-1\s*\{\s*fill:\s*[^;]+;/g,
            '.cls-1{fill:url(#userImagePattern);'
          );
        }

        setSvgContent(svgText);
      } catch (error) {
        console.error("Error al descargar el SVG:", error);
        setSvgContent("");
      } finally {
        setLoading(false);
      }
    };

    if (frameUrl) {
      fetchSvg();
    }
  }, [frameUrl, photo, scale, rotation, flipH, flipV]);

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
    <div className="relative mx-auto h-[400px] w-full select-none overflow-hidden md:mt-0 md:h-[600px] md:w-[305px]">
      {/* MARCO SVG CON IMAGEN INTEGRADA */}
      {loading ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
          <div className="text-gray-500">Cargando...</div>
        </div>
      ) : svgContent ? (
        <div
          className="pointer-events-none absolute inset-0 z-10 h-full w-full"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        // Fallback: mostrar imagen y SVG por separado
        <>
          {photo && (
            <img
              src={photo}
              alt="Personalizada"
              onContextMenu={(e) => e.preventDefault()}
              className="absolute inset-0 z-0 h-full w-full object-cover select-none pointer-events-none"
              style={{
                transform,
                transformOrigin: "center center",
              }}
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
              onDrop={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
            />
          )}
          <img
            src={frameUrl}
            alt="Carcasa"
            onContextMenu={(e) => e.preventDefault()}
            className="pointer-events-none absolute inset-0 z-10 h-full w-full select-none"
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
          />
        </>
      )}
    </div>
  );
};

export default CaseTuFoto;
