import React, { useState } from 'react'
import Dashboard from './dashboard'
import { Cargando } from '../loader/cargando';

const Transaccional = () => {

    const [cargando, setCargando] = useState(false);

    return (
        <>
            <Dashboard setCargando={setCargando} />
            {
                cargando ?
                    <Cargando />
                    :
                    <></>
            }
        </>

    )
}

export default Transaccional