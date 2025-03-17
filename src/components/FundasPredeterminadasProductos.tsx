import { products } from './Fundas/fundasGet'
import ProductCard from './Fundas/Producto'

const FundasPredeterminadasProductos = () => {
  console.log(products);
  return (
    <div className='bg-white justify-center items-center flex flex-col'>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-favorit uppercase font-bold text-white text-center my-4">
        Productos Destacados
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
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
  )
}

export default FundasPredeterminadasProductos
