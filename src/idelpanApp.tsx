import ReactPlayer from 'react-player'
import RegistroClientes from './componentes/registroClientes'
import logo from './img/idelpanlogo.jpg'
import { useState } from 'react';
import Login from './componentes/login';
import RestableceContrasenia from './componentes/restableceContrasenia';
import { Cargando } from './loader/cargando';

const IdelpanApp = () => {

    const [cargando, setCargando] = useState(false)
    const [redirect, setRedirect] = useState('USUARIO_LOGIN')

    const validateRedirect = () => {
        switch (redirect) {
            case 'USUARIO_LOGIN':
                return (
                    <Login setRedirect={setRedirect} setCargando={setCargando} />
                )
            case 'USUARIO_SINGIN':
                return (
                    <RegistroClientes setRedirect={setRedirect} setCargando={setCargando} />
                )
            case 'USUARIO_UPDATE_PASS':
                return (
                    <RestableceContrasenia setRedirect={setRedirect} setCargando={setCargando} />
                )
            default:
                return (
                    <></>
                )
        }
    }

    return (
        <>
            <div className='div-container'>
                <div className='div-container-logo'>
                    <div className='div-logo'>
                        <img src={logo} alt='idelpan-logo' className='img-logo-idelpan'></img>
                    </div>
                </div>
                <div className='div-style-form'>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-4" >
                            {
                                validateRedirect()
                            }
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
                            <ReactPlayer url='https://youtu.be/Ag1p7ibKq2A?si=4t0QLX9xEhq1HrBX' controls width='100%' />
                        </div>
                    </div>
                </div>
            </div>
            {
                cargando ?
                    <Cargando />
                    :
                    <></>
            }
        </>
    )
}

export default IdelpanApp