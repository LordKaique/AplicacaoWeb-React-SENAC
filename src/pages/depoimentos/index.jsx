import './index.scss'
import { Link } from 'react-router-dom';


export default function Depoimentos() {

    return (
        <div className="pagina-Depoimentos pagina" >

            <img src="/assets/images/Vegaslogo.PNG" alt="" />
            <Link to={'/adm'} className='linkCustomizado'>
                <i class="fa-solid fa-arrow-right-from-bracket">Voltar</i>
            </Link>


            <h1>Depoimentos</h1>
            <div className='Menus' >

                <div className='opcoesB' >
                    <Link to={'/adm'} ><button id='StyleB' >Menu</button></Link>
                    <Link to={'/galeria'} ><button id='StyleB' >Galeria</button></Link>
                    <Link to={'/depoimentos'} ><button id='StyleB' >Depoimentos</button></Link>
                    <Link to={'/financas'} ><button id='StyleB' >Finanças</button></Link>

                </div>

                <div className='minhaGaleria' >
<div id='AreaComentario'>
<p>Nome:</p>
<input type="text" placeholder='Nome Atual'/>
<p>Comentario:</p>
<textarea name="comentario" id="coment1" placeholder='comentario atual'></textarea>
<button>Alterar</button>
</div>

<div id='AreaComentario'>
<p>Nome:</p>
<input type="text" placeholder='Nome Atual'/>
<p>Comentario:</p>
<textarea name="comentario" id="coment1" placeholder='comentario atual'></textarea>
<button>Alterar</button>
</div>

<div id='AreaComentario'>
<p>Nome:</p>
<input type="text" placeholder='Nome Atual'/>
<p>Comentario:</p>
<textarea name="comentario" id="coment1" placeholder='comentario atual'></textarea>
<button>Alterar</button>
</div>

<div id='AreaComentario'>
<p>Nome:</p>
<input type="text" placeholder='Nome Atual'/>
<p>Comentario:</p>
<textarea name="comentario" id="coment1" placeholder='comentario atual'></textarea>
<button>Alterar</button>
</div>

                </div>

            </div>
        </div>
    )
}