import { BrowserRouter, Routes, Route } from 'react-router-dom';

//importação de paginas aqui
import App from './pages/app/index';
import Login from './pages/login'
import NaoEncontrado from './pages/naoEncontrado';
<<<<<<< HEAD
import Adm from './pages/adm'
import MeusDados from './pages/meusDados';
import Galeria from './pages/galeria';
import Depoimentos from './pages/depoimentos';
import Financas from './pages/financa';
export default function Navegacao() {
=======


export default function Navegacao(){
>>>>>>> 9caa881acf81a83b1972772f3c794af5f353948a
    return (
        <BrowserRouter>
            <Routes>


                <Route path='/' element={<App />} />
                <Route path='/login' element={<Login />} />
<<<<<<< HEAD
                <Route path='/adm' element={< Adm />} />
                <Route path='/data' element={<MeusDados />} />
                <Route path='/galeria' element={<Galeria/>}/>
                <Route path='/depoimentos' element={<Depoimentos/>}/>
                <Route path='/financas' element={<Financas/>}/>
                <Route path='*' element={<NaoEncontrado />} />
=======

<Route path='*' element={<NaoEncontrado/>}/>
>>>>>>> 9caa881acf81a83b1972772f3c794af5f353948a
            </Routes>
        </BrowserRouter>
    )
}