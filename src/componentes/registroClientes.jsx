import { useState } from 'react'
import { AuthServices } from '../api/authServices';
import ModalMensaje from '../modalMensaje/modalMensaje';

const RegistroClientes = ({ setRedirect, setCargando }) => {

    const [modalMensaje, setModalMensaje] = useState({
        estado: false,
        indiceMensaje: 0,
        funcionSi: () => { }
    });

    const tiposDeDocumentos = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'CEDULA_CIUDADANIA', label: 'Cédula de ciudadanía' },
        { value: 'CEDULA_EXTRANJERIA', label: 'Cédula de extranjería' },
        { value: 'PASAPORTE', label: 'Pasaporte' },
        { value: 'NIT', label: 'NIT' }
    ]

    const [tipoDocumento, setTipoDocumento] = useState('INITIAL');
    const [numDocumento, setNumDocumento] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [confirmaCorreo, setConfirmaCorreo] = useState('');
    const [numeroCelular, setNumeroCelular] = useState('');

    const [tipoDocumentoError, setTipoDocumentoError] = useState(false);
    const [numDocumentoError, setNumDocumentoError] = useState(false);
    const [nombresError, setNombresError] = useState(false);
    const [apellidosError, setApellidosError] = useState(false);
    const [correoError, setCorreoError] = useState(false);
    const [confirmaCorreoError, setConfirmaCorreoError] = useState(false);
    const [numeroCelularError, setNumeroCelularError] = useState(false);

    const crearCuentaAction = async () => {
        setCargando(true);
        const formValidado = validaCampos();
        if (formValidado) {
            const body = {
                tipoDocumento,
                numDocumento,
                nombres,
                apellidos,
                correo,
                numeroCelular
            }
            const authServices = new AuthServices();
            try {
                await authServices.requestPost(body);
                setTimeout(() => {
                    limpiarCampos();
                    setCargando(false);
                    ejecutaModalMensaje(1);
                }, 250);
            } catch (error) {
                setTimeout(() => {
                    setCargando(false);
                    ejecutaModalMensaje(2);
                }, 250);
            }
        } else {
            setTimeout(() => {
                setCargando(false);
            }, 250);
        }
    }

    const validaCampos = () => {
        let formValidado = [];

        setTipoDocumentoError(false);
        if (tipoDocumento === 'INITIAL') {
            formValidado.push('tipoDocumento');
            setTipoDocumentoError(true);
        }

        setNumDocumentoError(false);
        if (numDocumento.length === 0) {
            formValidado.push('numDocumento');
            setNumDocumentoError(true);
        }

        setNombresError(false);
        if (nombres.length === 0) {
            formValidado.push('nombres');
            setNombresError(true);
        }

        setApellidosError(false);
        if (apellidos.length === 0) {
            formValidado.push('apellidos');
            setApellidosError(true);
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

        setNumeroCelularError(false);
        if (numeroCelular.length === 0) {
            formValidado.push('numeroCelular');
            setNumeroCelularError(true);
        }

        if (formValidado.length === 0) {
            return true;
        } else {
            formValidado.splice(0, formValidado.length);
            return false;
        }
    }

    const limpiarCampos = () => {
        setTipoDocumento('INITIAL');
        setNumDocumento('');
        setNombres('');
        setApellidos('');
        setCorreo('');
        setConfirmaCorreo('');
        setNumeroCelular('');
    }

    const ejecutaModalMensaje = (indiceMsj) => {
        setModalMensaje({
            estado: true,
            indiceMensaje: indiceMsj,
            funcionSi: () => {
                setModalMensaje({
                    estado: false,
                    indiceMensaje: 0,
                    funcionSi: () => { }
                });
                if (indiceMsj === 1) {
                    setRedirect('USUARIO_LOGIN');
                }
            }
        });
    }


    return (
        <div>
            <h3 className='titulo-form'>Creación de cuenta</h3>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Tipo de identificación: </p>
                        <select className={tipoDocumentoError ? 'form-control form-control-error' : 'form-control '} value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)}  >
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
                        <p className='p-label-form'>Número de documento: </p>
                        <input type="text" className={numDocumentoError ? 'form-control form-control-error' : 'form-control '} value={numDocumento} onChange={(e) => setNumDocumento(e.target.value)} placeholder='' autoComplete='off' />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Nombres: </p>
                        <input type="text" className={nombresError ? 'form-control form-control-error' : 'form-control '} value={nombres} onChange={(e) => setNombres(e.target.value)} placeholder='' autoComplete='off' />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Apellidos: </p>
                        <input type="text" className={apellidosError ? 'form-control form-control-error' : 'form-control '} value={apellidos} onChange={(e) => setApellidos(e.target.value)} placeholder='' autoComplete='off' />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Correo: </p>
                        <input placeholder='' className={correoError ? 'form-control form-control-error' : 'form-control '} value={correo} onChange={(e) => setCorreo(e.target.value)} autoComplete='off' />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Confirmar Correo: </p>
                        <input placeholder='' className={confirmaCorreoError ? 'form-control form-control-error' : 'form-control '} value={confirmaCorreo} onChange={(e) => setConfirmaCorreo(e.target.value)} autoComplete='off' />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Número celular: </p>
                        <input placeholder='' className={numeroCelularError ? 'form-control form-control-error' : 'form-control '} value={numeroCelular} onChange={(e) => setNumeroCelular(e.target.value)} autoComplete='off' />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-buttom-registra'>
                        <button className='btn btn-primary bottom-custom' onClick={() => crearCuentaAction()} >Crear cuenta</button>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-buttom-registra'>
                        <button className='btn btn-link a-link-login' onClick={() => setRedirect('USUARIO_LOGIN')} >Volver al login</button>
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

export default RegistroClientes