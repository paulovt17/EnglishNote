import { Link } from 'react-router-dom';
import './index.scss';
import MenuFilme from '../../components/menuFilme';


function LandingFSA() {
  return (
    <div className="LandingFSA">
      <MenuFilme/>
      <header className = "titulo">
        <h1>Escolha entre filme serie ou anime:</h1>
        </header>
        <section className = 'principal'>
          <Link to={'/bb-PaginaFilmes'}><img src='/assets/images/filme.jpg' /></Link> 
          <Link to={'/bc-PaginaSeries'}><img src='/assets/images/serie.jpg' /></Link> 
          <Link to={'/bd-PaginaAnimes'}><img src='/assets/images/anime.jpg' /></Link> 
        </section>
    </div>
  );
}

export default LandingFSA;
