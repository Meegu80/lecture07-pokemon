import {BrowserRouter, Route, Routes} from "react-router";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/:name" element={<Detail />}/>
                <Route path="/" element={<Home />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;