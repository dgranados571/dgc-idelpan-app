import React, { useEffect, useState } from 'react'
import { IUsuarios, TransaccionProps } from '../interfaces/IAuthServices'
import { AuthServices } from '../api/authServices'
import { GenericResponse } from '../interfaces/IGenericResponse'
import ModalMensaje from '../modalMensaje/modalMensaje'
import { useNavigate } from 'react-router-dom'

const UsuariosApp: React.FC<TransaccionProps> = ({ setCargando }) => {

    const navigate = useNavigate();

    const tiposDeDocumentos = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'CEDULA_CIUDADANIA', label: 'Cédula de ciudadanía' },
        { value: 'CEDULA_EXTRANJERIA', label: 'Cédula de extranjería' },
        { value: 'PASAPORTE', label: 'Pasaporte' },
        { value: 'NIT', label: 'NIT' }
    ]

    const roles = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'ROLE_ADMINISTRADOR', label: 'Administrador' }
    ]

    const [modalMensaje, setModalMensaje] = useState({
        estado: false,
        indiceMensaje: '',
        funcionSi: () => { }
    });

    const [usuarios, setUsuarios] = useState<IUsuarios[]>([]);
    const [roleUse, setRoleUse] = useState('');

    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [tipoIdentificacion, setTipoIdentificacion] = useState('INITIAL')
    const [identificacion, setIdentificacion] = useState('')
    const [correo, setCorreo] = useState('')
    const [confirmaCorreo, setConfirmaCorreo] = useState('');
    const [role, setRole] = useState('')

    const [nombresError, setNombresError] = useState(false)
    const [apellidosError, setApellidosError] = useState(false)
    const [tipoIdentificacionError, setTipoIdentificacionError] = useState(false)
    const [identificacionError, setIdentificacionError] = useState(false)
    const [correoError, setCorreoError] = useState(false)
    const [confirmaCorreoError, setConfirmaCorreoError] = useState(false);
    const [roleError, setRoleError] = useState(false)

    useEffect(() => {
        consultaUsuariosIdelpan();
    }, [])

    const consultaUsuariosIdelpan = async () => {
        setCargando(true);
        let usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        if (!!usuarioLocalStorage) {
            const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage);
            setRoleUse(usuarioLocalStorageObj.role);
            const body = {
                usuario: usuarioLocalStorageObj.usuario,
                role: 'ROLE_ADMINISTRADOR'
            }
            const authServices = new AuthServices();
            try {
                const response: GenericResponse = await authServices.requestPost(body, 7);
                if (response.estado) {
                    setUsuarios(response.objeto)
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

    const guardaUsuarioAction = () => {

        let formValidado = [];

        setNombresError(false)
        if (nombres.length === 0) {
            formValidado.push('Nombres');
            setNombresError(true)
        }

        setApellidosError(false)
        if (apellidos.length === 0) {
            formValidado.push('Apellidos');
            setApellidosError(true)
        }

        setTipoIdentificacionError(false)
        if (tipoIdentificacion.length === 0 || tipoIdentificacion === 'INITIAL') {
            formValidado.push('Tipo identificacion');
            setTipoIdentificacionError(true)
        }

        setIdentificacionError(false)
        if (identificacion.length === 0) {
            formValidado.push('identificacion');
            setIdentificacionError(true)
        }

        let correoValidate = false;
        if (correo.length === 0) {
            formValidado.push('correo');
            correoValidate = true;
        }

        let confirmaCorreoValidate = false;
        if (confirmaCorreo.length === 0) {
            formValidado.push('confirmaCorreo');
            confirmaCorreoValidate = true;
        }

        if (!correoValidate && !confirmaCorreoValidate) {
            if (correo !== confirmaCorreo) {
                formValidado.push('validacionCorreo');
                correoValidate = true;
                confirmaCorreoValidate = true;
            }
        }
        setCorreoError(correoValidate);
        setConfirmaCorreoError(confirmaCorreoValidate);

        setRoleError(false)
        if (role.length === 0 || role === 'INITIAL') {
            formValidado.push('Tipo identificacion');
            setRoleError(true)
        }

        if (formValidado.length === 0) {
            guardaUsuarioService()
        } else {
            formValidado.splice(0, formValidado.length)
        }
    }

    const guardaUsuarioService = async () => {
        setCargando(true)
        const body = {
            nombres,
            apellidos,
            tipoIdentificacion,
            identificacion,
            correo,
            role
        }
        const authServices = new AuthServices();
        try {
            const response: GenericResponse = await authServices.requestPost(body, 9);
            if (response.estado) {
                limpiarCampos();
                consultaUsuariosIdelpan();
            }
            setCargando(false);
            ejecutaModalMensaje(response.mensaje);
        } catch (error) {
            setCargando(false);
            ejecutaModalMensaje('Auth-002');
        }
    }

    const limpiarCampos = () => {
        setNombres('');
        setApellidos('');
        setTipoIdentificacion('INITIAL');
        setIdentificacion('');
        setCorreo('');
        setConfirmaCorreo('');
        setRole('');
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

    const eliminarCliente = async (usuario: string) => {
        setCargando(true);
        const authServices = new AuthServices();
        const body = {
            usuario,
        }
        try {
            const response: GenericResponse = await authServices.requestPost(body, 8);
            ejecutaModalMensaje(response.mensaje);
            setCargando(false);
            consultaUsuariosIdelpan();
        } catch (error) {
            setCargando(false);
            ejecutaModalMensaje('Auth-002');
        }
    }

    return (
        <>
            <div className='div-style-form'>
                <h3 className='titulo-form'>Registro de usuarios de aplicación</h3>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Nombres: </p>
                            <input value={nombres} onChange={(e) => setNombres(e.target.value)} type="text" className={nombresError ? 'form-control form-control-error' : 'form-control'} placeholder='' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Apellidos: </p>
                            <input value={apellidos} onChange={(e) => setApellidos(e.target.value)} type="text" className={apellidosError ? 'form-control form-control-error' : 'form-control'} placeholder='' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Tipo identificación: </p>
                            <select className={tipoIdentificacionError ? 'form-control form-control-error' : 'form-control'} value={tipoIdentificacion} onChange={(e) => setTipoIdentificacion(e.target.value)}  >
                                {
                                    tiposDeDocumentos.map((key, i) => {
                                        return (
                                            <option key={i} value={key.value}>{key.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Identificación: </p>
                            <input value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} placeholder='' className={identificacionError ? 'form-control form-control-error' : 'form-control'} autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Correo: </p>
                            <input value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder='' className={correoError ? 'form-control form-control-error' : 'form-control'} autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Confirmar Correo: </p>
                            <input value={confirmaCorreo} onChange={(e) => setConfirmaCorreo(e.target.value)} placeholder='' className={confirmaCorreoError ? 'form-control form-control-error' : 'form-control '} autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Role: </p>
                            <select className={roleError ? 'form-control form-control-error' : 'form-control'} value={role} onChange={(e) => setRole(e.target.value)}  >
                                {
                                    roles.map((key, i) => {
                                        return (
                                            <option key={i} value={key.value}>{key.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-buttom-registra'>
                            <button className='btn btn-primary bottom-custom' onClick={() => guardaUsuarioAction()} >Guardar</button>
                        </div>
                    </div>
                </div>
                <br />
            </div>
            <div className='div-style-form'>
                <div className="row">
                    {
                        Object.entries(usuarios).map(([key, usuario]) => {
                            return (
                                <div key={key} className="col-12 col-sm-6 col-md-6 col-lg-6 mb-4" >
                                    <div className="card-info-nombre-padre">
                                        <p className="card-info-nombre m-0">{usuario.nombres} {usuario.apellidos}</p>
                                        <p className="card-info-nombre m-0">{usuario.role}</p>
                                        <div className="">
                                            <p className="m-0">{usuario.usuario}</p>                                            
                                        </div>
                                        <div className="">
                                            <p className="m-0">No. Identificación {usuario.identificacion}</p>
                                        </div>
                                        <div className="div-info-clientes">
                                        <p className="card-info-nombre m-0">Estado:</p>
                                            <p className="mx-2 my-0">{usuario.usuario_activo ? 'Activo' : 'No Activo'}</p>                                            
                                        </div>
                                        <div className="div-info-clientes">
                                            <p className="m-0">{usuario.contrasenia}</p>
                                        </div>
                                        <div className="div-actions-clientes">
                                            {
                                                roleUse === 'ROLE_ROOT' ?
                                                    <>
                                                        <button className='btn btn-link a-link-login px-0' onClick={() => eliminarCliente(usuario.usuario)} >Eliminar</button>
                                                    </>
                                                    :
                                                    <></>
                                            }
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
                    <ModalMensaje funcionSi={modalMensaje.funcionSi} indiceMensaje={modalMensaje.indiceMensaje} funcionControl={() => { }} />
                    :
                    <></>
            }
        </>
    )
}

export default UsuariosApp