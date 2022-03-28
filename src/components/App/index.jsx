import { BrowserRouter, Routes, Route } from "react-router-dom";

import TelaPricipal from "../TelaPricipal";
import Sessoes from "../Sessoes";
import Assento from "../Assentos";
import Sucesso from "../Sucesso/";

function App() {
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TelaPricipal />} />
                <Route path="/sessoes/:idFilme" element={<Sessoes />} />
                <Route path="/assentos/:idSessao" element={<Assento />} />
                <Route path="/sucesso" element={<Sucesso />} />
            </Routes>
        </BrowserRouter>

        </>
    );
}
export default App;