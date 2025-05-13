import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";

const ProductImage = ({
  imgHorizontal,
  imgVertical,
}: {
  imgHorizontal: string;
  imgVertical: string;
}) => {
  // Obtenemos windowWidth desde el store
  const windowWidth = usePersonalizadoStore((state: any) => state.windowWidth);

  return (
    <div className="flex-none flex items-center justify-center">
      <img
        src={windowWidth < 1024 ? imgHorizontal : imgVertical}
        alt="Imagen del producto"
        className="max-h-full object-contain"
      />
    </div>
  );
};

export default ProductImage;
