import React from 'react'
import { DashBoardProps} from '../interfaces/IAuthServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReplyAll } from '@fortawesome/free-solid-svg-icons'

const GestionOrdenes: React.FC<DashBoardProps> = ({ setRedirect, setCargando }) => {
  return (
    <>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
          <div className='div-co-bottom'>
            <h3 className='titulo-form'>Mis ordenes de pedido</h3>
            <button className='btn btn-link a-link-whit-icon' onClick={() => setRedirect('')} >
              <FontAwesomeIcon icon={faReplyAll} className='a-link-whit-icon' /> Volver
            </button>

          </div>

        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
          <div className='div-style-form'>
            DIV 1
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
          <div className='div-style-form'>
            DIV 2
          </div>
        </div>
      </div>
    </>
  )
}

export default GestionOrdenes