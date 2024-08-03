import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faBars, faHome, faUser, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import CrearOrden from './crearOrden'
import GestionOrdenes from './gestionOrdenes'
import { MenuLateral, TransaccionProps } from '../interfaces/IAuthServices'
import ModalMensaje from '../modalMensaje/modalMensaje'
import Productos from './productos'
import MenuLateralComponent from './menuLateral'

const Dashboard: React.FC<TransaccionProps> = ({ setCargando }) => {

    const navigate = useNavigate();

    const [redirect, setRedirect] = useState('');

    const [menuLateral, setMenuLateral] = useState<MenuLateral[]>([
        {
            nombreItem: 'Inicio',
            className: 'div-item-menu active',
            iconMenu: faHome,
            controlVista: ''
        },
        {
            nombreItem: 'Mis ordenes de pedido',
            className: 'div-item-menu',
            iconMenu: faShoppingBag,
            controlVista: 'VISTA_GESTION_ORDENES'
        },
        {
            nombreItem: 'Mi cuenta',
            className: 'div-item-menu',
            iconMenu: faUser,
            controlVista: 'VISTA_MI_CUENTA'
        }
    ])

    const [modalMensaje, setModalMensaje] = useState({
        estado: false,
        indiceMensaje: '',
        funcionSi: () => { }
    });

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

    const selecionaMenu = (itemSeleccionado: MenuLateral) => {
        setRedirect(itemSeleccionado.controlVista);
        const nuevoMenuLateral = menuLateral.map(itemMenu => {
            if (itemMenu.nombreItem === itemSeleccionado.nombreItem) {
                return { ...itemMenu, className: 'div-item-menu active' };
            } else {
                return { ...itemMenu, className: 'div-item-menu' };
            }
        });
        setMenuLateral(nuevoMenuLateral);
    };

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
                    <GestionOrdenes setRedirect={setRedirect} setCargando={setCargando} selecionaMenu={selecionaMenu} menuLateral={menuLateral} />
                )
            default:
                return (
                    <div className='div-style-form'>
                        <Productos />
                    </div>
                )
        }
    }

    return (
        <div className='div-container'>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-3" >
                    <MenuLateralComponent setOpenMenu={setOpenMenu} selecionaMenu={selecionaMenu}
                        menuLateral={menuLateral} openMenu={openMenu} infoMenuUsuario={infoMenuUsuario} />
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
                        {
                            validateRedirect()
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
        </div>
    )
}

export default Dashboard