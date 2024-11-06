import './index.scss'
import { Link } from 'react-router-dom';


export default function MinhaGaleria() {

    return (
        <div className="pagina-Galeria pagina" >

            <img src="/assets/images/Vegaslogo.PNG" alt="" />
            <Link to={'/adm'} className='linkCustomizado'>
                <i class="fa-solid fa-arrow-right-from-bracket">Voltar</i>
            </Link>


            <h1>Galeria</h1>
            <div className='Menus' >

                <div className='opcoesB' >
                    <Link to={'/adm'} ><button id='StyleB' >Menu</button></Link>
                    <Link to={'/galeria'} ><button id='StyleB' >Galeria</button></Link>
                    <Link to={'/depoimentos'} ><button id='StyleB' >Depoimentos</button></Link>
                    <Link to={'/financas'} ><button id='StyleB' >Finanças</button></Link>
                </div>

                <div className='minhaGaleria' >
                    <div id='GaleriaFotos'>
                        <img src="/assets/images/servico2.jpg" alt="" />
                        <button>Adicionar</button>
                        <button>excluir</button>
                    </div>

                    <div id='GaleriaFotos'>
                        <img src="/assets/images/servico2.jpg" alt="" />
                        <button>Adicionar</button>
                        <button>excluir</button>
                    </div>

                    <div id='GaleriaFotos'>
                        <img src="/assets/images/servico2.jpg" alt="" />
                        <button>Adicionar</button>
                        <button>excluir</button>
                    </div>

                    <div id='GaleriaFotos'>
                        <img src="/assets/images/servico2.jpg" alt="" />
                        <button>Adicionar</button>
                        <button>excluir</button>
                    </div>

                    <div id='GaleriaFotos'>
                        <img src="/assets/images/servico2.jpg" alt="" />
                        <button>Adicionar</button>
                        <button>excluir</button>
                    </div>

                    <div id='GaleriaFotos'>
                        <img src="/assets/images/servico2.jpg" alt="" />
                        <button>Adicionar</button>
                        <button>excluir</button>
                    </div>
                    
                    <div id='GaleriaFotos'>
                        <img src="/assets/images/servico2.jpg" alt="" />
                        <button>Adicionar</button>
                        <button>excluir</button>
                    </div>

                    <div id='GaleriaFotos'>
                        <img src="/assets/images/servico2.jpg" alt="" />
                        <button>Adicionar</button>
                        <button>excluir</button>
                    </div>


                </div>

            </div>
        </div>
    )
}