import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './pages/app/index';
import Login from './pages/login'
import NaoEncontrado from './pages/naoEncontrado';

import Adm from './pages/adm'
import MeusDados from './pages/meusDados';
import Galeria from './pages/galeria';
import Depoimentos from './pages/depoimentos';
import Financas from './pages/financa';
export default function Navegacao() {

    return (
        <BrowserRouter>
            <Routes>


                <Route path='/' element={<App />} />
                <Route path='/login' element={<Login />} />

                <Route path='/adm' element={< Adm />} />
                <Route path='/data' element={<MeusDados />} />
                <Route path='/galeria' element={<Galeria/>}/>
                <Route path='/depoimentos' element={<Depoimentos/>}/>
                <Route path='/financas' element={<Financas/>}/>
                <Route path='*' element={<NaoEncontrado />} />


<Route path='*' element={<NaoEncontrado/>}/>

            </Routes>
        </BrowserRouter>
    )
}