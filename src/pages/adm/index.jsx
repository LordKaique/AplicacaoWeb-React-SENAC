import './index.scss'
import { Link } from 'react-router-dom';

export default function Adm() {

    return (
        <div className="pagina-adm pagina" >

            <img src="/assets/images/VegasLogo.PNG" alt="logo" />
            <Link className='Link' to={'/login'} ><i class="fa-solid fa-arrow-right-from-bracket"></i>
            <p id='sair'>Sair</p>
            </Link>
            <div className='opcCima' >
                <Link className='Link' to={'/depoimentos'} >
                    <div id='painelTexto' >
                        <p>Editar Depoimentos</p>
                    </div>
                </Link>

                <Link className='Link' to={'/galeria'} >
                    <div id='painelTexto' >
                        <p>Editar Galeria</p>
                    </div>
                </Link>

                <Link className='Link'
                    to={'/data'} >
                    <div id='painelTexto' >
                        <p>Meus dados</p>
                    </div>
                </Link>

            </div>

            <div className='opcbaixo' >
                <Link className='Link' to={'/financas'} >
                    <div id='painelTexto' >
                        <p>Finanças</p>
                    </div>
                </Link>
            </div>

        </div>
    )
}