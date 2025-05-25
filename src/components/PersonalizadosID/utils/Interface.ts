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
    };
    previewRef: React.RefObject<HTMLDivElement>;
}