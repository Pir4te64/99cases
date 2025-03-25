import { productsPersonalizadas } from "../Fundas/FundasPersonalizadas/FundasPersonalizadasGET";
import ProductCardPersonalizadas from "../Fundas/FundasPersonalizadas/ProductosPersonalizados";

const FundasPersonalizadasProductos = () => {
  return (
    <div className=" mx-auto w-full flex flex-col items-center justify-center bg-white">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {productsPersonalizadas.map((product) => (
          <ProductCardPersonalizadas
            key={product.id}
            id={product.id.toString()}
            discount={product.discount}
            imageSrc={product.imageSrc}
            title={product.title}
            price={product.price}
            oldPrice={product.oldPrice}
            cantidadesVendidos={product.cantidadesVendidos}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FundasPersonalizadasProductos;
