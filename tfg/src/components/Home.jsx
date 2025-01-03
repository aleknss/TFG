import React from 'react'
import Ap1Stock from '../assets/images/ap1stock.png'
import Ap2Stock from '../assets/images/ap2stock.png'

function Home() {
  return (
    <div>
        <div className='apartado1 my-12'>
            <h1>Bienvenido a Vio</h1>
            <div className=''>
                <p className='my-6'>Transformamos la gestión de inventario de su negocio con nuestra solución de seguimiento en tiempo real, permitiéndole tener control total y visibilidad inmediata de sus productos en todo momento.</p>
                <p className='my-6'>Con nuestra tecnología, podrá predecir la demanda con mayor precisión, reducir costos operativos, evitar pérdidas por exceso o falta de stock, y lo más importante: mejorar significativamente la satisfacción de sus clientes al garantizar la disponibilidad de productos cuando los necesitan.</p>
                <img className='w-full' src={Ap2Stock} />
            </div>
        </div>

        <div className='apartado2 my-12'>
            <h1>¿A quién vamos dirigidos?</h1>
            <div className='my-6 flex items-center'>
                <div className='w-1/2'>
                    <ul>
                        <li><p>Comercio</p></li>
                        <li><p>Industria</p></li>
                        <li><p>Bodegas</p></li>
                        <li><p>Distribuidores</p></li>
                        <li><p>Restaurantes</p></li>
                        <li><p>Supermercados</p></li>
                        <li><p>Casas</p></li>
                    </ul>
                </div>
                <img className='w-1/2' src={Ap1Stock} />
            </div>
        </div>
    </div>
  )
}

export default Home