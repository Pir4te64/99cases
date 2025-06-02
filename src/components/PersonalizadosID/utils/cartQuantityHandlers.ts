// Handlers reutilizables para incrementar y decrementar cantidad en el carrito

export const handleIncrement = (
    cartItem: any,
    product: any,
    updateItemQuantity: (id: string, quantity: number) => void,
    incrementSelectedQuantity: () => void
) => {
    if (cartItem) updateItemQuantity(product.id, cartItem.quantity + 1);
    else incrementSelectedQuantity();
};

export const handleDecrement = (
    cartItem: any,
    product: any,
    updateItemQuantity: (id: string, quantity: number) => void,
    decrementSelectedQuantity: () => void
) => {
    if (cartItem) {
        const newQty = Math.max(1, cartItem.quantity - 1);
        updateItemQuantity(product.id, newQty);
    } else {
        decrementSelectedQuantity();
    }
}; 