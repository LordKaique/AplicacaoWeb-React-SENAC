import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.scss';

export default function MinhaGaleria() {
    const [imagens, setImagens] = useState(Array(7).fill(null)); 
    const [galeria, setGaleria] = useState([]); 

    const adicionarImagem = async (e, index) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        try {
            const response = await axios.post('http://localhost:3001/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const novasImagens = [...imagens];
            novasImagens[index] = response.data.imagePath;
            setImagens(novasImagens);
        } catch (error) {
            console.error('Erro ao fazer upload da imagem', error);
        }
    };

    const buscarGaleria = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/galeria');
            setGaleria(response.data);
        } catch (error) {
            console.error('Erro ao buscar as imagens', error);
        }
    };

    const excluirImagem = async (id) => {
        const confirmDelete = window.prompt('Digite o ID da imagem para excluir:');
        if (confirmDelete && confirmDelete === id.toString()) {
            try {
                await axios.delete(`http://localhost:3001/api/excluir/${id}`);
                buscarGaleria();
            } catch (error) {
                console.error('Erro ao excluir imagem', error);
            }
        } else {
            alert('ID inválido ou cancelado');
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
                </div>

                <div className='minhaGaleria'>
                    {imagens.map((imagem, index) => (
                        <div key={index} id='GaleriaFotos'>
                            <img
                                src={imagem || '/assets/images/default-image.png'}
                                alt={`Foto ${index + 1}`}
                            />
                            <input
                                type="file"
                                onChange={(e) => adicionarImagem(e, index)}
                                accept="image/*"
                            />
                            <button onClick={() => excluirImagem(index)}>Excluir</button>
                        </div>
                    ))}

                    {galeria.map((foto, index) => (
                        <div key={index} id='GaleriaFotos'>
                            <img
                                src={`http://localhost:3001${foto.caminho}`}
                                alt={`Foto ${index + 1}`}
                            />
                            <button onClick={() => excluirImagem(foto.id)}>Excluir</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
