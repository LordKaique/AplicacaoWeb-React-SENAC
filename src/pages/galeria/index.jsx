import './index.scss'
import { Link } from 'react-router-dom';


export default function MeusDados() {

    return (
        <div className="pagina-Dados pagina" >

            <img src="/assets/images/Vegaslogo.PNG" alt="" />
            <Link to={'/adm'} className='linkCustomizado'>
                <i class="fa-solid fa-arrow-right-from-bracket">Voltar</i>
            </Link>


            <h1>Meus Dados</h1>
            <div className='Menus' >

                <div className='opcoesB' >
                    <button id='StyleB' >Menu</button>
                    <button id='StyleB' >Galeria</button>
                    <button id='StyleB' >Depoimentos</button>
                    <button id='StyleB' >Serviços</button>
                </div>

                <div className='Dados' >
                    <p>Nome:</p><input id='areaDados' type="text" placeholder='' />
                    <button >Alterar</button>
                    <p>E-mail:</p><input id='areaDados' type="text" />
                    <button>Alterar</button>
                    <p>Endereço:</p><input id='areaDados' type="text" />
                    <button>Alterar</button>
                </div>

            </div>
        </div>
    )
}