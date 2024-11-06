import './index.scss';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MeusDados() {
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        endereco: ''
    });

    // Função para buscar os dados do usuário
    useEffect(() => {
        const fetchUserData = async () => {
            const email = localStorage.getItem('userEmail');  // Recupera o e-mail do localStorage

            if (!email) {
                console.error('E-mail não encontrado no localStorage');
                return;  // Se não encontrar o e-mail no localStorage, você pode redirecionar para a página de login ou exibir uma mensagem
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user?email=${email}`);
                setUsuario(response.data);  // Preenche os campos com os dados do usuário
            } catch (error) {
                console.error('Erro ao obter dados do usuário:', error);
            }
        };

        fetchUserData();
    }, []);// O array vazio garante que isso só será chamado uma vez, quando o componente for montado

    // Função para lidar com a mudança de valor nos campos de input
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUsuario((prevState) => ({
            ...prevState,
            [id]: value // Atualiza o valor do campo baseado no id
        }));
    };

    // Função para enviar os dados alterados ao backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('userEmail'); // Recupera o e-mail do localStorage

        if (!email) {
            console.error('E-mail não encontrado no localStorage');
            return;
        }

        try {
            // Envia os dados atualizados para o backend
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/user`, {
                nome: usuario.nome,
                email: usuario.email,  // O e-mail não será alterado, apenas enviado como filtro
                endereco: usuario.endereco,
            });
            console.log('Dados atualizados:', response.data);
            // Adicione uma mensagem de sucesso ou redirecionamento, se necessário
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
        }
    };

    return (
        <div className="pagina-Dados pagina">
            <img src="/assets/images/Vegaslogo.PNG" alt="Logo" />

            <Link to={'/adm'} className='linkCustomizado'>
                <i className="fa-solid fa-arrow-right-from-bracket">Voltar</i>
            </Link>

            <h1>Meus Dados</h1>
            <div className='Menus'>
                <div className='opcoesB'>
                    <Link to={'/adm'}><button id='StyleB'>Menu</button></Link>
                    <Link to={'/galeria'}><button id='StyleB'>Galeria</button></Link>
                    <Link to={'/depoimentos'}><button id='StyleB'>Depoimentos</button></Link>
                    <Link to={'/financas'}><button id='StyleB'>Finanças</button></Link>
                </div>

                <div className='Dados'>
                    <form onSubmit={handleSubmit}>
                        <p>Nome:</p>
                        <input
                            id='nome'
                            type="text"
                            value={usuario.nome}
                            onChange={handleInputChange}
                            placeholder={usuario.nome} // Preenche o placeholder com o valor atual
                        />
                        <button type="submit">Alterar</button>

                        <p>E-mail:</p>
                        <input
                            id="email"
                            type="text"
                            value={usuario.email}
                            onChange={handleInputChange}
                            placeholder="E-mail" // Preenche o placeholder com o valor atual
                        />
                        <button type="submit">Alterar</button>

                        <p>Endereço:</p>
                        <input
                            id='endereco'
                            type="text"
                            value={usuario.endereco}
                            onChange={handleInputChange}
                            placeholder={usuario.endereco} // Preenche o placeholder com o valor atual
                        />
                        <button type="submit">Alterar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
