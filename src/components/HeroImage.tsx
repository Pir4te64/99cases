import React from 'react';

const HeroImage = () => {
    return (
        <div className="bg-black h-[500px] text-white text-center items-center flex flex-col justify-center py-8">
            <h1 className="text-6xl md:text-9xl font-extrabold m-0 font-dharmaGothic">
                ¡BIENVENIDOS A NUESTRA TIENDA ONLINE!
            </h1>
            <p className="text-xl md:text-2xl mt-4 mx-2 tracking-wide font-favoritMono">
                ENCUENTRA EL DISEÑO PERFECTO PARA TU ESTILO
            </p>
        </div>
    );
};

export default HeroImage;
