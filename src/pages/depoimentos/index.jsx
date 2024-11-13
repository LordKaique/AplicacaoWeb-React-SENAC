import { useState, useEffect } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Depoimentos() {
  const [depoimentos, setDepoimentos] = useState([
    { id: 1, NomeDepoimento: '', comentario: '' },
    { id: 2, NomeDepoimento: '', comentario: '' },
    { id: 3, NomeDepoimento: '', comentario: '' },
    { id: 4, NomeDepoimento: '', comentario: '' }
  ]);

  // Função para buscar os depoimentos do banco de dados
  const buscarDepoimentos = async () => {
    try {
      const response = await axios.get('http://4.172.208.52:3001/api/depoimentos');
      setDepoimentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar depoimentos', error);
    }
  };

  // Função para atualizar o depoimento no banco de dados
  const alterarDepoimento = async (id, nome, comentario) => {
    try {
      // Garante que estamos passando os valores corretos
      await axios.put('http://4.172.208.52:3001/api/depoimentos', {
        id,
        NomeDepoimento: nome,
        comentario
      });
      buscarDepoimentos(); // Atualiza a lista de depoimentos após a alteração
    } catch (error) {
      console.error('Erro ao alterar depoimento', error);
    }
  };

  useEffect(() => {
    buscarDepoimentos(); // Busca os depoimentos quando o componente for montado
  }, []);

  return (
    <div className="pagina-Depoimentos pagina">
      <img src="/assets/images/Vegaslogo.PNG" alt="" />
      <Link to={'/adm'} className='linkCustomizado'>
        <i className="fa-solid fa-arrow-right-from-bracket">Voltar</i>
      </Link>

      <h1>Depoimentos</h1>
      <div className='Menus'>
        <div className='opcoesB'>
          <Link to={'/adm'}><button id='StyleB'>Menu</button></Link>
          <Link to={'/galeria'}><button id='StyleB'>Galeria</button></Link>
          <Link to={'/depoimentos'}><button id='StyleB'>Depoimentos</button></Link>
          <Link to={'/financas'}><button id='StyleB'>Finanças</button></Link>
        </div>

        <div className='minhaGaleria'>
          {depoimentos.map(depoimento => (
            <div key={depoimento.id} id='AreaComentario'>
              <p>Nome:</p>
              <input 
                type="text" 
                placeholder={depoimento.NomeDepoimento || 'Nome Atual'} 
                onChange={(e) => {
                  const updatedDepoimentos = depoimentos.map(item =>
                    item.id === depoimento.id ? { ...item, NomeDepoimento: e.target.value } : item
                  );
                  setDepoimentos(updatedDepoimentos);
                }} 
              />
              <p>Comentário:</p>
              <textarea 
                placeholder={depoimento.comentario || 'Comentário Atual'}
                onChange={(e) => {
                  const updatedDepoimentos = depoimentos.map(item =>
                    item.id === depoimento.id ? { ...item, comentario: e.target.value } : item
                  );
                  setDepoimentos(updatedDepoimentos);
                }}
              />
              <button onClick={() => alterarDepoimento(depoimento.id, depoimento.NomeDepoimento, depoimento.comentario)}>Alterar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
