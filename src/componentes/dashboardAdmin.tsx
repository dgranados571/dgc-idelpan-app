import React, { useEffect, useState } from 'react'
import { MenuLateral, TransaccionProps } from '../interfaces/IAuthServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faHome, faUserLock, faBars, faFolderTree } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import MenuLateralComponent from './menuLateral';
import ModalMensaje from '../modalMensaje/modalMensaje';
import Clientes from './clientes';
import UsuariosApp from './usuariosApp';
import GestionAdminOrdenes from './gestionAdminOrdenes';

const DashboardAdmin: React.FC<TransaccionProps> = ({ setCargando }) => {

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
            nombreItem: 'Inventarios',
            className: 'div-item-menu',
            iconMenu: faFolderTree,
            controlVista: 'VISTA_INVENTARIOS'
        },
        {
            nombreItem: 'Mis clientes',
            className: 'div-item-menu',
            iconMenu: faUserFriends,
            controlVista: 'VISTA_CLIENTES'
        },
        {
            nombreItem: 'Usuarios de aplicación',
            className: 'div-item-menu',
            iconMenu: faUserLock,
            controlVista: 'VISTA_USUARIOS_APP'
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
            case 'VISTA_INVENTARIOS':
                return (
                    <div className='div-style-form'>
                        VISTA_INVENTARIOS
                    </div>
                )
            case 'VISTA_CLIENTES':
                return (
                    <Clientes setCargando={setCargando} />
                )
            case 'VISTA_USUARIOS_APP':
                return (
                    <UsuariosApp setCargando={setCargando} />
                )
            default:
                return (
                    <GestionAdminOrdenes setCargando={setCargando} />
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
                            <input type="text" className='form-control form-imput-busqueda' placeholder='Buscar' autoComplete='off' />
                            <div className="div-cantidad-carrito"></div>
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
                    <ModalMensaje funcionSi={modalMensaje.funcionSi} indiceMensaje={modalMensaje.indiceMensaje} funcionControl={() => { }} />
                    :
                    <></>
            }
        </div >
    )
}

export default DashboardAdmin