import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IUsuarios, TransaccionProps } from '../interfaces/IAuthServices';
import ModalMensaje from '../modalMensaje/modalMensaje';
import { GenericResponse } from '../interfaces/IGenericResponse';
import { AuthServices } from '../api/authServices';

const Clientes: React.FC<TransaccionProps> = ({ setCargando }) => {

    const navigate = useNavigate();

    const [modalMensaje, setModalMensaje] = useState({
        estado: false,
        indiceMensaje: '',
        funcionSi: () => { }
    });

    const [clientes, setClientes] = useState<IUsuarios[]>([]);
    const [roleUse, setRoleUse] = useState('');

    useEffect(() => {
        consultaClientesIdelpan();
    }, [])

    const consultaClientesIdelpan = async () => {
        setCargando(true);
        let usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        if (!!usuarioLocalStorage) {
            const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage);
            setRoleUse(usuarioLocalStorageObj.role);
            const body = {
                usuario: usuarioLocalStorageObj.usuario,
                role: 'ROLE_CLIENTE'
            }
            const authServices = new AuthServices();
            try {
                const response: GenericResponse = await authServices.requestPost(body, 7);
                if (response.estado) {
                    setClientes(response.objeto)
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
        } catch (error) {
            setCargando(false);
            ejecutaModalMensaje('Auth-002');
        }
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

    return (
        <>
            <div className='div-style-form'>
                <div className="row">
                    {
                        Object.entries(clientes).map(([key, cliente]) => {
                            return (
                                <div className="col-6 col-sm-6 col-md-6 col-lg-4 mb-4" >
                                    <div className="card-info-nombre-padre">
                                        <p className="card-info-nombre m-0">{cliente.nombres} {cliente.apellidos}</p>
                                        <div className="">
                                            <p className="m-0">{cliente.usuario}</p>
                                        </div>
                                        <div className="">
                                            <p className="m-0">No. Identificación {cliente.identificacion}</p>
                                        </div>
                                        <div className="div-info-clientes">
                                            <p className="m-0">{cliente.usuario_activo ? 'Activo' : 'No Activo'}</p>
                                            <p className="mx-2 my-0 ">{cliente.fechaRegistroStr}</p>
                                        </div>
                                        <div className="div-actions-clientes">
                                            {
                                                roleUse === 'ROLE_ROOT' ?
                                                    <>

                                                        <button className='btn btn-link a-link-login px-0' onClick={() => eliminarCliente(cliente.usuario)} >Eliminar</button>
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

export default Clientes