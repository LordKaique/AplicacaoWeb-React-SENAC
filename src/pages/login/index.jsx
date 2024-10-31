import './index.scss'
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className="pagina-login pagina" >


            <img src="/assets/images/Vegaslogo.PNG" alt="logo" />

            <div className='PainelLogin'>
            <h2>Usuário:</h2>
            <input type="text" placeholder='Digite seu usuário' />
            <h2>Senha:</h2>
            <input type="password" placeholder='Digite sua senha'/>

            <div id='opcoesLogin'>
                <Link to="/" ><button>Voltar</button></Link>
                <Link to="/adm" ><button>Login</button></Link>
            </div>

            <p>Login apenas para Administradores</p>
        </div>


        </div>
    )
}