import React from 'react'
import productosUtil from '../util/productosUtil';

const Productos = () => {

    const { productosDetalle } = productosUtil();

    return (
        <>
            <h3 className='titulo-form mb-3'>Producto Idelpan:</h3>
            <div className="row">
                {
                    Object.entries(productosDetalle).map(([key, producto]) => {
                        return (
                            <>
                                <div className="col-6 col-sm-6 col-md-4 col-lg-4" >
                                    <div className='div-card-padre'>
                                        <div className='div-card-img mb-4'>
                                            <img className='card-img' src={producto.urlImage} alt=''></img>
                                            <div className='div-card-info'>
                                                <p className='card-info-nombre'>{producto.nombre}</p>
                                                <p className='card-info-txt'>{producto.PxC} Paquetes x Canasta</p>
                                                <div className='div-card-info-txt'>
                                                    <p className='card-info-txt'>Valor Paquete</p>
                                                    <p className='card-info-txt-2'>${producto.valorPaquete} </p>
                                                </div>
                                                <div className='div-card-info-txt'>
                                                    <p className='card-info-txt'>Valor Canasta</p>
                                                    <p className='card-info-txt-2'>${producto.valorCanasta}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }

            </div>
        </>
    )
}

export default Productos