import React, { useEffect, useState } from 'react'
import { TransaccionProps, Product, IInventario, DetalleProductState, IinfoDetalleInventarioObj } from '../interfaces/IAuthServices'
import productosUtil from '../util/productosUtil';
import { AuthServices } from '../api/authServices';
import { useNavigate } from 'react-router-dom';
import ModalMensaje from '../modalMensaje/modalMensaje';
import { GenericResponse } from '../interfaces/IGenericResponse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, } from '@fortawesome/free-solid-svg-icons'

const InventarioAdmin: React.FC<TransaccionProps> = ({ setCargando }) => {

    const navigate = useNavigate();

    const { productosDetalle } = productosUtil();
    const [vistaDetalleInventario, setVistaDetalleInventario] = useState(false);
    const [roleUse, setRoleUse] = useState('');
    const [inventario, setInventario] = useState<IInventario[]>([]);

    const operacionesInventario = [
        { value: '', label: 'Todas' },
        { value: 'Adiciona', label: 'Adiciona' },
        { value: 'Extrae', label: 'Extrae' },
    ]

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
            consultaInventarioProductos();
        } else {
            setCargando(false);
            ejecutaModalMensaje('Auth-010');
        }
    }, [])

    const controlProductosInventario = async () => {
        setCargando(true);
        const authServices = new AuthServices();
        const newListProducts = Object.entries(productosDetalle).map(([key, producto]) => {
            const product: Product = {
                nombre: key,
                PxC: producto.PxC,
                productoPorCanasta: producto.PxC,
                valorPaquete: producto.valorPaquete,
                valorCanasta: producto.valorCanasta
            }
            return product
        })
        const body = {
            newListProducts,
        }
        try {
            const response: GenericResponse = await authServices.requestPost(body, 12);
            ejecutaModalMensaje(response.mensaje);
            setCargando(false);
        } catch (error) {
            setCargando(false);
            ejecutaModalMensaje('Auth-002');
        }
    }

    const consultaInventarioProductos = async () => {
        setCargando(true);
        let usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        if (!!usuarioLocalStorage) {
            const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage);
            const authServices = new AuthServices();
            const body = {
                usuario: usuarioLocalStorageObj.usuario,
                role: usuarioLocalStorageObj.role
            }
            try {
                const response: GenericResponse = await authServices.requestPost(body, 13);
                if (response.estado) {
                    const invetarioList = Object.entries(response.objeto).map(([key, inventario]) => {
                        const idProduct = JSON.parse(JSON.stringify(inventario)).idProduct;
                        const unidadDisponible = JSON.parse(JSON.stringify(inventario)).cantidadDisponible;
                        const porcentajeRef = JSON.parse(JSON.stringify(inventario)).porcentajeRef;
                        const deltaSemanal = JSON.parse(JSON.stringify(inventario)).deltaSemanal;
                        const deltaDiario = JSON.parse(JSON.stringify(inventario)).deltaDiario;
                        const invetarioItem: IInventario = {
                            idProduct,
                            product: productosDetalle[idProduct],
                            unidadDisponible,
                            porcentajeRef: `${porcentajeRef}%`,
                            deltaSemanal,
                            deltaDiario
                        }
                        return invetarioItem
                    })
                    setInventario(invetarioList)
                }
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

    const agregarInventarios = (idProduct: string) => {
        const detalleProductState: DetalleProductState = {
            idProduct,
            product: productosDetalle[idProduct],
            activo: false
        }
        sessionStorage.setItem('infoProdutoInvetario', JSON.stringify(detalleProductState));
        setModalMensaje({
            estado: true,
            indiceMensaje: 'CARGAR_INVENTARIO',
            funcionSi: () => { agregaInventarioService() }
        })
    }

    const agregaInventarioService = async () => {
        setCargando(true);
        let usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        if (!!usuarioLocalStorage) {
            const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage);
            const cantidadAInventario = sessionStorage.getItem('cantidadPaquetes');
            const productoInvetario = sessionStorage.getItem('infoProdutoInvetario') || 'Error';
            const productoInvetarioObj: DetalleProductState = JSON.parse(productoInvetario);
            const authServices = new AuthServices();
            const body = {
                usuario: usuarioLocalStorageObj.usuario,
                idProduct: productoInvetarioObj.idProduct,
                cantidadAInventario,
            }
            try {
                const response: GenericResponse = await authServices.requestPost(body, 14);
                if (response.estado) {
                    sessionStorage.removeItem('cantidadPaquetes');
                    sessionStorage.removeItem('infoProdutoInvetario');
                }
                ejecutaModalMensaje(response.mensaje);
                setCargando(false);
                consultaInventarioProductos();
            } catch (error) {
                setCargando(false);
                ejecutaModalMensaje('Auth-002');
            }
        } else {
            setCargando(false);
            ejecutaModalMensaje('Auth-010');
        }
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

    const cerrarSesion = () => {
        sessionStorage.clear();
        navigate('/publicZone');
    }

    const funcionControlModal = () => {
        sessionStorage.removeItem('infoProdutoInvetario');
        setModalMensaje({
            estado: false,
            indiceMensaje: '',
            funcionSi: () => { }
        });
    }

    const verDetalleInventarios = async (idProduct: string, operacion: string) => {
        setCargando(true);
        let usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        if (!!usuarioLocalStorage) {
            const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage);
            const authServices = new AuthServices();
            const body = {
                usuario: usuarioLocalStorageObj.usuario,
                idProduct,
                operacion
            }
            try {
                const response: GenericResponse = await authServices.requestPost(body, 16);
                if (response.estado) {
                    sessionStorage.setItem('infoDetalleInventario', JSON.stringify(response.objeto));
                    setVistaDetalleInventario(true)
                } else {
                    ejecutaModalMensaje(response.mensaje);
                }
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

    const detalleInventarioAction = (nameOperation: string) => {
        const detallleInventario = sessionStorage.getItem('infoDetalleInventario') || 'Error';
        const detallleInventarioObj: IinfoDetalleInventarioObj = JSON.parse(detallleInventario);
        verDetalleInventarios(detallleInventarioObj.idProduct, nameOperation)
    }

    const cierraDetalleInventarioAction = () => {
        sessionStorage.removeItem('infoDetalleInventario');
        setVistaDetalleInventario(false)
    }

    const detalleInventarioVista = () => {
        const detallleInventario = sessionStorage.getItem('infoDetalleInventario') || 'Error';
        const detallleInventarioObj: IinfoDetalleInventarioObj = JSON.parse(detallleInventario);
        const nombrePoducto = productosDetalle[detallleInventarioObj.idProduct].nombre
        return (
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className='div-p-label-form'>
                        <p className='p-label-form my-0'>Detalle Inventario:</p>
                        <p className='p-label-form my-0'>  {nombrePoducto} </p>
                        <button className='btn btn-link a-link-whit-icon' onClick={() => { cierraDetalleInventarioAction() }} >
                            Cerrar <FontAwesomeIcon icon={faTimesCircle} className='a-link-whit-icon' />
                        </button>
                    </div>
                    <hr />
                    <p className='p-label-form mx-0 my-2'>Detalle delta semanal:</p>
                    {
                        Object.entries(detallleInventarioObj.listDeltaSemanal).map(([key, eventos]) => {
                            return (
                                <>
                                    <div key={key} className='div-item-produto'>
                                        <div className='div-header-list-op-1 margin-control-1'>
                                            <p className='m-0'>Del</p>
                                            <p className='mx-2 my-0'>{eventos.fechaInicial} </p>
                                            <p className='m-0'> a </p>
                                            <p className='mx-2 my-0'> {eventos.fechaFinal} </p>
                                        </div>
                                        <div className='div-header-list-op-2'>
                                            <p className='m-0'> {eventos.cantidad} Unidades</p>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                    <div className='div-p-label-form'>
                        <p className='p-label-form my-0'>Total delta semanal:</p>
                        <p className='p-label-form my-0'>{detallleInventarioObj.deltaSemanal} Unidades</p>
                    </div>
                    <hr />
                    <p className='p-label-form mx-0 my-2'>Detalle delta diario:</p>
                    {
                        Object.entries(detallleInventarioObj.listDeltaDiario).map(([key, eventos]) => {
                            return (
                                <>
                                    <div key={key} className='div-item-produto'>
                                        <div className='div-header-list-op-1 margin-control-1'>
                                            <p className='m-0'>Del</p>
                                            <p className='mx-2 my-0'>{eventos.fechaInicial} </p>
                                        </div>
                                        <div className='div-header-list-op-2'>
                                            <p className='m-0'> {eventos.cantidad} Unidades</p>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                     <div className='div-p-label-form'>
                        <p className='p-label-form my-0'>Total delta diario:</p>
                        <p className='p-label-form my-0'>{detallleInventarioObj.deltaDiario} Unidades</p>
                    </div>

                    <hr />
                    <p className='p-label-form mx-0 my-2'>Filtrar por operación:</p>
                    <select className='form-control' onChange={(e) => detalleInventarioAction(e.target.value)} >
                        {
                            operacionesInventario.map((key, i) => {
                                return (
                                    <option key={i} value={key.value}>{key.label}</option>
                                )
                            })
                        }
                    </select>
                    <hr />
                    <div className='div-inventario-padre'>
                        <div className='div-inventario-hijo'>
                            <div className='div-item-produto'>
                                <div className='div-header-list-op-1 margin-control-1'>
                                    <p className='p-label-form my-0'>Fecha</p>
                                </div>
                                <div className='div-header-list-op-1 margin-control-1'>
                                    <p className='p-label-form my-0'>Operación</p>
                                </div>
                                <div className='div-header-list-op-2'>
                                    <p className='p-label-form my-0'>Cantidad</p>
                                </div>
                            </div>
                            {
                                Object.entries(detallleInventarioObj.listEventos).map(([key, eventos]) => {
                                    return (
                                        <>
                                            <div key={key} className='div-item-produto'>
                                                <div className='div-header-list-op-1 margin-control-1'>
                                                    <p className='m-0'>{eventos.fechaRegistroStr} {eventos.horaStr} </p>
                                                </div>
                                                <div className='div-header-list-op-1 margin-control-1'>
                                                    <p className='m-0'> {eventos.operacion} </p>
                                                </div>
                                                <div className='div-header-list-op-2'>
                                                    <p className='m-0'> {eventos.cantidad} Unidades</p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='div-style-form'>
                {
                    roleUse === 'ROLE_ROOT' ?
                        <>
                            <div className="div-control-products">
                                <button className='btn btn-link a-link-login px-0' onClick={() => controlProductosInventario()} >Cargar Productos</button>
                            </div>
                        </>
                        :
                        <></>
                }
                {
                    vistaDetalleInventario ?
                        <>
                            {
                                detalleInventarioVista()
                            }
                        </>
                        :
                        <>
                            <div className="row">
                                {
                                    Object.entries(inventario).map(([key, inventario]) => {
                                        return (
                                            <div key={key} className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4" >
                                                <div className="card-info-nombre-padre">
                                                    <p className="card-info-nombre m-0">{inventario.product.nombre}</p>
                                                    <div className="">
                                                        <p className="m-0">Delta semanal: {inventario.deltaSemanal}</p>
                                                    </div>
                                                    <div className="">
                                                        <p className="m-0">Delta diario: {inventario.deltaDiario}</p>
                                                    </div>
                                                    <div className="">
                                                        <p className="m-0">Unidades disponibles: {inventario.unidadDisponible}</p>
                                                    </div>
                                                    <div className="div-percent-invetario-padre">
                                                        <div className="div-percent-invetario" style={{ backgroundColor: "orange", width: inventario.porcentajeRef }}></div>
                                                        <p className="mx-1 my-0">{inventario.porcentajeRef} </p>
                                                    </div>
                                                    <div className="div-butoms-product-inventario">
                                                        <button className='btn btn-link a-link-login px-0' onClick={() => agregarInventarios(inventario.idProduct)} >Agregar</button>
                                                        <button className='btn btn-link a-link-login px-0 mx-3' onClick={() => verDetalleInventarios(inventario.idProduct, '')} >Ver detalle</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>

                }
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

export default InventarioAdmin