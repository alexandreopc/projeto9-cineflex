import { BrowserRouter, Routes, Route } from "react-router-dom";

import TelaPricipal from "../TelaPricipal";

function App() {
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TelaPricipal />} />
                
            </Routes>
        </BrowserRouter>

        </>
    );
}
export default App;