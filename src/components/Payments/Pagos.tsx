import creditIcon from "@/assets/Pagos/1.png";
import storeIcon from "@/assets/Pagos/2.svg";
import truckIcon from "@/assets/Pagos/elements.svg";

const Pagos: React.FC = () => {
    const items = [
        {
            icon: creditIcon,
            title: "FORMAS DE PAGO",
            description: "Tarjetas de crédito y débito. Transferencias o depósitos.",
        },
        {
            icon: storeIcon,
            title: "PUNTOS DE RETIRO GRATIS",
            description: "En nuestro local en Timbues, Santa Fe.",
        },
        {
            icon: truckIcon,
            title: "ENVÍO",
            description: "Despachamos los días sábados a todo el país por Andreani.",
        },
    ];

    return (
        <div className="bg-red-600 py-8 text-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center text-left">
                        <img src={item.icon} alt={item.title} className="mr-4 h-12 w-12" onContextMenu={(e) => e.preventDefault()} />
                        <div>
                            <h3 className="font-favoritMono text-lg font-bold uppercase">
                                {item.title}
                            </h3>
                            <p className="font-favoritMono text-sm">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pagos;
