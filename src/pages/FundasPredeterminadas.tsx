import FundasPredeterminadasHeader from '../components/FundasPredeterminadasHeader'
import FundasPredeterminadasProductos from '../components/FundasPredeterminadasProductos'
import Marcas from '../components/Marcas'
import Pagos from '../components/Pagos'
import Scroll from '../components/Scroll'
import TextHorizontal from '../components/TextHorizontal'
import FormularioContacto from '../components/FormularioContacto'
const FundasPredeterminadas = () => {
    return (
        <div>
            <FundasPredeterminadasHeader />
            <FundasPredeterminadasProductos />
            <Marcas />
            <Pagos />
            <Scroll />
            <TextHorizontal />
            <FormularioContacto />
        </div>
    )
}

export default FundasPredeterminadas