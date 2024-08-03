import React, { useState } from 'react'
import { DashBoardProps, DetalleProductState, OrdenPedidoProduct } from '../interfaces/IAuthServices'
import { GenericResponse } from '../interfaces/IGenericResponse'
import { AuthServices } from '../api/authServices'
import { useNavigate } from 'react-router-dom'

const CrearOrden: React.FC<DashBoardProps> = ({ setCargando }) => {

    const navigate = useNavigate();

    const [modalMensaje, setModalMensaje] = useState({
        estado: false,
        indiceMensaje: '',
        funcionSi: () => { }
    });


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
                <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                    <div className='div-style-form'>
                        <div>
                            <p className='p-label-form my-0'>Orden de pedido: </p>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CrearOrden