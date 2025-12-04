import {BrowserRouter, Route, Routes} from "react-router";
import Detail from "./components/Detail.tsx";
import Home from "./components/Home.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/detail/:id" element={<Detail />}/>
                <Route path="/" element={<Home />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;