import React, { useState } from 'react'

const Login = ({ setRedirect, setCargando }) => {

    const [usuario, setUsuario] = useState('');
    const [constrasenia, setContrasenia] = useState('');

    return (
        <div>
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
                        <input type="password" className='form-control' value={constrasenia} onChange={(e) => setContrasenia(e.target.value)} placeholder='' autoComplete='off' />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                    <div className='div-buttom-registra'>
                        <button className='btn btn-primary bottom-custom' >Ingresar</button>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6" >
                    <div className='div-buttom-registra'>
                        <button className='btn btn-link a-link-login' onClick={()=> setRedirect('USUARIO_UPDATE_PASS')} >Restablecer contraseña</button>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6" >
                    <div className='div-buttom-registra'>
                        <button className='btn btn-link a-link-login' onClick={()=> setRedirect('USUARIO_SINGIN')} >Crear cuenta</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login