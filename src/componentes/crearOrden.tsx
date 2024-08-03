import React, { useState } from 'react'
import { DashBoardProps, DetalleProductState, OrdenPedidoProduct } from '../interfaces/IAuthServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReplyAll, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import productosUtil from '../util/productosUtil'
import { GenericResponse } from '../interfaces/IGenericResponse'
import { AuthServices } from '../api/authServices'
import ModalMensaje from '../modalMensaje/modalMensaje'
import { useNavigate } from 'react-router-dom'

const CrearOrden: React.FC<DashBoardProps> = ({ setCargando }) => {

    const { productosDetalle } = productosUtil();

    const navigate = useNavigate();

    const [modalMensaje, setModalMensaje] = useState({
        estado: false,
        indiceMensaje: '',
        funcionSi: () => { }
    });

    const [ordenPedido, setOrdenPedido] = useState<OrdenPedidoProduct[]>([]);

    const capturaProducto = () => {
        
        const productOP: OrdenPedidoProduct = {
            idProduct: '',
            product: {
                nombre: '',
                PxC: 0,
                valorPaquete: 0,
                valorCanasta: 0
            },
            tipoCompra: '',
            cantidad: '0'
        }
        setOrdenPedido([...ordenPedido, productOP]);
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
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-5 col-lg-4" >
                    
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