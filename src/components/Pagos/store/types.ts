export interface DeliveryOption {
    modoDeEntrega: string;
    modoDeEntregaId: string;
    tarifaConIva: number;
    tarifaSinIva: number;
    iva: number;
    contratoId: string;
}

export interface DeliveryResponse {
    id: number;
    deliveryId: number;
    destino: string;
    datosDeContacto: string;
    costoOrden: number;
    deliveryOptions: DeliveryOption[];
    numeroOrden?: string;
}

export interface DeliveryOption {
    modoDeEntrega: string;
    modoDeEntregaId: string;
    tarifaConIva: number;
    tarifaSinIva: number;
    iva: number;
    contratoId: string;
}

export interface DeliveryResponse {
    id: number;
    destino: string;
    datosDeContacto: string;
    costoOrden: number;
    deliveryOptions: DeliveryOption[];
    numeroOrden?: string;
}

export interface Props {
    deliveryResponse: DeliveryResponse;
    selectedOption: string;
    onSelectOption: (modo: string) => void;
}
