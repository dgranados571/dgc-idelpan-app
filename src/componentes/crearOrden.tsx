import React, { useState } from 'react'
import { DashBoardProps, DetalleProductState, OrdenPedidoProduct } from '../interfaces/IAuthServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReplyAll, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import productosUtil from '../util/productosUtil'
import { GenericResponse } from '../interfaces/IGenericResponse'
import { AuthServices } from '../api/authServices'
import ModalMensaje from '../modalMensaje/modalMensaje'
import { useNavigate } from 'react-router-dom'

const CrearOrden: React.FC<DashBoardProps> = ({ setRedirect, setCargando }) => {

    const { productosDetalle } = productosUtil();

    const navigate = useNavigate();

    const [modalMensaje, setModalMensaje] = useState({
        estado: false,
        indiceMensaje: '',
        funcionSi: () => { }
    });

    const tiposDeCompra = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'PAQUETE', label: 'Paquete' },
        { value: 'CANASTA', label: 'Canasta' },
    ]

    const [tipoCompra, setTipoCompra] = useState('INITIAL');
    const [cantidad, setCantidad] = useState('');
    const [ordenPedido, setOrdenPedido] = useState<OrdenPedidoProduct[]>([]);

    const [tipoCompraError, setTipoCompraError] = useState(false);
    const [cantidadError, setCantidadError] = useState(false);

    const [detalleProduct, setDetalleProduct] = useState<DetalleProductState>({
        activo: false,
        idProduct: '',
        product: {
            nombre: 'Sin producto seleccionado',
            PxC: 0,
            valorPaquete: 0,
            valorCanasta: 0
        }
    });

    const selecionaProducto = (idProduct: any) => {
        setDetalleProduct({
            activo: true,
            idProduct,
            product: productosDetalle[idProduct]
        });
        setTipoCompra('INITIAL');
        setCantidad('');
        setTipoCompraError(false);
        setCantidadError(false);
    }

    const limpiarBusqueda = () => {
        setDetalleProduct({
            activo: false,
            idProduct: '',
            product: {
                nombre: 'Sin producto seleccionado',
                PxC: 0,
                valorPaquete: 0,
                valorCanasta: 0
            }
        });
    }

    const capturaProducto = () => {
        const formValidado = validaCampos();
        if (formValidado) {
            const productOP: OrdenPedidoProduct = {
                idProduct: detalleProduct.idProduct,
                product: detalleProduct.product,
                tipoCompra,
                cantidad
            }
            setOrdenPedido([...ordenPedido, productOP]);
            limpiarBusqueda();
        }
    }

    const validaCampos = () => {
        let controlCampo1 = false;
        let controlCampo2 = false;
        setTipoCompraError(controlCampo1);
        setCantidadError(controlCampo2);
        if (tipoCompra === 'INITIAL') {
            controlCampo1 = true;
        }
        if (cantidad.length === 0) {
            controlCampo2 = true;
        } else {
            const cantidadNumber = Number(cantidad);
            if (Number.isNaN(cantidadNumber)) {
                controlCampo2 = true;
            } else {
                if (cantidadNumber === 0) {
                    controlCampo2 = true;
                }
            }
        }
        if (controlCampo1 || controlCampo2) {
            setTipoCompraError(controlCampo1);
            setCantidadError(controlCampo2);
            return false
        } else {
            return true
        }
    }

    const labelTipoPedido = (tipoPedido: string, cantidad: string) => {
        const cantidadNumber = Number(cantidad);
        switch (tipoPedido) {
            case 'PAQUETE':
                if (cantidadNumber > 1) {
                    return (
                        <>Paquetes</>
                    )
                } else {
                    return (
                        <>Paquete</>
                    )
                }
            case 'CANASTA':
                if (cantidadNumber > 1) {
                    return (
                        <>Canastas</>
                    )
                } else {
                    return (
                        <>Canasta</>
                    )
                }
            default:
                return (
                    <></>
                )
        }
    }

    const cerrarOrden = async () => {
        setCargando(true);
        let usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        if (!!usuarioLocalStorage) {
            const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage);
            const body = {
                usuario: usuarioLocalStorageObj.usuario,
                ordenPedido: ordenPedido
            }
            const authServices = new AuthServices();
            try {
                const response: GenericResponse = await authServices.requestPost(body, 5);
                if (response.estado) {
                    setOrdenPedido([]);
                }
                ejecutaModalMensaje(response.mensaje);
                setCargando(false);
            } catch (error) {
                setCargando(false);
                ejecutaModalMensaje('Auth-002');
            }
        } else {
            setCargando(false);
            ejecutaModalMensaje('Auth-010');
        }
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

    return (
        <>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                    <div className='div-co-bottom'>
                        <h3 className='titulo-form'>Crear orden de pedido</h3>
                        <button className='btn btn-link a-link-whit-icon' onClick={() => setRedirect('')} >
                            <FontAwesomeIcon icon={faReplyAll} className='a-link-whit-icon' /> Volver
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-2 col-lg-4" >
                    <div className='div-style-form'>
                        <div>
                            <p className='p-label-form my-0'>Productos: </p>
                            <hr />
                        </div>
                        <div className='div-lista-produtos'>
                            {
                                Object.entries(productosDetalle).map(([key, producto]) => {
                                    return (
                                        <>
                                            <div className='div-item-produto'>
                                                <p className='m-0'>{producto.nombre}</p>
                                                <button className='btn btn-link a-link-whit-icon' onClick={() => selecionaProducto(key)} >
                                                    <FontAwesomeIcon icon={faPlusCircle} className='a-link-whit-icon' /> Agregar
                                                </button>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-5 col-lg-4" >
                    <div className='div-style-form'>
                        <div className='div-detalle-producto-t1'>
                            <p className='p-label-form my-0'>Detalle del produto: </p>
                            {
                                detalleProduct.activo ?
                                    <button className='btn btn-link a-link-whit-icon-2' onClick={() => limpiarBusqueda()} >
                                        Borrar <FontAwesomeIcon icon={faTrashAlt} className='a-link-whit-icon-2' />
                                    </button>
                                    :
                                    <></>
                            }
                        </div>
                        <hr />
                        <div className='div-p-label-form'>
                            <p className='p-label-form my-0'> {detalleProduct.product.nombre} </p>
                        </div>
                        <div className='div-p-label-form'>
                            <p className='m-0'>Unidades x canasta: </p>
                            <p className='p-label-form'> {detalleProduct.product.PxC} paquetes</p>
                        </div>
                        <div className='div-p-label-form'>
                            <p className='m-0'>Valor x paquete: </p>
                            <p className='p-label-form'> $ {detalleProduct.product.valorPaquete}  </p>
                        </div>
                        <div className='div-p-label-form'>
                            <p className='m-0'>Valor x canasta: </p>
                            <p className='p-label-form'> $ {detalleProduct.product.valorCanasta} </p>
                        </div>
                        {
                            detalleProduct.activo ?
                                <>
                                    <hr />
                                    <div className='div-form'>
                                        <p className='p-label-form'>Tipo de compra: </p>
                                        <select className={tipoCompraError ? 'form-control form-control-error' : 'form-control'} value={tipoCompra} onChange={(e) => setTipoCompra(e.target.value)}  >
                                            {
                                                tiposDeCompra.map((key, i) => {
                                                    return (
                                                        <option key={i} value={key.value}>{key.label}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='div-form'>
                                        <p className='p-label-form'>Cantidad: </p>
                                        <input type="text" className={cantidadError ? 'form-control form-control-error' : 'form-control'} value={cantidad} onChange={(e) => setCantidad(e.target.value)} placeholder='' autoComplete='off' />
                                    </div>
                                    <div className='div-buttom-registra'>
                                        <button className='btn btn-primary bottom-custom' onClick={() => capturaProducto()}>Agregar</button>
                                    </div>
                                </>
                                :
                                <></>
                        }
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-5 col-lg-4" >
                    <div className='div-style-form'>
                        <div>
                            <p className='p-label-form my-0'>Orden de pedido: </p>
                            <hr />
                            {
                                ordenPedido.map((pedido, ind) => {
                                    return (
                                        <>
                                            <div className='div-item-produto'>
                                                <p>{pedido.product.nombre} </p>
                                                <div className='div-item-produto'>
                                                    <p className='mx-2'>{pedido.cantidad} </p>
                                                    <p>
                                                        {
                                                            labelTipoPedido(pedido.tipoCompra, pedido.cantidad)
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                            {
                                ordenPedido.length > 0 ?
                                    <div className='div-buttom-registra'>
                                        <button className='btn btn-primary bottom-custom' onClick={() => cerrarOrden()}>Cerrar orden</button>
                                    </div>
                                    :
                                    <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                modalMensaje.estado ?
                    <ModalMensaje funcionSi={modalMensaje.funcionSi} indiceMensaje={modalMensaje.indiceMensaje} />
                    :
                    <></>
            }
        </>
    )
}

export default CrearOrden