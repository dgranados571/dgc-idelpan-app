import React, { useEffect, useState } from 'react'
import logo from '../img/idelpanlogo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faFileText, faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import CrearOrden from './crearOrden'
import GestionOrdenes from './gestionOrdenes'
import { TransaccionProps } from '../interfaces/IAuthServices'
import ModalMensaje from '../modalMensaje/modalMensaje'
import productosUtil from '../util/productosUtil'

const Dashboard: React.FC<TransaccionProps> = ({ setCargando }) => {

    const { productosDetalle } = productosUtil();
    const navigate = useNavigate();

    const [modalMensaje, setModalMensaje] = useState({
        estado: false,
        indiceMensaje: '',
        funcionSi: () => { }
    });

    const [redirect, setRedirect] = useState('');

    const [infoMenuUsuario, setInfoMenuUsuario] = useState({
        usuario: '',
        nombre_completo: '',
        id_procesamiento: ''
    })

    useEffect(() => {
        setCargando(true);
        let usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        if (!!usuarioLocalStorage) {
            const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage)
            setInfoMenuUsuario({
                usuario: usuarioLocalStorageObj.usuario,
                nombre_completo: usuarioLocalStorageObj.nombres + ' ' + usuarioLocalStorageObj.apellidos,
                id_procesamiento: usuarioLocalStorageObj.id_procesamiento
            })
            setCargando(false);
        } else {
            setCargando(false);
            ejecutaModalMensaje('Auth-010');
        }
    }, [])

    const validateRedirect = () => {
        switch (redirect) {
            case 'VISTA_CREAR_ORDEN':
                return (
                    <>
                        <CrearOrden setRedirect={setRedirect} setCargando={setCargando} />
                    </>
                )
            case 'VISTA_GESTION_ORDENES':
                return (
                    <>
                        <GestionOrdenes setRedirect={setRedirect} setCargando={setCargando} />
                    </>
                )
            default:
                return (
                    <>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
                                <div className='div-dasboard-style-form'>
                                    <div className='div-dasboard-icon'>
                                        <FontAwesomeIcon icon={faCartArrowDown} className='dasboard-icon' />
                                    </div>
                                </div>
                                <div className='div-dasboard-actions'>
                                    <div className='div-buttom-registra mt-0'>
                                        <button className='btn btn-link a-dasboard-link' onClick={() => setRedirect('VISTA_CREAR_ORDEN')} >Crear orden de pedido</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
                                <div className='div-dasboard-style-form'>
                                    <div className='div-dasboard-icon'>
                                        <FontAwesomeIcon icon={faFileText} className='dasboard-icon' />
                                    </div>
                                </div>
                                <div className='div-dasboard-actions'>
                                    <div className='div-buttom-registra mt-0'>
                                        <button className='btn btn-link a-dasboard-link' onClick={() => setRedirect('VISTA_GESTION_ORDENES')} >Ver mis ordenes de pedido</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
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
        <div className='div-container'>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-3" >
                    <div className='div-menu-lateral'>
                        <div className='div-dashboard-container-logo'>
                            <div className='div-dashboard-logo'>
                                <img src={logo} alt='idelpan-logo' className='img-logo-idelpan'></img>
                            </div>
                        </div>
                        <div className='div-dashboard-info-padre'>
                            <div className='div-dashboard-info'>
                                <p className='m-0'>{infoMenuUsuario.id_procesamiento} </p>
                            </div>
                            <div className='div-dashboard-info'>
                                <p className='m-0'>{infoMenuUsuario.usuario} </p>
                            </div>
                            <div className='div-dashboard-info'>
                                <p className='m-0'>{infoMenuUsuario.nombre_completo} </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-9" >
                    <div className='div-dashboard-header-busqueda-padre'>
                        <FontAwesomeIcon icon={faBars} className='dasboard-icon-header-menu' />
                        <input type="text" className='form-control form-imput-busqueda' placeholder='Buscar productos' autoComplete='off' />
                        <FontAwesomeIcon icon={faCartArrowDown} className='dasboard-icon-header-busqueda' />
                    </div>
                    <div className='div-style-form'>
                        <div className="row">
                            {
                                Object.entries(productosDetalle).map(([key, producto]) => {
                                    return (
                                        <>
                                            <div className="col-6 col-sm-6 col-md-4 col-lg-4" >
                                                <div className='div-card-padre'>
                                                    <div className='div-card-img mb-4'>
                                                        <img className='card-img' src={producto.urlImage} alt=''></img>
                                                        <div className='div-card-info'>
                                                            <p className='card-info-nombre'>{producto.nombre}</p>
                                                            <p className='card-info-txt'>{producto.PxC} Paquetes x Canasta</p>
                                                            <div className='div-card-info-txt'>
                                                                <p className='card-info-txt'>Valor Paquete</p>
                                                                <p className='card-info-txt-2'>${producto.valorPaquete} </p>
                                                            </div>
                                                            <div className='div-card-info-txt'>
                                                                <p className='card-info-txt'>Valor Canasta</p>
                                                                <p className='card-info-txt-2'>${producto.valorCanasta}</p>
                                                            </div>
                                                        </div>                                                        
                                                    </div>
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
            {
                modalMensaje.estado ?
                    <ModalMensaje funcionSi={modalMensaje.funcionSi} indiceMensaje={modalMensaje.indiceMensaje} />
                    :
                    <></>
            }

        </div>
    )
}

export default Dashboard