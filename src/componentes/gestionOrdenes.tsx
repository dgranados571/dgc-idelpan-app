import React, { useEffect, useState } from 'react'
import { DashBoardProps, GestionOrdenesDePedido, OrdenPedidoProduct } from '../interfaces/IAuthServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReplyAll, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { AuthServices } from '../api/authServices'
import { GenericResponse } from '../interfaces/IGenericResponse'
import { useNavigate } from 'react-router-dom'
import ModalMensaje from '../modalMensaje/modalMensaje'
import productosUtil from '../util/productosUtil'

const GestionOrdenes: React.FC<DashBoardProps> = ({ setRedirect, setCargando }) => {

  const { productosDetalle } = productosUtil();
  const navigate = useNavigate();

  const [modalMensaje, setModalMensaje] = useState({
    estado: false,
    indiceMensaje: '',
    funcionSi: () => { }
  });

  const [ordenesPedido, setOrdenesPedido] = useState<GestionOrdenesDePedido[]>([]);

  const [idOrdenDePedido, setIdOrdenDePedido] = useState({
    activo: false,
    idProcesamiento: '',
  });
  const [detalleOrdenesPedido, setDetalleOrdenesPedido] = useState<OrdenPedidoProduct[]>([]);

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
        }
      }
    });
  }

  const detalleOrdenPedido = (idProcesamiento: string, productosLista: OrdenPedidoProduct[]) => {
    setIdOrdenDePedido({
      activo: true,
      idProcesamiento
    });
    setDetalleOrdenesPedido(productosLista);
  }

  const limpiarBusqueda = () => {
    setDetalleOrdenesPedido([])
    setIdOrdenDePedido({
      activo: false,
      idProcesamiento: '',
    });
  }

  const labelProductName = (idProduct: string) => {
    const productName = productosDetalle[idProduct].nombre;
    return (
      <>{productName}</>
    )

  }

  return (
    <>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
          <div className='div-co-bottom'>
            <h3 className='titulo-form'>Mis ordenes de pedido</h3>
            <button className='btn btn-link a-link-whit-icon' onClick={() => setRedirect('')} >
              <FontAwesomeIcon icon={faReplyAll} className='a-link-whit-icon' /> Volver
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-5" >
          <div className='div-style-form'>
            <p className='p-label-form my-0'>Seleccione la orden de pedido que desea vizualizar:</p>
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
        <div className="col-12 col-sm-12 col-md-12 col-lg-7" >
          <div className='div-style-form'>
            <div className='div-detalle-producto-t1'>
              {
                idOrdenDePedido.activo ?
                  <>
                    <p className='p-label-form my-0'>Detalle de la Orden: {idOrdenDePedido.idProcesamiento} </p>
                    <button className='btn btn-link a-link-whit-icon-2' onClick={() => limpiarBusqueda()} >
                      Borrar <FontAwesomeIcon icon={faTrashAlt} className='a-link-whit-icon-2' />
                    </button>
                  </>

                  :
                  <p className='p-label-form my-0'>Sin orden de pedido seleccionado.</p>
              }
            </div>
            <hr />
            <div className='div-item-produto'>
              <div className='div-header-list-op-1'>
                <p className='p-label-form my-0'>Producto</p>
              </div>
              <div className='div-header-list-op-2'>
                <p className='p-label-form my-0'>Tipo de compra: </p>
              </div>
              <div className='div-header-list-op-2'>
                <p className='p-label-form my-0'>Cantidad</p>
              </div>
            </div>
            {
              Object.entries(detalleOrdenesPedido).map(([key, producto]) => {
                return (
                  <>
                    <div className='div-item-produto'>
                      <div className='div-header-list-op-1'>
                        <p className='m-0'>{labelProductName(producto.idProduct)}</p>
                      </div>
                      <div className='div-header-list-op-2'>
                        <p className='m-0'>{producto.tipoCompra}</p>
                      </div>
                      <div className='div-header-list-op-2'>
                        <p className='m-0'>{producto.cantidad}</p>
                      </div>
                    </div>
                  </>
                )
              })
            }
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

export default GestionOrdenes