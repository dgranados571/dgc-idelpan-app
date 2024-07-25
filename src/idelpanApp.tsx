import { BrowserRouter, Route, Routes } from "react-router-dom"
import Autenticacion from "./componentes/autenticacion"
import Dashboard from "./componentes/dashboard"
import Transaccional from "./componentes/transaccional"

const IdelpanApp = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Autenticacion />}></Route>
                    <Route path="publicZone" element={<Autenticacion />} />
                    <Route path="privateZone" element={<Transaccional />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default IdelpanApp