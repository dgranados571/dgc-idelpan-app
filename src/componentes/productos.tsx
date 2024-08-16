import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import productosUtil from '../util/productosUtil';
import { DetalleProductState, OrdenPedidoProduct, ProductosProps } from '../interfaces/IAuthServices';
import ModalMensaje from '../modalMensaje/modalMensaje';

const Productos: React.FC<ProductosProps> = ({ ordenPedido, setOrdenPedido }) => {

    const { productosDetalle } = productosUtil();

    const [modalMensaje, setModalMensaje] = useState({
        estado: false,
        indiceMensaje: '',
        funcionSi: () => { }
    });

    const capturaProducto = (detalleProducto: DetalleProductState) => {
        const cantidadPaquetesSesion = sessionStorage.getItem('cantidadPaquetes') || '0';
        const ordenPedidoFiltrado = ordenPedido.filter(idOp => idOp.idProduct === detalleProducto.idProduct);
        if (ordenPedidoFiltrado.length > 0) {
            const nuevoOrdenPedido = ordenPedido.map(idOp => {
                if (idOp.idProduct === detalleProducto.idProduct) {
                    const cantidadPaquetesXCanastaExistente = Number(idOp.cantidadCanastas) * detalleProducto.product.PxC;
                    const cantidadPaquetesNumber = Number(cantidadPaquetesSesion) + Number(idOp.cantidadPaquetes) + cantidadPaquetesXCanastaExistente;
                    const valorEntero = cantidadPaquetesNumber / detalleProducto.product.PxC;
                    const valorResiduo = cantidadPaquetesNumber % detalleProducto.product.PxC;
                    const cantidadCanastas = Math.trunc(valorEntero);
                    const cantidadPaquetes = valorResiduo;
                    return {
                        ...idOp,
                        cantidadPaquetes: String(cantidadPaquetes),
                        cantidadCanastas: String(cantidadCanastas),
                    }
                } else {
                    return { ...idOp }
                }
            })
            setOrdenPedido(nuevoOrdenPedido);
        } else {
            const valorEntero = Number(cantidadPaquetesSesion) / detalleProducto.product.PxC; 
            const valorResiduo = Number(cantidadPaquetesSesion) % detalleProducto.product.PxC;
            const cantidadCanastas = Math.trunc(valorEntero);
            const cantidadPaquetes = valorResiduo;
            const productOP: OrdenPedidoProduct = {
                idProduct: detalleProducto.idProduct,
                product: {
                    nombre: detalleProducto.product.nombre,
                    PxC: detalleProducto.product.PxC,
                    valorPaquete: detalleProducto.product.valorPaquete,
                    valorCanasta: detalleProducto.product.valorCanasta
                },
                cantidadPaquetes: String(cantidadPaquetes),
                cantidadCanastas: String(cantidadCanastas),
            }
            setOrdenPedido([...ordenPedido, productOP]);
        }
    }

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
                capturaProducto(detalleProducto);
            }
        })
    }

    const funcionControlModal = () => {
        sessionStorage.removeItem('detalleProducto');
        sessionStorage.removeItem('cantidadPaquetes');
        setModalMensaje({
            estado: false,
            indiceMensaje: '',
            funcionSi: () => { }
        });
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
                                            <img className='card-img' src={producto.urlImage} alt='' onClick={() => selecionaProducto(key)}></img>
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
                        <ModalMensaje funcionSi={modalMensaje.funcionSi} indiceMensaje={modalMensaje.indiceMensaje} funcionControl={funcionControlModal} />
                        :
                        <></>
                }
            </div>
        </>
    )
}

export default Productos