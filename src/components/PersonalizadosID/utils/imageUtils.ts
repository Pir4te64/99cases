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

    const textCanvas = await html2canvas(target, {
        useCORS: true,
        backgroundColor: null,
        scale: 2,
        logging: false,
        allowTaint: true,
        onclone: (clonedDoc) => {
            const textContainer = clonedDoc.querySelector('#texto-numeros-container');
            if (textContainer) {
                const spans = textContainer.querySelectorAll('span');
                if (spans.length > 1) {
                    spans[0].style.marginBottom = '2.5rem';
                    spans[1].style.marginTop = '.5rem';
                    spans[1].style.fontSize = '3rem';
                    spans[1].style.display = 'block';
                    spans[1].style.textAlign = 'center';
                    spans[1].style.marginLeft = '0';
                    spans[1].style.marginRight = '0';
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