import React, { useEffect, useState } from 'react'
import { GestionOrdenesDePedido, GestionOrdenPedidoProps, OrdenPedidoProduct } from '../interfaces/IAuthServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { AuthServices } from '../api/authServices'
import { GenericResponse } from '../interfaces/IGenericResponse'
import { useNavigate } from 'react-router-dom'
import ModalMensaje from '../modalMensaje/modalMensaje'

const GestionOrdenes: React.FC<GestionOrdenPedidoProps> = ({ setRedirect, setCargando, selecionaMenu, menuLateral }) => {

  const navigate = useNavigate();

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

  const gestionarProductos = () => {
    setRedirect('');
    selecionaMenu(menuLateral[0])
  }

  const detalleOrdenPedido = (idProcesamiento: string, productosLista: OrdenPedidoProduct[]) => {
    
  }

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