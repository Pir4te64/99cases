import html2canvas from "html2canvas";
import { API } from "@/utils/Api";
import { orden } from "@/utils/orden";

export const mergeImagesWithBackend = async (
  caseId: string,
  calcoFile: Blob
) => {
  try {
    const formData = new FormData();
    formData.append("caseId", caseId);
    formData.append("calcoFile", calcoFile, "letras-numeros.png");

    const token = localStorage.getItem("token");
    const response = await fetch(API.mergeImages, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // Intentar obtener el texto de la respuesta primero
    const responseText = await response.text();
    //console.log('Respuesta del servidor (texto):', responseText);

    // Intentar parsear como JSON solo si parece ser JSON válido
    try {
      const data = JSON.parse(responseText);
      console.log("Respuesta del servidor (JSON):", data);
      return data;
    } catch (e) {
      // Si no es JSON, devolver el texto de la respuesta
      return responseText;
    }
  } catch (error) {
    console.error("Error al enviar imágenes al servidor:", error);
    throw error;
  }
};

/** Genera un Blob PNG transparente solo del área de letras y números */
export const generateCalcoBlob = async (
  previewRef: React.RefObject<HTMLElement>
) => {
  if (!previewRef.current) throw new Error("Vista previa no disponible");
  const target = previewRef.current.querySelector(
    "#texto-numeros-container"
  ) as HTMLElement | null;
  if (!target)
    throw new Error(
      "No se encontró el área de letras y números para descargar"
    );

  // Obtener el título del producto para determinar el posicionamiento
  const productTitle = previewRef.current
    .closest("[data-product-title]")
    ?.getAttribute("data-product-title");
  const isSpecialCase =
    productTitle === "FUNDA 99% CASES - SUZUKI" ||
    productTitle === "FUNDA 99% CASES - FOX 2" ||
    productTitle === "FUNDA 99% CASES - FASTHOUSE";
  // Calcular el scale basado en el dispositivo
  const devicePixelRatio = window.devicePixelRatio || 2;
  const scale = Math.max(devicePixelRatio, 3); // Aseguramos un mínimo de 3x para mejor calidad

  const textCanvas = await html2canvas(target, {
    useCORS: true,
    backgroundColor: null,
    scale: scale,
    logging: false,
    allowTaint: true,
    onclone: (clonedDoc) => {
      const textContainer = clonedDoc.querySelector(
        "#texto-numeros-container"
      ) as HTMLElement;
      if (textContainer) {
        // Ajustar el tamaño del contenedor para asegurar que el texto se capture correctamente
        textContainer.style.width = "100%";
        textContainer.style.height = "470px";
        textContainer.style.position = "relative";
        textContainer.style.transform = "none";
        textContainer.style.display = "flex";
        textContainer.style.flexDirection = "column";
        textContainer.style.alignItems = "center";

        // Aplicar el mismo posicionamiento que en CaseTextoNumero
        const productOrder =
          orden.find((item) => item.title === productTitle)?.orden ||
          "NUMERO - TEXTO";
        if (isSpecialCase) {
          const spans = textContainer.querySelectorAll("span");
          if (spans.length > 1) {
            // Configuración del contenedor para centrado
            textContainer.style.position = "relative";
            textContainer.style.display = "flex";
            textContainer.style.flexDirection = "column";
            textContainer.style.alignItems = "center";
            textContainer.style.justifyContent = "center";
            textContainer.style.height = "100%";
            textContainer.style.paddingTop = "50px";
            textContainer.style.gap = "0";

            // Configuración común para todos los spans en casos especiales
            spans.forEach((span, index) => {
              const element = span as HTMLElement;

              // Limpiamos clases que puedan interferir
              element.className = element.className
                .split(" ")
                .filter(
                  (c) =>
                    !c.includes("mt-") &&
                    !c.includes("transform-") &&
                    !c.includes("text-") &&
                    !c.includes("position-") &&
                    !c.includes("margin-")
                )
                .join(" ");

              // Estilos base para todos los spans
              element.style.setProperty("position", "relative", "important");
              element.style.setProperty("text-align", "center", "important");
              element.style.setProperty("width", "100%", "important");
              // Ajustes específicos según si es texto o número
              if (index === 0) {
                // Texto
                element.style.setProperty("font-size", "22px", "important");
                element.style.setProperty(
                  "transform",
                  "translateY(30px)",
                  "important"
                );
              } else {
                // Número
                element.style.setProperty("font-size", "125px", "important");
                element.style.setProperty(
                  "transform",
                  "translateY(0)",
                  "important"
                );
              }
            });
          }
        } else {
          // Ajustar tamaños según el orden
          const spans = textContainer.querySelectorAll("span");
          if (spans.length > 1) {
            if (productOrder === "TEXTO - NUMERO") {
              (spans[0] as HTMLElement).classList.remove(
                "text-[3.5rem]",
                "sm:text-[5rem]",
                "md:text-[7.5rem]",
                "text-[4rem]",
                "sm:text-[5rem]",
                "md:text-[7.5rem]"
              );
              (spans[0] as HTMLElement).style.transform = "translateY(30px)";
              (spans[0] as HTMLElement).style.fontSize = "20px";
              (spans[0] as HTMLElement).style.margin = "0";
              (spans[0] as HTMLElement).style.padding = "0";
              (spans[0] as HTMLElement).style.paddingBottom = "0px";
              (spans[1] as HTMLElement).style.fontSize = "120px";
              (spans[1] as HTMLElement).style.margin = "0";
              (spans[1] as HTMLElement).style.padding = "0";
              textContainer.style.paddingBottom = "80px";
              textContainer.style.gap = "0"; // Eliminar gap del contenedor flex
            } else {
              // NUMERO - TEXTO: número un poco más chico
              (spans[0] as HTMLElement).classList.remove(
                "text-[3.5rem]",
                "sm:text-[5rem]",
                "md:text-[7.5rem]",
                "text-[4rem]",
                "sm:text-[5rem]",
                "md:text-[7.5rem]"
              );
              (spans[0] as HTMLElement).style.fontSize = "120px";
              (spans[0] as HTMLElement).style.margin = "0";
              (spans[0] as HTMLElement).style.padding = "0";
              (spans[0] as HTMLElement).style.paddingBottom = "15px";
              (spans[1] as HTMLElement).style.fontSize = "25px";
              (spans[1] as HTMLElement).style.margin = "0";
              (spans[1] as HTMLElement).style.marginTop = "20px";
              (spans[1] as HTMLElement).style.padding = "0";
              textContainer.style.paddingBottom = "60px";
              textContainer.style.gap = "0";
            }
          }
        }
      }
    },
  });

  return await new Promise<Blob>((resolve) => {
    textCanvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
      },
      "image/png",
      1.0
    );
  });
};
