import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './pages/app/index';
import Login from './pages/login';
import NaoEncontrado from './pages/naoEncontrado';

import Adm from './pages/adm';
import MeusDados from './pages/meusDados';
import Galeria from './pages/galeria';
import Depoimentos from './pages/depoimentos';
import Financas from './pages/financa';

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function Navegacao() {
    const ProtectedRoute = () => {
        const token = localStorage.getItem('token');  // Verifica se existe um token no localStorage
      
        // Se o token não existir, redireciona para a página de login
        return token ? <Outlet /> : <Navigate to="/login" />;
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas públicas */}
                <Route path='/' element={<App />} />
                <Route path='/login' element={<Login />} />

                {/* Rotas protegidas */}
                <Route element={<ProtectedRoute />}>
                    <Route path='/adm' element={<Adm />} />
                    <Route path='/data' element={<MeusDados />} />
                    <Route path='/galeria' element={<Galeria />} />
                    <Route path='/depoimentos' element={<Depoimentos />} />
                    <Route path='/financas' element={<Financas />} />
                </Route>

                {/* Página 404 */}
                <Route path='*' element={<NaoEncontrado />} />
            </Routes>
        </BrowserRouter>
    );
}
