import {BrowserRouter, Route, Routes} from "react-router";
import Detail from "./components/Detail.tsx";
import Home from "./components/Home.tsx";
import {Reset} from "styled-reset";

function App() {

    return (
        <BrowserRouter>
            <Reset />
            <Routes>
                <Route path="/detail/:id" element={<Detail />}/>
                <Route path="/" element={<Home />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;