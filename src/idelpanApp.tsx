import { BrowserRouter, Route, Routes } from "react-router-dom"
import Autenticacion from "./componentes/autenticacion"
import Transaccional from "./componentes/transaccional"
import TransaccionalAdmin from "./componentes/transaccionalAdmin"

const IdelpanApp = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Autenticacion />}></Route>
                    <Route path="publicZone" element={<Autenticacion />} />
                    <Route path="clientes" element={<Transaccional />} />
                    <Route path="admin" element={<TransaccionalAdmin />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default IdelpanApp