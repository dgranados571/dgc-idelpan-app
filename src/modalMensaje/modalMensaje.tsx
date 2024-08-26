import { ModalMensajeUtil } from './modalMensajeUtil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { DetalleProductState, IinfoDetalleInventario, IinfoDetalleInventarioObj, IinfoDetalleOp, ModalProps } from '../interfaces/IAuthServices';
import './modalMensaje.css'
import { useEffect, useState } from 'react';
import productosUtil from '../util/productosUtil';

const ModalMensaje: React.FC<ModalProps> = ({ indiceMensaje, funcionSi, funcionControl }) => {

    const { modalInfo } = ModalMensajeUtil();

    const { productosDetalle } = productosUtil();

    const modoPagos = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'EFECTIVO', label: 'Efectivo' },
        { value: 'CREDITO', label: 'Crédito' }
    ]

    const [cantidad, setCantidad] = useState('');
    const [cantidadError, setCantidadError] = useState(false);

    const [modoPago, setModoPago] = useState('INITIAL')
    const [modoPagoError, setModoPagoError] = useState(false)

    useEffect(() => {
        console.log('Modal Info --> ', modalInfo[indiceMensaje])
    }, [])

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

    const enviarDeAlta = () => {
        setModoPagoError(false)
        if (cantidad) {
            setModoPagoError(true)
        } else {
            sessionStorage.setItem('modoPago', modoPago);
            funcionSi();
        }
    }

    const registrarInventario = () => {
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
            case 'DAR_DE_ALTA_OP':
                const infoDetalleOp = sessionStorage.getItem('infoDetalleOp') || 'Error';
                const infoDetalleOpObj: IinfoDetalleOp = JSON.parse(infoDetalleOp);
                return (
                    <>
                        <div className='div-modal-active'>
                            <div className='div-modal-element'>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12"></div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className='div-style-form'>
                                            <div className='div-p-label-form'>
                                                <p className='p-label-form my-0'>Alistar pedido {infoDetalleOpObj.idDetalleOp}</p>
                                                <FontAwesomeIcon icon={faTimesCircle} className='icon-cierra' onClick={() => funcionControl()} />
                                            </div>
                                            <hr />
                                            <p className='p-label-form my-0'>Para iniciar el alistamiento del pedido es requerido indicar el modo de pago:</p>
                                            <div className='div-form'>
                                                <p className='p-label-form'>Modo de pago: </p>
                                                <select className={modoPagoError ? 'form-control form-control-error' : 'form-control'} value={modoPago} onChange={(e) => setModoPago(e.target.value)}  >
                                                    {
                                                        modoPagos.map((key, i) => {
                                                            return (
                                                                <option key={i} value={key.value}>{key.label}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className='div-buttom-registra'>
                                                <button className='btn btn-primary bottom-custom' onClick={() => enviarDeAlta()}>Enviar</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12"></div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'CARGAR_INVENTARIO':
                const productoInvetario = sessionStorage.getItem('infoProdutoInvetario') || 'Error';
                const productoInvetarioObj: DetalleProductState = JSON.parse(productoInvetario);
                return (
                    <>
                        <div className='div-modal-active'>
                            <div className='div-modal-element'>
                                <div className='div-style-form'>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12"></div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className='div-p-label-form'>
                                                <p className='p-label-form my-0'>Cargar al invetario:</p>
                                                <p className='p-label-form my-0'> {productoInvetarioObj.product.nombre} </p>
                                                <FontAwesomeIcon icon={faTimesCircle} className='icon-cierra' onClick={() => funcionControl()} />
                                            </div>
                                            <hr />
                                            <div className='div-p-label-form'>
                                                <p className='m-0'>Unidades x canasta: </p>
                                                <p className='p-label-form my-0'> {productoInvetarioObj.product.PxC} paquetes</p>
                                            </div>
                                            <hr />
                                            <div className='div-form'>
                                                <p className='p-label-form'>Cantidad en Paquetes: </p>
                                                <input type="text" className={cantidadError ? 'form-control form-control-error' : 'form-control'} value={cantidad} onChange={(e) => setCantidad(e.target.value)} placeholder='' autoComplete='off' />
                                            </div>
                                            <div className='div-buttom-registra-inventario'>
                                                <button className='btn btn-primary bottom-custom' onClick={() => { registrarInventario() }}>Cargar producto</button>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'DETALLE_INVENTARIO':
                const detallleInventario = sessionStorage.getItem('infoDetalleInventario') || 'Error';
                const detallleInventarioObj: IinfoDetalleInventarioObj = JSON.parse(detallleInventario);
                const nombrePoducto = productosDetalle[detallleInventarioObj.idProduct].nombre
                return (
                    <>
                        <div className='div-modal-active'>
                            <div className='div-modal-element'>
                                <div className='div-style-form'>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12"></div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className='div-p-label-form'>
                                                <p className='p-label-form my-0'>Detalle Inventario:</p>
                                                <p className='p-label-form my-0'>  {nombrePoducto} </p>
                                                <FontAwesomeIcon icon={faTimesCircle} className='icon-cierra' onClick={() => funcionControl()} />
                                            </div>
                                            <hr />
                                            <div className=''>
                                                <div className=''>
                                                    <div className='div-item-produto'>
                                                        <div className='div-header-list-op-1 margin-control-1'>
                                                            <p className='p-label-form my-0'>Fecha</p>
                                                        </div>
                                                        <div className='div-header-list-op-1 margin-control-1'>
                                                            <p className='p-label-form my-0'>Operación</p>
                                                        </div>
                                                        <div className='div-header-list-op-2'>
                                                            <p className='p-label-form my-0'>Cantidad</p>
                                                        </div>
                                                    </div>
                                                    {
                                                        Object.entries(detallleInventarioObj.listEventos).map(([key, eventos]) => {
                                                            return (
                                                                <>
                                                                    <div key={key} className='div-item-produto'>
                                                                        <div className='div-header-list-op-1 margin-control-1'>
                                                                            <p className='m-0'>{eventos.fechaRegistroStr} {eventos.horaStr} </p>
                                                                        </div>
                                                                        <div className='div-header-list-op-1 margin-control-1'>
                                                                            <p className='m-0'> {eventos.operacion} </p>
                                                                        </div>
                                                                        <div className='div-header-list-op-2'>
                                                                            <p className='m-0'> {eventos.cantidad}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className='div-buttom-registra-inventario'>
                                                <button className='btn btn-primary bottom-custom' onClick={() => { funcionControl() }}>Aceptar</button>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12"></div>
                                    </div>
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