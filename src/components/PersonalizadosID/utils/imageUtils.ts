import html2canvas from "html2canvas";
import { API } from "@/utils/Api";
import { orden } from "@/utils/orden";

export const mergeImagesWithBackend = async (caseId: string, calcoFile: Blob) => {
    try {
        const formData = new FormData();
        formData.append('caseId', caseId);
        formData.append('calcoFile', calcoFile, 'letras-numeros.png');

        const token = localStorage.getItem('token');
        const response = await fetch(API.mergeImages, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
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
            console.log('Respuesta del servidor (JSON):', data);
            return data;
        } catch (e) {
            // Si no es JSON, devolver el texto de la respuesta
            return responseText;
        }
    } catch (error) {
        console.error('Error al enviar imágenes al servidor:', error);
        throw error;
    }
};

/** Genera un Blob PNG transparente solo del área de letras y números */
export const generateCalcoBlob = async (previewRef: React.RefObject<HTMLElement>) => {
    if (!previewRef.current) throw new Error("Vista previa no disponible");
    const target = previewRef.current.querySelector('#texto-numeros-container') as HTMLElement | null;
    if (!target) throw new Error("No se encontró el área de letras y números para descargar");

    // Obtener el título del producto para determinar el posicionamiento
    const productTitle = previewRef.current.closest('[data-product-title]')?.getAttribute('data-product-title');
    const isSpecialCase = productTitle === "FUNDA 99% CASES - SUZUKI" ||
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
            const textContainer = clonedDoc.querySelector('#texto-numeros-container') as HTMLElement;
            if (textContainer) {
                // Ajustar el tamaño del contenedor para asegurar que el texto se capture correctamente
                textContainer.style.width = '100%';
                textContainer.style.height = '470px';
                textContainer.style.position = 'relative';
                textContainer.style.transform = 'none';
                textContainer.style.display = 'flex';
                textContainer.style.flexDirection = 'column';
                textContainer.style.alignItems = 'center';

                // Aplicar el mismo posicionamiento que en CaseTextoNumero
                const productOrder = orden.find(item => item.title === productTitle)?.orden || "NUMERO - TEXTO";
                if (isSpecialCase) {
                    textContainer.style.transform = 'translateY(80px)'; // Mover más arriba del borde inferior
                    console.log(productOrder);
                    if (productOrder === "TEXTO - NUMERO") {
                        console.log(productOrder === "TEXTO - NUMERO");
                        const spans = textContainer.querySelectorAll('span');
                        if (spans.length > 1) {
                            // Identificar qué span es el texto y cuál es el número
                            spans.forEach((span, index) => {
                                console.log(`Span ${index}:`, span.textContent);
                            });

                            // El primer span es el texto en TEXTO - NUMERO
                            const textSpan = spans[0] as HTMLElement;
                            console.log("Modificando span de texto:", textSpan.textContent);

                            const updateFontSize = () => {
                                console.log("Ancho actual:", window.innerWidth);
                                if (window.innerWidth >= 1024) {
                                    console.log("1024 o más");
                                    textSpan.style.fontSize = '100px'; // Exagerado para desktop
                                } else if (window.innerWidth >= 768) {
                                    console.log("768 o más");
                                    textSpan.style.fontSize = '80px'; // Exagerado para tablet
                                } else {
                                    console.log("Menos de 768");
                                    textSpan.style.fontSize = '60px'; // Exagerado para móvil
                                }
                            };

                            // Ejecutar inmediatamente
                            updateFontSize();

                            // Agregar listener de resize
                            window.addEventListener('resize', updateFontSize);

                            // Remover listener después de 1 segundo para evitar memory leaks
                            setTimeout(() => {
                                window.removeEventListener('resize', updateFontSize);
                            }, 1000);
                        }
                    }
                } else {
                    textContainer.style.justifyContent = 'flex-end';
                    textContainer.style.paddingBottom = '2.5rem';
                    textContainer.style.marginTop = '10px';
                    textContainer.style.transform = 'translateY(-32px)'; // Mover más arriba en móvil
                }
                // Ajustar tamaños según el orden
                const spans = textContainer.querySelectorAll('span');
                if (spans.length > 1) {
                    if (productOrder === "TEXTO - NUMERO") {
                        (spans[0] as HTMLElement).style.fontSize = '2.5rem';
                        (spans[1] as HTMLElement).style.fontSize = '6.5rem';
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
                        (spans[0] as HTMLElement).style.fontSize = '6.5rem';
                        (spans[0] as HTMLElement).style.lineHeight = '1.5';
                        (spans[0] as HTMLElement).style.marginTop = '5rem';
                        (spans[1] as HTMLElement).style.fontSize = '2.5rem';
                        (spans[1] as HTMLElement).style.lineHeight = '1';
                    }
                }
            }
        }
    });

    return await new Promise<Blob>((resolve) => {
        textCanvas.toBlob((blob) => {
            if (blob) resolve(blob);
        }, 'image/png', 1.0);
    });
}; 