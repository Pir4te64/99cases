// ProductImage.jsx

const ProductImage = ({
  windowWidth,
  imgHorizontal,
  imgVertical,
}: {
  windowWidth: number;
  imgHorizontal: string;
  imgVertical: string;
}) => {
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
