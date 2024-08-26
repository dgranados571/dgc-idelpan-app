import React, { useEffect, useState } from 'react'
import { TransaccionProps, Product, IInventario, DetalleProductState } from '../interfaces/IAuthServices'
import productosUtil from '../util/productosUtil';
import { AuthServices } from '../api/authServices';
import { useNavigate } from 'react-router-dom';
import ModalMensaje from '../modalMensaje/modalMensaje';
import { GenericResponse } from '../interfaces/IGenericResponse';

const InventarioAdmin: React.FC<TransaccionProps> = ({ setCargando }) => {

    const navigate = useNavigate();

    const { productosDetalle } = productosUtil();

    const [roleUse, setRoleUse] = useState('');
    const [inventario, setInventario] = useState<IInventario[]>([]);

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
                        const invetarioItem: IInventario = {
                            idProduct,
                            product: productosDetalle[idProduct],
                            unidadDisponible
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

    const funcionControlModal = () => {
        sessionStorage.removeItem('infoProdutoInvetario');
        setModalMensaje({
            estado: false,
            indiceMensaje: '',
            funcionSi: () => { }
        });
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

    const verDetalleInventarios = (idProduct: string) => {

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
                <div className="row">
                    {
                        Object.entries(inventario).map(([key, inventario]) => {
                            return (
                                <div key={key} className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4" >
                                    <div className="card-info-nombre-padre">
                                        <p className="card-info-nombre m-0">{inventario.product.nombre}</p>
                                        <div className="">
                                            <p className="m-0">Unidades disponibles: {inventario.unidadDisponible}</p>
                                        </div>
                                        <div className="div-butoms-product-inventario">
                                            <button className='btn btn-link a-link-login px-0' onClick={() => agregarInventarios(inventario.idProduct)} >Agregar</button>
                                            <button className='btn btn-link a-link-login px-0 mx-3' onClick={() => verDetalleInventarios(inventario.idProduct)} >Ver detalle</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
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

export default InventarioAdmin