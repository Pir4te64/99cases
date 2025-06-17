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
    <div className="flex flex-none items-start justify-center">
      <picture>
        <source media="(min-width: 1024px)" srcSet={imgVertical} />
        <img
          src={imgHorizontal}
          alt="Imagen del producto"
          className="max-h-full object-contain select-none pointer-events-none"
          onContextMenu={(e) => e.preventDefault()}
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          onSelectStart={(e) => e.preventDefault()}
        />
      </picture>
    </div>
  );
};

export default ProductImage;
