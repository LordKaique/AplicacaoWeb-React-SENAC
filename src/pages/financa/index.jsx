import './index.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Financas() {
    const [agendamentos, setAgendamentos] = useState([]);

    // Função para buscar agendamentos
    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/agendamentos');
                setAgendamentos(response.data); // Armazena os agendamentos no estado
            } catch (error) {
                console.error('Erro ao buscar agendamentos:', error);
            }
        };

        fetchAgendamentos();
    }, []);

    // Função para excluir agendamento
    const excluirAgendamento = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/agendamento/${id}`);
            // Atualiza o estado para remover o agendamento da lista local sem recarregar a página
            setAgendamentos((prevAgendamentos) => 
                prevAgendamentos.filter((agendamento) => agendamento.id !== id)
            );
        } catch (error) {
            console.error('Erro ao excluir agendamento:', error);
        }
    };

    return (
        <div className="pagina-financas pagina">
            <img src="/assets/images/Vegaslogo.PNG" alt="" />
            <Link to={'/adm'} className='linkCustomizado'>
                <i className="fa-solid fa-arrow-right-from-bracket">Voltar</i>
            </Link>

            <h1>Finanças</h1>
            <div className='Menus'>
                <div className='opcoesB'>
                    <Link to={'/adm'}><button id='StyleB'>Menu</button></Link>
                    <Link to={'/galeria'}><button id='StyleB'>Galeria</button></Link>
                    <Link to={'/depoimentos'}><button id='StyleB'>Depoimentos</button></Link>
                    <Link to={'/financas'}><button id='StyleB'>Finanças</button></Link>
                </div>

                <div className='minhaGaleria'>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Serviço</th>
                                <th>Número</th>
                                <th>Descrição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentos.length > 0 ? (
                                agendamentos.map((agendamento) => (
                                    <tr key={agendamento.id}>
                                        <td>{agendamento.NomeCliente}</td>
                                        <td>{agendamento.servico}</td>
                                        <td>{agendamento.numero}</td>
                                        <td>{agendamento.descricao}</td>
                                        <td>
                                            <button onClick={() => excluirAgendamento(agendamento.id)}>
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Nenhum agendamento encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
