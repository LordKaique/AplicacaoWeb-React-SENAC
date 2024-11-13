import './index.scss';
import { Link, useNavigate } from 'react-router-dom'; // Importando o useNavigate
import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`, 
        { email, password }
      );
      
      if (response.data.auth === true) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('token', response.data.token);

        navigate('/adm'); 
      }
      
      console.log(response.data); 
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <div className="pagina-login pagina">
      <img src="/assets/images/Vegaslogo.PNG" alt="logo" />

      <div className="PainelLogin">
        <h2>Email:</h2>
        <input
          type="text"
          placeholder="Digite seu email"
          value={email}
          onChange={handleChangeEmail}
        />

        <h2>Senha:</h2>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={handleChangePassword}
        />

        <div className="opcoesLogin">
          <Link to="/"><button>Voltar</button></Link>
          <button onClick={handleSubmit}>Login</button>
        </div>

        <p>Login apenas para Administradores</p>
      </div>
    </div>
  );
}
