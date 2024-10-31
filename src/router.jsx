import { BrowserRouter, Routes, Route } from 'react-router-dom';

//importação de paginas aqui
import App from './pages/app/index';
import Login from './pages/login'
import NaoEncontrado from './pages/naoEncontrado';
import Adm from './pages/adm'
import MeusDados from './pages/meusDados'
export default function Navegacao() {
    return (
        <BrowserRouter>
            <Routes>


                <Route path='/' element={<App />} />
                <Route path='/login' element={<Login />} />
                <Route path='/adm' element={< Adm />} />
                <Route path='/data' element={<MeusDados />} />
                <Route path='*' element={<NaoEncontrado />} />
            </Routes>
        </BrowserRouter>
    )
}