export interface PurchaseActionsProps {
    product: {
        id: string;
        title: string;
        imageSrc: string;
        imageFinal: string; // URL SVG con texto + número pre-renderizado
        price: number;
        tipo:
        | "PERSONALIZADO_CON_IMAGEN"
        | "PERSONALIZADO_CON_CARACTERES"
        | "PERSONALIZADO";
        description?: string;
    };
    previewRef: React.RefObject<HTMLDivElement>;
}