import { ModalMensajeUtil } from './modalMensajeUtil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './modalMensaje.css'

const ModalMensaje = ({ funcionSi, indiceMensaje }) => {

    const { modalInfo } = ModalMensajeUtil();

    return (
        <div className='div-modal-active'>
            <div className='div-modal-element'>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-2"></div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                        <div className="div-style-form mx-3">
                            <div className="div-modal-titulo-icono">
                                <h3 className='titulo-form '>{modalInfo[indiceMensaje].titulo}</h3>
                                <FontAwesomeIcon icon={modalInfo[indiceMensaje].icono} className={modalInfo[indiceMensaje].claseIcono} />
                            </div>
                            <p>
                                {modalInfo[indiceMensaje].descripcion}
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
    )
}

export default ModalMensaje