import React from "react";
import creditIcon from "../assets/Pagos/1.png";
import storeIcon from "../assets/Pagos/2.svg";
import truckIcon from "../assets/Pagos/3.png";

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
        <div className="bg-red-600 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center text-left">
                        <img src={item.icon} alt={item.title} className="w-12 h-12 mr-4" />
                        <div>
                            <h3 className="font-bold text-lg uppercase font-favoritMono">
                                {item.title}
                            </h3>
                            <p className="text-sm font-favoritMono">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pagos;
