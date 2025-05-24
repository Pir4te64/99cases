import creditIcon from "@/assets/Pagos/uno.svg";
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
        <div className="bg-red-600 py-6 text-white md:py-8">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-3 md:gap-8">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center text-left">
                        <img
                            src={item.icon}
                            alt={item.title}
                            className="mr-3 h-8 w-8 md:mr-4 md:h-12 md:w-12"
                            onContextMenu={(e) => e.preventDefault()}
                        />
                        <div>
                            <h3 className="font-favoritExpanded text-sm font-bold uppercase md:text-lg">
                                {item.title}
                            </h3>
                            <p className="font-favoritExpanded text-xs md:text-sm">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pagos;
