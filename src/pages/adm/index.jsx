import './index.scss'
import { Link } from 'react-router-dom';

export default function Adm() {

    return (
        <div className="pagina-adm pagina" >

<img src="/assets/images/VegasLogo.PNG" alt="logo" />
<i  class="fa-solid fa-arrow-right-from-bracket"></i>
<p id='sair'>Sair</p>

<div className='opcCima' >

<div id='painelTexto' >
<p>Editar Depoimentos</p>
</div>

<div id='painelTexto' >
<p>Editar Galeria</p>
</div>

<Link className='Link'
to={'/data'} > 
<div id='painelTexto' >
<p>Meus dados</p>
</div>
</Link>

</div>

<div className='opcbaixo' >

<div id='painelTexto' >
<p>Finanças</p>
</div>

</div>




        </div>
    )
}