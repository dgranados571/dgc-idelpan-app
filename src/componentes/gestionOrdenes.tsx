import React, { useEffect, useState } from 'react'
import { GestionOrdenesDePedido, GestionOrdenPedidoProps, OrdenPedidoProduct } from '../interfaces/IAuthServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { AuthServices } from '../api/authServices'
import { GenericResponse } from '../interfaces/IGenericResponse'
import { useNavigate } from 'react-router-dom'
import ModalMensaje from '../modalMensaje/modalMensaje'
import productosUtil from '../util/productosUtil'

const GestionOrdenes: React.FC<GestionOrdenPedidoProps> = ({ setRedirect, setCargando, selecionaMenu, menuLateral, ordenPedido, setOrdenPedido }) => {

  const navigate = useNavigate();

  const { productosDetalle } = productosUtil();

  const [carritoEstado, setcarritoEstado] = useState('');

  const [modalMensaje, setModalMensaje] = useState({
    estado: false,
    indiceMensaje: '',
    funcionSi: () => { }
  });

  const [ordenesPedido, setOrdenesPedido] = useState<GestionOrdenesDePedido[]>([]);

  useEffect(() => {
    setCargando(true);
    let usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
    if (!!usuarioLocalStorage) {
      consultaOrdenesDePedido(usuarioLocalStorage);
      if (ordenPedido.length > 0) {
        setcarritoEstado('CARRITO_LLENO')
      }
    } else {
      setCargando(false);
      ejecutaModalMensaje('Auth-010');
    }
  }, [])

  const cerrarOrden = async () => {
    setCargando(true);
    let usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
    if (!!usuarioLocalStorage) {
      const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage);
      const body = {
        usuario: usuarioLocalStorageObj.usuario,
        ordenPedido
      }
      const authServices = new AuthServices();
      try {
        const response: GenericResponse = await authServices.requestPost(body, 5);
        if (response.estado) {
          setOrdenPedido([])
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

  const consultaOrdenesDePedido = async (usuarioLocalStorage: any) => {
    const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage);
    const body = {
      usuario: usuarioLocalStorageObj.usuario
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
        } else if (indiceMsj === 'Auth-011') {
          gestionarProductos()
        }
      }
    });
  }

  const gestionarProductos = () => {
    setRedirect('');
    selecionaMenu(menuLateral[0])
  }

  const detalleOrdenPedido = (idProcesamiento: string, productosLista: OrdenPedidoProduct[]) => {

  }

  const labelInfoProductOP = (product: OrdenPedidoProduct) => {
    let labelTipoCompra1 = '';
    let labelTipoCompra2 = '';

    const cantidadNumberPaquetes = Number(product.cantidadPaquetes);
    if (cantidadNumberPaquetes === 1) {
      labelTipoCompra1 = 'Paquete';
    } else {
      labelTipoCompra1 = 'Paquetes';
    }
    const precioProductoPaquetes = cantidadNumberPaquetes * product.product.valorPaquete;

    const cantidadNumberCanastas = Number(product.cantidadCanastas);
    if (cantidadNumberCanastas === 1) {
      labelTipoCompra2 = 'Canasta';
    } else {
      labelTipoCompra2 = 'Canastas';
    }
    const precioProductoCanasta = cantidadNumberCanastas * product.product.valorCanasta;
    const precioProducto = precioProductoPaquetes + precioProductoCanasta;
    return (
      <div className="div-label-info-op">
        <p className="card-info-nombre m-0">{product.product.nombre}</p>
        <div className="">
          <p className="m-0">{cantidadNumberPaquetes} {labelTipoCompra1}</p>
        </div>
        <div className="">
          <p className="m-0">{cantidadNumberCanastas} {labelTipoCompra2}</p>
        </div>
        <p className="card-info-nombre m-0">${precioProducto}</p>
      </div>
    )
  }

  const validateRedirect = () => {
    switch (carritoEstado) {
      case 'CARRITO_LLENO':
        return (
          <>
            <div className='div-style-form'>
              {
                Object.entries(ordenPedido).map(([key, product]) => {
                  return (
                    <div className="row mb-3">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-1" ></div>
                      <div className="col-5 col-sm-4 col-md-4 col-lg-3" >
                        <img className='card-img' style={{ 'cursor': 'default' }} src={productosDetalle[product.idProduct].urlImage} alt=''></img>
                      </div>
                      <div className="col-7 col-sm-8 col-md-8 col-lg-6" >
                        {
                          labelInfoProductOP(product)
                        }
                      </div>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-2" ></div>
                    </div>
                  )
                })
              }

              <div className="row mb-3">
                <div className="col-7 col-sm-12 col-md-12 col-lg-1" ></div>
                <div className="col-7 col-sm-12 col-md-12 col-lg-9" >
                  <hr />
                  <div className='div-header-list-op-2'>
                    <button className='btn btn-link a-link-whit-icon' >
                      <button className='btn btn-primary bottom-custom' onClick={() => gestionarProductos()}>Explorar productos</button>
                    </button>
                    <button className='btn btn-link a-link-whit-icon' >
                      <button className='btn btn-primary bottom-custom' onClick={() => cerrarOrden()}>Enviar</button>
                    </button>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-2" ></div>
              </div>

            </div>
          </>
        )
      default:
        return (
          <>
            <div className="div-valida-carrito">
              <FontAwesomeIcon icon={faShoppingBasket} className='dasboard-icon' />
              <p className='p-label-form my-3'>Tu carrito de compras esta vacio</p>
              <button className='btn btn-primary bottom-custom' onClick={() => gestionarProductos()}>Explorar productos</button>
            </div>
            <div className='div-style-form'>
              <h3 className='titulo-form'>Mis ordenes de pedido</h3>
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                  <p className='p-label-form my-3'>Aqui podrá vizualizar el detalle de cada una de sus ordenes de pedido:</p>
                  <hr />
                  <div className='div-item-produto'>
                    <div className='div-header-list-op-1'>
                      <p className='p-label-form my-0'>Fecha</p>
                    </div>
                    <div className='div-header-list-op-1'>
                      <p className='p-label-form my-0'>Id Orden de Pedido: </p>
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
                              <p className='m-0'>{ordenPedido.idProcesamiento}</p>
                            </div>
                            <div className='div-header-list-op-2'>
                              <button className='btn btn-link a-link-whit-icon' onClick={() => detalleOrdenPedido(ordenPedido.idProcesamiento, ordenPedido.productosLista)} >
                                <FontAwesomeIcon icon={faEye} className='a-link-whit-icon' /> Ver detalle
                              </button>
                            </div>
                          </div>
                        </>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <>
      {
        validateRedirect()
      }
      {
        modalMensaje.estado ?
          <ModalMensaje funcionSi={modalMensaje.funcionSi} indiceMensaje={modalMensaje.indiceMensaje} funcionControl={() => { }} />
          :
          <></>
      }
    </>
  )
}

export default GestionOrdenes