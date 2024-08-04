import { ModalMensajeUtil } from './modalMensajeUtil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { DetalleProductState, ModalProps } from '../interfaces/IAuthServices';
import './modalMensaje.css'
import { useState } from 'react';

const ModalMensaje: React.FC<ModalProps> = ({ indiceMensaje, funcionSi, funcionControl }) => {

    const { modalInfo } = ModalMensajeUtil();

    const [cantidad, setCantidad] = useState('');

    const [cantidadError, setCantidadError] = useState(false);

    const agregaACarrito = () => {
        let controlCampo = false;
        setCantidadError(controlCampo);
        if (cantidad.length === 0) {
            controlCampo = true;
        } else {
            const cantidadNumber = Number(cantidad);
            if (Number.isNaN(cantidadNumber)) {
                controlCampo = true;
            } else {
                if (cantidadNumber === 0) {
                    controlCampo = true;
                }
            }
        }
        if (controlCampo) {
            setCantidadError(controlCampo);
        } else {
            sessionStorage.setItem('cantidadPaquetes', cantidad); 
            funcionSi();
            funcionControl();
        }
    }

    const validateRedirect = () => {
        switch (indiceMensaje) {
            case 'GESTION_CARRITO_COMPRAS':
                const detalleProducto = sessionStorage.getItem('detalleProducto') || 'Error';
                const detalleProductoObj: DetalleProductState = JSON.parse(detalleProducto);
                return (
                    <>
                        <div className='div-modal-active'>
                            <div className='div-modal-element'>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12"></div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className='div-style-form'>
                                            <div className='div-p-label-form'>
                                                <p className='p-label-form my-0'> {detalleProductoObj.product.nombre} </p>
                                                <FontAwesomeIcon icon={faTimesCircle} className='icon-cierra' onClick={() => funcionControl()} />
                                            </div>
                                            <hr />
                                            <div className='div-p-label-form'>
                                                <p className='m-0'>Unidades x canasta: </p>
                                                <p className='p-label-form my-0'> {detalleProductoObj.product.PxC} paquetes</p>
                                            </div>
                                            <div className='div-p-label-form'>
                                                <p className='m-0'>Valor x paquete: </p>
                                                <p className='p-label-form my-0'> $ {detalleProductoObj.product.valorPaquete}   </p>
                                            </div>
                                            <div className='div-p-label-form'>
                                                <p className='m-0'>Valor x canasta: </p>
                                                <p className='p-label-form my-0'> $ {detalleProductoObj.product.valorCanasta} </p>
                                            </div>
                                            <>
                                                <hr />                                               
                                                <div className='div-form'>
                                                    <p className='p-label-form'>Cantidad en Paquetes: </p>
                                                    <input type="text" className={cantidadError ? 'form-control form-control-error' : 'form-control'} value={cantidad} onChange={(e) => setCantidad(e.target.value)} placeholder='' autoComplete='off' />
                                                </div>
                                                <div className='div-buttom-registra'>
                                                    <button className='btn btn-primary bottom-custom' onClick={() => agregaACarrito()}>Agregar al carrito</button>
                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12"></div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            default:
                return (
                    <>
                        <div className='div-modal-active'>
                            <div className='div-modal-element'>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-2"></div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                                        <div className="div-style-form mx-3">
                                            <div className="div-modal-titulo-icono">
                                                <h3 className='titulo-form '>{modalInfo[indiceMensaje]?.titulo}</h3>
                                                <FontAwesomeIcon icon={modalInfo[indiceMensaje]?.icono} className={modalInfo[indiceMensaje]?.claseIcono} />
                                            </div>
                                            <p>
                                                {modalInfo[indiceMensaje]?.descripcion}
                                            </p>
                                            <div className='div-buttom-registra mt-4'>
                                                <button className='btn btn-secondary bottom-custom-secondary' onClick={() => funcionSi()} >Aceptar</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-2"></div>
                                </div>
                            </div>
                        </div>
                    </>
                )
        }
    }

    return (
        <>
            {
                validateRedirect()
            }
        </>
    )
}

export default ModalMensaje