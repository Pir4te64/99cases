export interface PurchaseActionsProps {
    product: {
        id: string;
        title: string;
        imageSrc: string;
        imageFinal: string;
        price: number;
        tipo: "PERSONALIZADO_CON_IMAGEN" | "PERSONALIZADO_CON_CARACTERES" | "PERSONALIZADO";
        description?: string;
        oldPrice?: number;
        descuento?: number;
        predeterminado?: boolean;
        precioDescuento?: number;
    };
    previewRef: React.RefObject<HTMLDivElement>;
}