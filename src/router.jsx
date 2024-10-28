import { BrowserRouter, Routes, Route } from 'react-router-dom';

//importação de paginas aqui
import App from './pages/app/index';
import Login from './pages/login'
import NaoEncontrado from './pages/naoEncontrado';


export default function Navegacao(){
    return (
        <BrowserRouter>
            <Routes>


                <Route path='/' element={<App />} />
                <Route path='/login' element={<Login />} />

<Route path='*' element={<NaoEncontrado/>}/>
            </Routes>
        </BrowserRouter>
    )
}