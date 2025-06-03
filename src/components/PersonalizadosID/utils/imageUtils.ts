import html2canvas from "html2canvas";
import { API } from "@/utils/Api";

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
                textContainer.style.height = '450px';
                textContainer.style.position = 'relative';
                textContainer.style.transform = 'none';
                textContainer.style.display = 'flex';
                textContainer.style.flexDirection = 'column';
                textContainer.style.alignItems = 'center';

                // Aplicar el mismo posicionamiento que en CaseTextoNumero
                if (isSpecialCase) {
                    textContainer.style.justifyContent = 'center';
                    textContainer.style.transform = 'translateY(16px)';
                } else {
                    textContainer.style.justifyContent = 'flex-end';
                    textContainer.style.paddingBottom = '2.5rem';
                    textContainer.style.marginTop = 'auto';
                    textContainer.style.minHeight = '100%';
                    textContainer.style.transform = 'translateY(-32px)'; // Mover más arriba en móvil
                }

                const spans = textContainer.querySelectorAll('span');
                if (spans.length > 1) {
                    // Ajustar el tamaño del número
                    (spans[0] as HTMLElement).style.marginTop = isSpecialCase ? '2.5rem' : '0';
                    (spans[0] as HTMLElement).style.fontSize = '6.5rem';
                    (spans[0] as HTMLElement).style.marginBottom = '.5rem';
                    (spans[0] as HTMLElement).style.lineHeight = '1';

                    // Ajustar el tamaño del nombre
                    (spans[1] as HTMLElement).style.fontSize = '3rem';
                    (spans[1] as HTMLElement).style.marginTop = '.5rem';
                    (spans[1] as HTMLElement).style.display = 'block';
                    (spans[1] as HTMLElement).style.textAlign = 'center';
                    (spans[1] as HTMLElement).style.marginLeft = '0';
                    (spans[1] as HTMLElement).style.marginRight = '0';
                    (spans[1] as HTMLElement).style.lineHeight = '1';
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