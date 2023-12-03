import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from '../pages/Login';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Players from '../pages/Players';
import Rankings from '../pages/Rankings';
import Facts from '../pages/Facts';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/players" element={<Players />}/>
                <Route path="/rankings" element={<Rankings />}/>
                <Route path="/facts" element={<Facts />}/>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;

// criar rotas para players e rankings!!!