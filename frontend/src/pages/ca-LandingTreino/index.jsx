import { Link } from 'react-router-dom';
import './index.scss';


function LandingTreino() {
  return (
    <div className="LandingTreino">
      <img className='icone-menu' src='/assets/images/Menu 28.png'/>
     <header className='titulo'>
      <h1>Vamos lá!
      Seu treino diario o aguarda...</h1>
     </header>
     <section className='principal'>
     <Link to={'/cb-TreinoHoje'}><img className='relogio' src='/assets/images/relogio.png'/><img className='correndo' src='/assets/images/homem-correndo.jpg'/></Link>
     <Link to={'/cc-Treinos'}><img className='treinando' src='/assets/images/homem-treinando.jpg'/></Link>
     </section>
    </div>
  );
}

export default LandingTreino;
