import React, { useEffect, useState } from 'react'
import { GestionOrdenesDePedido, IinfoDetalleOp, OrdenPedidoProduct, TransaccionProps } from '../interfaces/IAuthServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTimesCircle, faShareFromSquare } from '@fortawesome/free-solid-svg-icons'
import { AuthServices } from '../api/authServices';
import { GenericResponse } from '../interfaces/IGenericResponse';
import { useNavigate } from 'react-router-dom';
import productosUtil from '../util/productosUtil';
import ModalMensaje from '../modalMensaje/modalMensaje';

const GestionAdminOrdenes: React.FC<TransaccionProps> = ({ setCargando }) => {

    const navigate = useNavigate();

    const { productosDetalle } = productosUtil();

    const estadosOp = [
        { value: '', label: 'Todas' },
        { value: 'OP_ABIERTA', label: 'Abiertas' },
        { value: 'OP_ALISTAMIENTO', label: 'Alistamiento' },
        { value: 'OP_DE_ALTA', label: 'Entregadas'}
    ]

    const [estadoBusquedaOp, setEstadoBusquedaOp] = useState('');

    const [ordenesPedido, setOrdenesPedido] = useState<GestionOrdenesDePedido[]>([]);

    const [detalleOp, setDetalleOP] = useState<OrdenPedidoProduct[]>([]);

    const [infoDetalleOp, setInfoDetalleOp] = useState<IinfoDetalleOp>({
        vistaActiva: false,
        idDetalleOp: '',
        idOp: 0,
        estadoOp: ''
    })

    const [roleUse, setRoleUse] = useState('');

    const [modalMensaje, setModalMensaje] = useState({
        estado: false,
        indiceMensaje: '',
        funcionSi: () => { }
    });

    useEffect(() => {
        let usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        if (!!usuarioLocalStorage) {
            const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage);
            setRoleUse(usuarioLocalStorageObj.role);
            consultaOrdenesDePedido();
        } else {
            ejecutaModalMensaje('Auth-010');
        }
    }, [estadoBusquedaOp])

    const consultaOrdenesDePedido = async () => {
        setCargando(true);
        let usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        if (!!usuarioLocalStorage) {
            const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage);
            const body = {
                usuario: usuarioLocalStorageObj.usuario,
                estado: estadoBusquedaOp,
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
        } else {
            ejecutaModalMensaje('Auth-010');
        }
    }

    const detalleOrdenPedido = (ordePedido: GestionOrdenesDePedido) => {
        setInfoDetalleOp({
            vistaActiva: true,
            idDetalleOp: ordePedido.idProcesamiento,
            idOp: ordePedido.idOp,
            estadoOp: ordePedido.estadoOP
        })
        setDetalleOP(ordePedido.productosLista);
    }

    const cierraDetalleOrdenPedido = () => {
        setDetalleOP([]);
        setInfoDetalleOp({
            vistaActiva: false,
            idDetalleOp: '',
            idOp: 0,
            estadoOp: ''
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

    const eliminarOp = async (ordenPedido: GestionOrdenesDePedido) => {
        setCargando(true);
        const body = {
            usuario: ordenPedido.usuario,
            idOp: ordenPedido.idOp,
        }
        const authServices = new AuthServices();
        try {
            const response: GenericResponse = await authServices.requestPost(body, 10);
            if (response.estado) {
                consultaOrdenesDePedido();
                ejecutaModalMensaje(response.mensaje);
            }
            setCargando(false);
        } catch (error) {
            setCargando(false);
            ejecutaModalMensaje('Auth-002');
        }
    }

    const deAltaOpService = async () => {
        setCargando(true);
        const usuarioLocalStorage = sessionStorage.getItem('usuarioApp') || '';
        const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage);
        const body = {
            usuario: usuarioLocalStorageObj.usuario,
            idOp: infoDetalleOp.idOp,
            modoPago: ''
        }
        const authServices = new AuthServices();
        try {
            const response: GenericResponse = await authServices.requestPost(body, 11);
            if (response.estado) {
                consultaOrdenesDePedido();
                cierraDetalleOrdenPedido();
            }
            ejecutaModalMensaje(response.mensaje);
            setCargando(false);
        } catch (error) {
            setCargando(false);
            ejecutaModalMensaje('Auth-002');
        }
    }

    const deAltaOp = () => {
        deAltaOpService()
    }

    const alistarPedidoService = async () => {
        setCargando(true);
        const modoPago = sessionStorage.getItem('modoPago')
        const usuarioLocalStorage = sessionStorage.getItem('usuarioApp') || '';
        const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage);
        const body = {
            usuario: usuarioLocalStorageObj.usuario,
            idOp: infoDetalleOp.idOp,
            modoPago
        }
        const authServices = new AuthServices();
        try {
            const response: GenericResponse = await authServices.requestPost(body, 15);
            if (response.estado) {
                sessionStorage.removeItem('modoPago');
                consultaOrdenesDePedido();
                cierraDetalleOrdenPedido();
            }
            ejecutaModalMensaje(response.mensaje);
            setCargando(false);
        } catch (error) {
            setCargando(false);
            ejecutaModalMensaje('Auth-002');
        }
    }

    const alistarPedido = () => {
        sessionStorage.setItem('infoDetalleOp', JSON.stringify(infoDetalleOp));
        setModalMensaje({
            estado: true,
            indiceMensaje: 'DAR_DE_ALTA_OP',
            funcionSi: () => { alistarPedidoService() }
        })
    }

    const funcionControlModal = () => {
        sessionStorage.removeItem('infoDetalleOp');
        setModalMensaje({
            estado: false,
            indiceMensaje: '',
            funcionSi: () => { }
        });
    }

    const actionsOperativosOp = () => {
        switch (infoDetalleOp.estadoOp) {
            case 'OP_ABIERTA':
                return (
                    <button className='btn btn-link a-link-whit-icon p-0' onClick={() => alistarPedido()} >
                        <FontAwesomeIcon icon={faShareFromSquare} className='a-link-whit-icon' />Alistar Pedido
                    </button>
                )
            case 'OP_ALISTAMIENTO':
                return (
                    <button className='btn btn-link a-link-whit-icon p-0' onClick={() => deAltaOp()} >
                        <FontAwesomeIcon icon={faShareFromSquare} className='a-link-whit-icon' />Dar de Alta
                    </button>
                )
            default:
                return (
                    <></>
                )
        }

    }

    return (
        <>
            <div className='div-style-form'>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <h3 className='titulo-form'>Ordenes de pedido</h3>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        {
                            infoDetalleOp.vistaActiva ?
                                <p></p>
                                :
                                <select className='form-control' value={estadoBusquedaOp} onChange={(e) => setEstadoBusquedaOp(e.target.value)} >
                                    {
                                        estadosOp.map((key, i) => {
                                            return (
                                                <option key={i} value={key.value}>{key.label}</option>
                                            )
                                        })
                                    }
                                </select>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                        <p className='p-label-form my-3'>Aqui podrá gestionar las ordenes de pedido de sus clientes:</p>
                        <hr />
                        {
                            infoDetalleOp.vistaActiva ?
                                <div className='div-style-form'>
                                    <div className='div-p-label-form'>
                                        <h3 className='titulo-form'>Detalle {infoDetalleOp.idDetalleOp} </h3>
                                        <button className='btn btn-link a-link-whit-icon' onClick={() => cierraDetalleOrdenPedido()} >
                                            Cerrar <FontAwesomeIcon icon={faTimesCircle} className='a-link-whit-icon' />
                                        </button>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        {
                                            Object.entries(detalleOp).map(([key, ordenPedido]) => {
                                                return (
                                                    <div key={key} className="col-6 col-sm-6 col-md-6 col-lg-4 mb-4" >
                                                        <div className="card-info-nombre-padre">
                                                            <p className="card-info-nombre m-0">{productosDetalle[ordenPedido.idProduct].nombre} </p>
                                                            <div className="div-gestion-product-agrega-padre">
                                                                <p className="m-0">{ordenPedido.cantidadCanastas} Canastas</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mx-0 my-0">{ordenPedido.cantidadPaquetes} Paquetes</p>
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
                                            actionsOperativosOp()
                                        }
                                        {
                                            precioTotalOrdenDetalle()
                                        }
                                    </div>
                                    <hr />
                                </div>
                                :
                                <>
                                    <div className='div-item-produto-padre-padre'>
                                        <div className='div-item-produto-padre'>
                                            <div className='div-item-produto'>
                                                <div className='div-header-list-op-1'>
                                                    <p className='p-label-form my-0'>Fecha</p>
                                                </div>
                                                <div className='div-header-list-op-1'>
                                                    <p className='p-label-form my-0'>Cliente</p>
                                                </div>
                                                <div className='div-header-list-op-2'>
                                                    <p className='p-label-form my-0'>Id Op</p>
                                                </div>
                                                <div className='div-header-list-op-2'>
                                                    <p className='p-label-form my-0'>Modo de pago</p>
                                                </div>
                                                <div className='div-header-list-op-2'>
                                                    <p className='p-label-form my-0'>Estado de la Orden</p>
                                                </div>
                                                <div className='div-header-list-op-2'>
                                                    <p className='p-label-form my-0'>Detalles</p>
                                                </div>
                                            </div>
                                            {
                                                Object.entries(ordenesPedido).map(([key, ordenPedido]) => {
                                                    return (
                                                        <>
                                                            <div key={key} className='div-item-produto'>
                                                                <div className='div-header-list-op-1'>
                                                                    <p className='m-0'>{ordenPedido.fechaOrdenPedido}</p>
                                                                </div>
                                                                <div className='div-header-list-op-1'>
                                                                    <p className='m-0'>{ordenPedido.usuario}</p>
                                                                </div>
                                                                <div className='div-header-list-op-2'>
                                                                    <p className='m-0'>{ordenPedido.idProcesamiento}</p>
                                                                </div>
                                                                <div className='div-header-list-op-2'>
                                                                    <p className='m-0'>{ordenPedido.modoPago}</p>
                                                                </div>
                                                                <div className='div-header-list-op-2'>
                                                                    <p className='m-0'>{ordenPedido.estadoOP}</p>
                                                                </div>
                                                                <div className='div-header-list-op-2'>
                                                                    <button className='btn btn-link a-link-whit-icon' onClick={() => detalleOrdenPedido(ordenPedido)} >
                                                                        <FontAwesomeIcon icon={faEye} className='a-link-whit-icon' /> Ver
                                                                    </button>
                                                                    {
                                                                        roleUse === 'ROLE_ROOT' ?
                                                                            <>
                                                                                <button className='btn btn-link a-link-whit-icon' onClick={() => eliminarOp(ordenPedido)} >
                                                                                    <FontAwesomeIcon icon={faEye} className='a-link-whit-icon' /> Eliminar
                                                                                </button>
                                                                            </>
                                                                            :
                                                                            <></>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
            {
                modalMensaje.estado ?
                    <ModalMensaje funcionSi={modalMensaje.funcionSi} indiceMensaje={modalMensaje.indiceMensaje} funcionControl={funcionControlModal} />
                    :
                    <></>
            }
        </>
    )
}

export default GestionAdminOrdenes