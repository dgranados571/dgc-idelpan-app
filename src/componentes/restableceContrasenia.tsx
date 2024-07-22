import React, { useState } from 'react'
import { AuthProps } from '../interfaces/IAuthServices';

const RestableceContrasenia: React.FC<AuthProps>  = ({ setRedirect, setCargando }) => {

    const [viewStep, setviewStep] = useState('');

    const [usuario, setUsuario] = useState('');
    const [codigoOTP, setCodigoOTP] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmaContrasenia, setConfirmaContrasenia] = useState('');

    const executeViewStep = (step: string) => {
        setviewStep(step)
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
                                    <input type="text" className='form-control' value={codigoOTP} onChange={(e) => setCodigoOTP(e.target.value)} placeholder='' autoComplete='off' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-buttom-registra'>
                                    <button className='btn btn-primary bottom-custom' onClick={() => executeViewStep('UPDATE_PASS')} >Validar</button>
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
                                    <input type="password" className='form-control' value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} placeholder='' autoComplete='off' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                                <div className='div-form'>
                                    <p className='p-label-form'>Confirmar contraseña: </p>
                                    <input type="password" className='form-control' value={confirmaContrasenia} onChange={(e) => setConfirmaContrasenia(e.target.value)} placeholder='' autoComplete='off' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-buttom-registra'>
                                    <button className='btn btn-primary bottom-custom' onClick={() => executeViewStep('')} >Restablecer</button>
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
                                    <input type="text" className='form-control' value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder='' autoComplete='off' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-buttom-registra'>
                                    <button className='btn btn-primary bottom-custom' onClick={() => executeViewStep('VALIDATE_OTP')} >Restablecer</button>
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
        </div>
    )
}

export default RestableceContrasenia