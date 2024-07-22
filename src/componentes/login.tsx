import React, { useState } from 'react'
import { AuthProps } from '../interfaces/IAuthServices';
import { AuthServices } from '../api/authServices';
import { GenericResponse } from '../interfaces/IGenericResponse';
import ModalMensaje from '../modalMensaje/modalMensaje';

const Login: React.FC<AuthProps> = ({ setRedirect, setCargando }) => {

    const [modalMensaje, setModalMensaje] = useState({
        estado: false,
        indiceMensaje: '',
        funcionSi: () => { }
    });
    const [viewStep, setviewStep] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmaContrasenia, setConfirmaContrasenia] = useState('');

    const [contraseniaError, setContraseniaError] = useState(false);
    const [confirmaContraseniaError, setConfirmaContraseniaError] = useState(false);

    const validateViewStep = () => {
        switch (viewStep) {
            case 'LOGIN_ACTIVATE':
                return (
                    <>
                        <h3 className='titulo-form'>Actualizar contraseña</h3>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                                <div className='div-form'>
                                    <p className='p-label-form'>Usuario (Correo electrónico): </p>
                                    <input type="text" className='form-control' value={usuario} placeholder='' autoComplete='off' disabled />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                                <div className='div-form'>
                                    <p className='p-label-form'>Contraseña nueva: </p>
                                    <input type="password" className={contraseniaError ? 'form-control form-control-error' : 'form-control'} value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} placeholder='' autoComplete='off' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                                <div className='div-form'>
                                    <p className='p-label-form'>Confirmar contraseña: </p>
                                    <input type="password" className={confirmaContraseniaError ? 'form-control form-control-error' : 'form-control'} value={confirmaContrasenia} onChange={(e) => setConfirmaContrasenia(e.target.value)} placeholder='' autoComplete='off' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                                <div className='div-buttom-registra'>
                                    <button className='btn btn-primary bottom-custom' onClick={() => actualizaPassAction()} >Actualizar</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            default:
                return (
                    <>
                        <h3 className='titulo-form'>Iniciar sesión</h3>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                                <div className='div-form'>
                                    <p className='p-label-form'>Usuario (Correo electrónico): </p>
                                    <input type="text" className='form-control' value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder='' autoComplete='off' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                                <div className='div-form'>
                                    <p className='p-label-form'>Contraseña: </p>
                                    <input type="password" className='form-control' value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} placeholder='' autoComplete='off' />
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                                <div className='div-buttom-registra'>
                                    <button className='btn btn-primary bottom-custom' onClick={() => loginAction()} >Ingresar</button>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6" >
                                <div className='div-buttom-registra'>
                                    <button className='btn btn-link a-link-login' onClick={() => setRedirect('USUARIO_UPDATE_PASS')} >Restablecer contraseña</button>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6" >
                                <div className='div-buttom-registra'>
                                    <button className='btn btn-link a-link-login' onClick={() => setRedirect('USUARIO_SINGIN')} >Crear cuenta</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
        }
    }

    const loginAction = async () => {
        setCargando(true);
        const body = {
            usuario,
            contrasenia,
        }
        const authServices = new AuthServices();
        try {
            const response: GenericResponse = await authServices.requestPost(body, 2);
            if (response.estado) {
                if (response.mensaje === 'LOGIN_ACTIVATE') {
                    setContrasenia('');
                    setviewStep(response.mensaje);
                } else {
                    console.log('REDIRECCIONO A LA ZONA TRANSACIONAL')
                }
            } else {
                ejecutaModalMensaje(response.mensaje);
            }
            setCargando(false);
        } catch (error) {
            setCargando(false);
            ejecutaModalMensaje('Auth-002');
        }
    }

    const actualizaPassAction = async () => {
        setContraseniaError(false);
        setConfirmaContraseniaError(false)
        if (contrasenia === confirmaContrasenia) {
            setCargando(true);
            const body = {
                usuario,
                contrasenia,
            }
            const authServices = new AuthServices();
            try {
                const response: GenericResponse = await authServices.requestPost(body, 3);
                ejecutaModalMensaje(response.mensaje);
                setCargando(false);
            } catch (error) {
                setCargando(false);
                ejecutaModalMensaje('Auth-002');
            }
        } else {
            setContraseniaError(true);
            setConfirmaContraseniaError(true);
            ejecutaModalMensaje('Auth-005');
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
                if (indiceMsj === 'Auth-006') {
                    setviewStep('');
                    limpiarCampos();
                }
            }
        });
    }

    const limpiarCampos = () => {
        setUsuario('');
        setContrasenia('');
        setConfirmaContrasenia('');   
    }

    return (
        <div>
            {
                validateViewStep()
            }
            {
                modalMensaje.estado ?
                    <ModalMensaje funcionSi={modalMensaje.funcionSi} indiceMensaje={modalMensaje.indiceMensaje} />
                    :
                    <></>
            }
        </div>
    )
}

export default Login