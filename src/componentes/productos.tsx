import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import productosUtil from '../util/productosUtil';
import { DetalleProductState } from '../interfaces/IAuthServices';
import ModalMensaje from '../modalMensaje/modalMensaje';

const Productos = () => {

    const { productosDetalle } = productosUtil();

    const [modalMensaje, setModalMensaje] = useState({
        estado: false,
        indiceMensaje: '',
        funcionSi: () => { }
    });

    const selecionaProducto = (idProduct: any) => {
        const detalleProducto: DetalleProductState = {
            activo: true,
            idProduct,
            product: productosDetalle[idProduct]
        }
        sessionStorage.setItem('detalleProducto', JSON.stringify(detalleProducto));
        setModalMensaje({
            estado: true,
            indiceMensaje: 'GESTION_CARRITO_COMPRAS',
            funcionSi: () => {
                sessionStorage.removeItem('detalleProducto')
                setModalMensaje({
                    estado: false,
                    indiceMensaje: '',
                    funcionSi: () => { }
                });
            }
        })
    }

    return (
        <>
            <h3 className='titulo-form mb-3'>Productos Idelpan:</h3>
            <div className="row">
                {
                    Object.entries(productosDetalle).map(([key, producto]) => {
                        return (
                            <>
                                <div className="col-6 col-sm-6 col-md-4 col-lg-4" >
                                    <div className='div-card-padre'>
                                        <div className='div-card-img mb-4'>
                                            <div className="div-card-icon">
                                                <FontAwesomeIcon icon={faPlusCircle} className='icon-agrega-carrito' onClick={() => selecionaProducto(key)} />
                                            </div>
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
                {
                    modalMensaje.estado ?
                        <ModalMensaje funcionSi={modalMensaje.funcionSi} indiceMensaje={modalMensaje.indiceMensaje} />
                        :
                        <></>
                }

            </div>
        </>
    )
}

export default Productos