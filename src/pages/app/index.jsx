import './index.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  const [images, setImages] = useState([]);
  const [depoimentos, setDepoimentos] = useState([]);


  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [servico, setServico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [message, setMessage] = useState('');

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };


  useEffect(() => {
    // Função para buscar as imagens do banco de dados
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://4.172.208.52:3001/api/galeria');
        setImages(shuffleArray(response.data)); // Embaralha as imagens antes de armazenar
      } catch (error) {
        console.error('Erro ao buscar as imagens:', error);
      }
    };

    // Função para buscar os depoimentos do banco de dados
    const fetchDepoimentos = async () => {
      try {
        const response = await axios.get('http://4.172.208.52:3001/api/depoimentos');
        setDepoimentos(response.data); // Armazena os depoimentos
      } catch (error) {
        console.error('Erro ao buscar os depoimentos:', error);
      }
    };

    fetchImages();
    fetchDepoimentos();
  }, []);

  // Função para embaralhar o array de imagens
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  //função para fazer os agendamentos
  const handleAgendar = async () => {
    try {
      const response = await axios.post('http://4.172.208.52:3001/api/agendar', {
        NomeCliente: nome,
        numero: numero,
        servico: servico,
        descricao: descricao,
      });
  
      setMessage(response.data.message);
      alert("Agendamento concluído com sucesso!"); // Exibe o alerta após o agendamento
  
      // Limpa os campos do formulário após o envio
      setNome('');
      setNumero('');
      setServico('');
      setDescricao('');
    } catch (error) {
      console.error('Erro ao agendar serviço:', error);
      setMessage('Erro ao agendar serviço');
    }
  };
  


  return (
    <div className="App">
      <header>
        <img id="logo" src="/assets/images/Vegaslogo.PNG" alt="logo" />
        <div className="hamburger" onClick={toggleMenu}>
          <i className="fa fa-bars"></i>
        </div>

        <nav className={menuVisible ? 'show-menu' : ''}>

          <a href="#secaoHome">Home</a>
          <a href="#tituloSecao2">Sobre</a>
          <a href="#tituloSecao3">Galeria</a>
          <a href="#titulosecao4">Serviços</a>
          <a href="#tituloDepoimentos">Depoimentos</a>
          <a href="#titulo5">Agendar</a>

        </nav>

        <Link to="/login">
          <i className="fa-solid fa-gear"></i>
        </Link>
      </header>

      <section className='secaoHome' >

        <div className='esquerdaHome'>
          <img src="assets/images/retratoTexto.png" alt="logo" />
          <h1 id="titulo1">Bem-vindo ao Estúdio VEGAS <br /> de
            Tatuagem e Reconstrução
          </h1>
          <p id='text1' >Aqui, contamos com os melhores artistas  e aplicamos as técnicas mais avançadas para garantir que sua tatuagem seja perfeita. Confira nosso trabalho e descubra o compromisso com a arte e a qualidade que você merece. </p>
        </div>

        <div className='direitaHome'>
          <img id='studio' src="assets/images/image1_0.jpg" alt="Estudio" />
        </div>
      </section>

      <h1 id="tituloSecao2" >Sobre o Artista</h1>

      <section className='secaoSobre' >

        <div className='esquerdaSobre'>
          <img id='artista' src="assets/images/artista.jpg" alt="Estudio" />

        </div>

        <div className='direitaSobre'>
          <img src="assets/images/retratoTexto.png" alt="" />
          <p id='text1' >Se você está em busca de uma tatuagem única, que reflita sua personalidade e estilo, Josélito é a escolha perfeita! Com anos de experiência, ele domina desde traços finos e detalhados até desenhos ousados e cheios de cor. Suas criações são verdadeiras obras de arte na pele, sempre feitas com cuidado, precisão e técnicas inovadoras.</p>

        </div>
      </section>

      <section className='secaoGaleria'  >
        <h1 id='tituloSecao3' >GALERIA DE ARTE</h1>

        <div className='CaixadeImages'>
          {images.slice(0, 8).map((image, index) => (
            <img
              key={index}
              id='GaleriaImg'
              src={image.caminho} // Certifique-se de que "caminho" seja o campo correto
              alt={`Imagem ${index + 1}`}
            />
          ))
          }
        </div>
      </section>

      <section className='secaoServico' >

        <h1 id='titulosecao4' >Serviços</h1>

        <div className='caixaServicos' >
          <img id='servicosImg' src="/assets/images/tatto-Servico1.jpg" alt="servico1" />
          <img id='servicosImg' src="/assets/images/servico2.jpg" alt="servico2" />
          <img id='servicosImg' src="/assets/images/servico3.jpg" alt="servico3" />
        </div>
        <div id='textService'>
          <h2>Tatuagem</h2>
          <h2>Cobertura</h2>
          <h2>Pircing</h2>
        </div>
      </section>

      <section className='secaoDepoimentos'>
  <h1 id='tituloDepoimentos'>Depoimentos</h1>

<div className='caixaDepoimentos'>
  {depoimentos.length > 0 ? (
    depoimentos.map((depoimento, index) => (
      <div id='Depoimento' key={index}>
        <h2 id='Name'>{depoimento.NomeDepoimento ? depoimento.NomeDepoimento : "Nome não disponível"}</h2>
        <p id='coment'>{depoimento.comentario}</p>
      </div>
    ))
  ) : (
    <p>Carregando depoimentos...</p>
  )}
</div>
</section>



<section className='secaoAgenda'>
      <h1 id='titulo5'>Agendar Serviço</h1>
      <h2>Agendar um Serviço</h2>

      <div id='FormularioServicos'>
        <div id='opc'>
          <p id='formText'>Nome:</p>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <p id='formText'>Serviço:</p>
          <input
            type="text"
            value={servico}
            onChange={(e) => setServico(e.target.value)}
          />
          <button onClick={handleAgendar}>Agendar</button>
        </div>

        <div id='opc'>
          <p id='formText'>Seu Numero:</p>
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
          <p id='formText'>Descrição:</p>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <p id='formText'>Entre em contato pelo E-mail:Vegastatto@tatto.com</p>
        </div>
      </div>

      {message && <p>{message}</p>}
    </section>


      <section className='secaoRedes' >
        <h1 id='titulo6'>Redes Sociais</h1>

        <div>

          <p><i class="fa-brands fa-facebook"></i> @Vegas.studio</p>
          <p><i class="fa-brands fa-instagram"></i> @Vegas.Tatuagem</p>
          <p><i class="fa-brands fa-youtube"></i> Vegas Films</p>

        </div>

      </section>

      <footer>
        <img id='logoF' src="/assets/images/Vegaslogo.PNG" alt="logo" />
        <p>Rua peroba, 958, PQ. São Miguel <br />
          CEP:02556-680 <br />
          Prox, Assemblia de Deus</p>
        <img id='rua' src="/assets/images/Rua.PNG" alt="" />
      </footer>
    </div>
  );
}
