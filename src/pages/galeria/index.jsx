import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.scss';

export default function MinhaGaleria() {
    const [galeria, setGaleria] = useState([]);

    const adicionarImagem = async (e) => {
        // Verificar se o número de imagens já atingiu o limite
        if (galeria.length >= 8) {
            alert('Você já atingiu o limite de 8 fotos na galeria.');
            return; // Impede o upload
        }

        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        try {
            await axios.post('http://4.172.208.52:3001/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            buscarGaleria(); // Atualiza a galeria
        } catch (error) {
            console.error('Erro ao fazer upload da imagem', error);
        }
    };

    const buscarGaleria = async () => {
        try {
            const response = await axios.get('http://4.172.208.52:3001/api/galeria');
            setGaleria(response.data);
        } catch (error) {
            console.error('Erro ao buscar as imagens', error);
        }
    };

    const excluirImagem = async (id) => {
        const confirmDelete = window.confirm('Tem certeza de que deseja excluir esta imagem?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://4.172.208.52:3001/api/excluir/${id}`);
                // Remove a imagem localmente sem precisar buscar novamente
                setGaleria((prevGaleria) => prevGaleria.filter(foto => foto.id !== id));
            } catch (error) {
                console.error('Erro ao excluir imagem', error);
            }
        }
    };

    useEffect(() => {
        buscarGaleria();
    }, []);

    return (
        <div className="pagina-Galeria pagina">
            <img src="/assets/images/Vegaslogo.PNG" alt="" />
            <Link to={'/adm'} className='linkCustomizado'>
                <i className="fa-solid fa-arrow-right-from-bracket">Voltar</i>
            </Link>

            <h1>Galeria</h1>
            <div className='Menus'>
                <div className='opcoesB'>


                    <Link to={'/adm'}><button id='StyleB'>Menu</button></Link>
                    <Link to={'/galeria'}><button id='StyleB'>Galeria</button></Link>
                    <Link to={'/depoimentos'}><button id='StyleB'>Depoimentos</button></Link>
                    <Link to={'/financas'}><button id='StyleB'>Finanças</button></Link>
                    
                    <input id='StyleB' 
                            type="file"
                            onChange={(e) => adicionarImagem(e)}
                            accept="image/*"
                        />
                </div>
 
                <div className='minhaGaleria'>
                 

                    {/* Exibir as imagens da galeria */}
                    {galeria.length === 0 ? (
                        <p>Não há imagens na galeria.</p>
                    ) : (
                        galeria.map((foto) => (
                            <div key={foto.id} id='GaleriaFotos'>
                                <img
                                    src={`http://4.172.208.52:3001${foto.caminho}`}
                                    alt={`Foto ${foto.id}`}
                                />
                                <button onClick={() => excluirImagem(foto.id)}>Excluir</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
