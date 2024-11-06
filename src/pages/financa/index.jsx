import './index.scss'
import { Link } from 'react-router-dom';


export default function Financas() {

    return (
        <div className="pagina-financas pagina" >

            <img src="/assets/images/Vegaslogo.PNG" alt="" />
            <Link to={'/adm'} className='linkCustomizado'>
                <i class="fa-solid fa-arrow-right-from-bracket">Voltar</i>
            </Link>


            <h1>Finanças</h1>
            <div className='Menus' >

                <div className='opcoesB' >
                    <Link to={'/adm'} ><button id='StyleB' >Menu</button></Link>
                    <Link to={'/galeria'} ><button id='StyleB' >Galeria</button></Link>
                    <Link to={'/depoimentos'} ><button id='StyleB' >Depoimentos</button></Link>
                    <Link to={'/financas'} ><button id='StyleB' >Finanças</button></Link>
                </div>

                <div className='minhaGaleria' >
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Serviço</th>
                                <th>Número</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>João Silva</td>
                                <td>Desenvolvimento Web</td>
                                <td>(11) 98765-4321</td>
                                <td>Desenvolvedor full-stack com experiência em React e Node.js.</td>
                            </tr>
                            <tr>
                                <td>Ana Santos</td>
                                <td>Design Gráfico</td>
                                <td>(11) 91234-5678</td>
                                <td>Especialista em criação de logotipos e identidade visual.</td>
                            </tr>
                        </tbody>
                    </table>




                </div>

            </div>
        </div>
    )
}