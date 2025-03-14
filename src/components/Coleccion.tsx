import fundaPersonalizada from "../assets/fundasPersonalizadas.jpg";
import fundaPredeterminada from "../assets/fundasPredeterminadas.jpg";
import useInViewMobile from "../utils/useInViewMobile";

const Coleccion = () => {
    const [ref1, isMobileVisible1] = useInViewMobile({ threshold: 0.5 });
    const [ref2, isMobileVisible2] = useInViewMobile({ threshold: 0.5 });

    return (
        <div className="bg-black py-8 text-white">
            <div className="w-full px-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tarjeta 1 */}
                <div ref={ref1} className="relative group overflow-hidden">
                    <img
                        src={fundaPredeterminada}
                        alt="Funda Predeterminada"
                        className="w-full object-cover"
                    />
                    {/* Overlay limitado a la zona inferior */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 z-0 ${isMobileVisible1 ? "opacity-100" : "opacity-0"
                            } md:group-hover:opacity-100`}
                    ></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-center z-10">
                        <h2 className="text-5xl md:text-9xl font-dharmaGothic uppercase">
                            Fundas Predeterminadas
                        </h2>
                        <p className="text-sm md:text-lg font-favoritMono uppercase mt-2">
                            Ver Colección
                        </p>
                    </div>
                </div>

                {/* Tarjeta 2 */}
                <div ref={ref2} className="relative group overflow-hidden">
                    <img
                        src={fundaPersonalizada}
                        alt="Funda Personalizada"
                        className="w-full object-cover"
                    />
                    {/* Overlay limitado a la zona inferior */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 z-0 ${isMobileVisible2 ? "opacity-100" : "opacity-0"
                            } md:group-hover:opacity-100`}
                    ></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-center z-10">
                        <h2 className="text-5xl md:text-9xl font-dharmaGothic uppercase">
                            Fundas Personalizadas
                        </h2>
                        <p className="text-sm md:text-lg font-favoritMono uppercase mt-2">
                            Ver Colección
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Coleccion;
