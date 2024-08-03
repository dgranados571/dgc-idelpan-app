import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import CrearOrden from './crearOrden'
import GestionOrdenes from './gestionOrdenes'
import { TransaccionProps } from '../interfaces/IAuthServices'
import ModalMensaje from '../modalMensaje/modalMensaje'
import Productos from './productos'
import MenuLateralComponent from './menuLateral'

const Dashboard: React.FC<TransaccionProps> = ({ setCargando }) => {

    const navigate = useNavigate();

    const [modalMensaje, setModalMensaje] = useState({
        estado: false,
        indiceMensaje: '',
        funcionSi: () => { }
    });

    const [redirect, setRedirect] = useState('');

    const [openMenu, setOpenMenu] = useState(false);

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

    const validateRedirect = () => {
        switch (redirect) {
            case 'VISTA_MI_CUENTA':
                return (
                    <CrearOrden setCargando={setCargando} />
                )
            case 'VISTA_GESTION_ORDENES':
                return (
                    <GestionOrdenes setCargando={setCargando} />
                )
            default:
                return (
                    <Productos />
                )
        }
    }

    return (
        <div className='div-container'>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-3" >
                    <MenuLateralComponent setRedirect={setRedirect} setCargando={setCargando} setOpenMenu={setOpenMenu} openMenu={openMenu} infoMenuUsuario={infoMenuUsuario} />
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-9" >
                    <div className='div-dashboard-header-busqueda-padre'>
                        <div className="div-dashboard-header-busqueda">
                            <FontAwesomeIcon icon={faBars} className='dasboard-icon-header-menu' onClick={() => setOpenMenu(true)} />
                            <input type="text" className='form-control form-imput-busqueda' placeholder='Buscar productos' autoComplete='off' />
                            <FontAwesomeIcon icon={faCartArrowDown} className='dasboard-icon-header-busqueda' />
                        </div>
                    </div>
                    <div className="div-dashboard-content">
                        <div className='div-style-form'>
                            {
                                validateRedirect()
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