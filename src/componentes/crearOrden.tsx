import React from 'react'
import { DashBoardProps } from '../interfaces/IAuthServices'
import construccionSoft from '../img/construccionSoftware.jpg'

const CrearOrden: React.FC<DashBoardProps> = ({ setCargando }) => {

    return (
        <>
            <div className='div-style-form'>
                <h3 className='titulo-form'>Mi cuenta **en construcción**</h3>
                <div>
                    <img className='card-img' src={construccionSoft} style={{objectFit: 'contain'}}  alt=''></img>
                </div>
            </div>
        </>
    )
}

export default CrearOrden