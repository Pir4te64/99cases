import html2canvas from "html2canvas";

/**
 * Convierte un elemento HTML a un Blob PNG usando html2canvas.
 * @param element - Elemento HTML a capturar
 * @param options - Opciones adicionales para html2canvas
 * @returns Promise<Blob>
 */
export const elementToPngBlob = async (
    element: HTMLElement,
    options: Partial<Parameters<typeof html2canvas>[1]> = {}
): Promise<Blob> => {
    const canvas = await html2canvas(element, options);
    return await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
        }, 'image/png', 1.0);
    });
}; 