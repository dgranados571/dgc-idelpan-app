import React, { useEffect, useState } from 'react'
import { GestionOrdenesDePedido, OrdenPedidoProduct, TransaccionProps } from '../interfaces/IAuthServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { AuthServices } from '../api/authServices';
import { GenericResponse } from '../interfaces/IGenericResponse';
import { useNavigate } from 'react-router-dom';
import productosUtil from '../util/productosUtil';

const GestionAdminOrdenes: React.FC<TransaccionProps> = ({ setCargando }) => {

    const navigate = useNavigate();

    const { productosDetalle } = productosUtil();

    const [ordenesPedido, setOrdenesPedido] = useState<GestionOrdenesDePedido[]>([]);

    const [detalleOp, setDetalleOP] = useState<OrdenPedidoProduct[]>([]);

    const [infoDelleOp, setInfoDelleOp] = useState({
        vistaActiva: false,
        idDetalleOp: ''
    })

    const [modalMensaje, setModalMensaje] = useState({
        estado: false,
        indiceMensaje: '',
        funcionSi: () => { }
    });

    useEffect(() => {
        setCargando(true);
        let usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        if (!!usuarioLocalStorage) {
            consultaOrdenesDePedido(usuarioLocalStorage);
        } else {
            setCargando(false);
            ejecutaModalMensaje('Auth-010');
        }
    }, [])

    const consultaOrdenesDePedido = async (usuarioLocalStorage: any) => {
        const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage);
        const body = {
            usuario: usuarioLocalStorageObj.usuario,
            estado: 'OP_ABIERTA',
        }
        const authServices = new AuthServices();
        try {
            const response: GenericResponse = await authServices.requestPost(body, 6);
            if (response.estado) {
                setOrdenesPedido(response.objeto);
            }
            setCargando(false);
        } catch (error) {
            setCargando(false);
            ejecutaModalMensaje('Auth-002');
        }
    }

    const detalleOrdenPedido = (ordePedido: GestionOrdenesDePedido) => {
        setInfoDelleOp({
            vistaActiva: true,
            idDetalleOp: ordePedido.idProcesamiento
        })
        setDetalleOP(ordePedido.productosLista);
    }

    const cierraDetalleOrdenPedido = () => {
        setDetalleOP([]);
        setInfoDelleOp({
            vistaActiva: false,
            idDetalleOp: ''
        })
    }

    const cerrarSesion = () => {
        sessionStorage.clear();
        navigate('/publicZone');
    }

    const ejecutaModalMensaje = (indiceMsj: string) => {
        setModalMensaje({
            estado: true,
            indiceMensaje: indiceMsj,
            funcionSi: () => {
                setModalMensaje({
                    estado: false,
                    indiceMensaje: '',
                    funcionSi: () => { }
                });
                if (indiceMsj === 'Auth-010') {
                    cerrarSesion();
                }
            }
        });
    }

    const precioProductoDetalle = (productDetalle: OrdenPedidoProduct) => {
        let totalProductoOp = 0
        const cantidadNumberPaquetes = Number(productDetalle.cantidadPaquetes);
        const precioProductoPaquetes = cantidadNumberPaquetes * productosDetalle[productDetalle.idProduct].valorPaquete;
        const cantidadNumberCanastas = Number(productDetalle.cantidadCanastas);
        const precioProductoCanasta = cantidadNumberCanastas * productosDetalle[productDetalle.idProduct].valorCanasta;
        const precioProducto = precioProductoPaquetes + precioProductoCanasta;
        totalProductoOp = totalProductoOp + precioProducto;
        return (
            <p className="card-info-nombre m-0">Valor: ${totalProductoOp} </p>
        )
    }

    const precioTotalOrdenDetalle = () => {
        let totalOp = 0
        detalleOp.map(product => {
            const cantidadNumberPaquetes = Number(product.cantidadPaquetes);
            const precioProductoPaquetes = cantidadNumberPaquetes * productosDetalle[product.idProduct].valorPaquete;
            const cantidadNumberCanastas = Number(product.cantidadCanastas);
            const precioProductoCanasta = cantidadNumberCanastas * productosDetalle[product.idProduct].valorCanasta;
            const precioProducto = precioProductoPaquetes + precioProductoCanasta;
            totalOp = totalOp + precioProducto;
        })
        return (
            <p className="card-info-nombre m-0">Total: ${totalOp} </p>
        )
    }

    return (
        <div className='div-style-form'>
            <h3 className='titulo-form'>Ordenes de pedido</h3>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                    <p className='p-label-form my-3'>Aqui podrá gestionar las ordenes de pedido de sus clientes:</p>
                    <hr />
                    {
                        infoDelleOp.vistaActiva ?
                            <div className='div-style-form'>
                                <div className='div-p-label-form'>
                                    <h3 className='titulo-form'>Detalle {infoDelleOp.idDetalleOp} </h3>
                                    <FontAwesomeIcon icon={faTimesCircle} className='icon-cierra' onClick={() => cierraDetalleOrdenPedido()} />
                                </div>
                                <hr />
                                <div className="row">
                                    {
                                        Object.entries(detalleOp).map(([key, ordenPedido]) => {
                                            return (
                                                <div className="col-6 col-sm-6 col-md-6 col-lg-4 mb-4" >
                                                    <div className="card-info-nombre-padre">
                                                        <p className="card-info-nombre m-0">{productosDetalle[ordenPedido.idProduct].nombre} </p>
                                                        <div className="div-gestion-product-agrega-padre">
                                                            <p className="mx-0 my-0">{ordenPedido.cantidadPaquetes} Paquetes</p>
                                                        </div>
                                                        <div className="">
                                                            <p className="m-0">{ordenPedido.cantidadCanastas} Canastas</p>
                                                        </div>
                                                        {
                                                            precioProductoDetalle(ordenPedido)
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <hr />
                                <div className="div-gran-total">
                                    {
                                        precioTotalOrdenDetalle()
                                    }
                                </div>
                                <hr />
                            </div>
                            :
                            <>
                                <div className='div-item-produto'>
                                    <div className='div-header-list-op-1'>
                                        <p className='p-label-form my-0'>Fecha</p>
                                    </div>
                                    <div className='div-header-list-op-1'>
                                        <p className='p-label-form my-0'>Usuario</p>
                                    </div>
                                    <div className='div-header-list-op-1'>
                                        <p className='p-label-form my-0'>Id Op: </p>
                                    </div>
                                    <div className='div-header-list-op-1'>
                                        <p className='p-label-form my-0'>Estado de la Orden: </p>
                                    </div>
                                    <div className='div-header-list-op-2'>
                                        <p className='p-label-form my-0'>Detalles</p>
                                    </div>
                                </div>
                                {
                                    Object.entries(ordenesPedido).map(([key, ordenPedido]) => {
                                        return (
                                            <>
                                                <div className='div-item-produto'>
                                                    <div className='div-header-list-op-1'>
                                                        <p className='m-0'>{ordenPedido.fechaOrdenPedido}</p>
                                                    </div>
                                                    <div className='div-header-list-op-1'>
                                                        <p className='m-0'>{ordenPedido.usuario}</p>
                                                    </div>
                                                    <div className='div-header-list-op-1'>
                                                        <p className='m-0'>{ordenPedido.idProcesamiento}</p>
                                                    </div>
                                                    <div className='div-header-list-op-1'>
                                                        <p className='m-0'>{ordenPedido.estadoOP}</p>
                                                    </div>
                                                    <div className='div-header-list-op-2'>
                                                        <button className='btn btn-link a-link-whit-icon' onClick={() => detalleOrdenPedido(ordenPedido)} >
                                                            <FontAwesomeIcon icon={faEye} className='a-link-whit-icon' /> Ver
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default GestionAdminOrdenes