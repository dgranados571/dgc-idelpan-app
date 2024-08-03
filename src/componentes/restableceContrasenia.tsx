import React, { useState } from 'react'
import { AuthProps } from '../interfaces/IAuthServices';
import { AuthServices } from '../api/authServices';
import { GenericResponse } from '../interfaces/IGenericResponse';
import ModalMensaje from '../modalMensaje/modalMensaje';

const RestableceContrasenia: React.FC<AuthProps> = ({ setRedirect, setCargando }) => {

    const [modalMensaje, setModalMensaje] = useState({
        estado: false,
        indiceMensaje: '',
        funcionSi: () => { }
    });

    const [viewStep, setviewStep] = useState('');

    const [usuario, setUsuario] = useState('');
    const [codigoOTP, setCodigoOTP] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmaContrasenia, setConfirmaContrasenia] = useState('');

    const [usuarioError, setUsuarioError] = useState(false);
    const [codigoOTPError, setCodigoOTPError] = useState(false);
    const [contraseniaError, setContraseniaError] = useState(false);
    const [confirmaContraseniaError, setConfirmaContraseniaError] = useState(false);

    const executeViewStep = async (step: string) => {
        switch (step) {
            case 'STEP_1':
                setUsuarioError(false);
                if (usuario.length === 0) {
                    setUsuarioError(true);
                } else {
                    setCargando(true);
                    const body = {
                        usuario,
                        contrasenia,
                    }
                    const authServices = new AuthServices();
                    try {
                        const response: GenericResponse = await authServices.requestPost(body, 4);
                        if (response.estado) {
                            setviewStep('VALIDATE_OTP');
                        }
                        ejecutaModalMensaje(response.mensaje);
                        setCargando(false);
                    } catch (error) {
                        setCargando(false);
                        ejecutaModalMensaje('Auth-002');
                    }
                }
                break;
            case 'STEP_2':
                setCodigoOTPError(false);
                if (codigoOTP.length === 0) {
                    setCodigoOTPError(true);
                } else {
                    setCargando(true);
                    const body = {
                        usuario,
                        contrasenia: codigoOTP,
                    }
                    const authServices = new AuthServices();
                    try {
                        const response: GenericResponse = await authServices.requestPost(body, 2);
                        if (response.estado) {
                            setviewStep('UPDATE_PASS');
                        } else {
                            ejecutaModalMensaje('Auth-008');
                        }
                        setCargando(false);
                    } catch (error) {
                        setCargando(false);
                        ejecutaModalMensaje('Auth-002');
                    }
                }
                break;
            case 'STEP_3':
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
                        await authServices.requestPost(body, 3);
                        limpiarCampos();
                        ejecutaModalMensaje('Auth-009');
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
                break;
            default:
                break;
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
                if (indiceMsj === 'Auth-009') {
                    setRedirect('USUARIO_LOGIN');
                }
            }
        });
    }

    const limpiarCampos = () => {
        setUsuario('');
        setContrasenia('');
        setConfirmaContrasenia('');
        setCodigoOTP('');   
    }

    const validateViewStep = () => {
        switch (viewStep) {
            case 'VALIDATE_OTP':
                return (
                    <>
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
                                    <p className='p-label-form'>Código de seguridad: </p>
                                    <input type="text" className={codigoOTPError ? 'form-control form-control-error' : 'form-control'} value={codigoOTP} onChange={(e) => setCodigoOTP(e.target.value)} placeholder='' autoComplete='off' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-buttom-registra'>
                                    <button className='btn btn-primary bottom-custom' onClick={() => executeViewStep('STEP_2')} >Validar</button>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-buttom-registra'>
                                    <button className='btn btn-link a-link-login' onClick={() => setRedirect('USUARIO_LOGIN')} >Volver al login</button>
                                </div>
                            </div>
                        </div>
                    </>

                )
            case 'UPDATE_PASS':
                return (
                    <>
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
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-buttom-registra'>
                                    <button className='btn btn-primary bottom-custom' onClick={() => executeViewStep('STEP_3')} >Restablecer</button>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-buttom-registra'>
                                    <button className='btn btn-link a-link-login' onClick={() => setRedirect('USUARIO_LOGIN')} >Volver al login</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            default:
                return (
                    <>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                                <div className='div-form'>
                                    <p className='p-label-form'>Usuario (Correo electrónico): </p>
                                    <input type="text" className={usuarioError ? 'form-control form-control-error' : 'form-control'} value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder='' autoComplete='off' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-buttom-registra'>
                                    <button className='btn btn-primary bottom-custom' onClick={() => executeViewStep('STEP_1')} >Restablecer</button>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-buttom-registra'>
                                    <button className='btn btn-link a-link-login' onClick={() => setRedirect('USUARIO_LOGIN')} >Volver al login</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
        }
    }

    return (
        <div>
            <h3 className='titulo-form'>Recuperar contraseña</h3>
            {
                validateViewStep()
            }
            {
                modalMensaje.estado ?
                    <ModalMensaje funcionSi={modalMensaje.funcionSi} indiceMensaje={modalMensaje.indiceMensaje} funcionControl={()=>{}} />
                    :
                    <></>
            }
        </div>
    )
}

export default RestableceContrasenia