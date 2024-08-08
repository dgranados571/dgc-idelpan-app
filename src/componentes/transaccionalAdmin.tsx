import { useState } from 'react'
import DashboardAdmin from './dashboardAdmin'
import { Cargando } from '../loader/cargando';

const TransaccionalAdmin = () => {

  const [cargando, setCargando] = useState(false);

  return (
    <>
      <DashboardAdmin setCargando={setCargando} />
      {
        cargando ?
          <Cargando />
          :
          <></>
      }
    </>
  )
}

export default TransaccionalAdmin