import { Link, useNavigate } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';
import MenuIngles from '../../components/menuIngles';
import axios from 'axios';


function VerbalTense() {

  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  // Verifica se o usuário está autenticado
  useEffect(() => {
    let usu = localStorage.getItem('USUARIO');
    setToken(usu);

    if (usu === undefined) {
      navigate('/aa-LoginPage');
    }
  }, [navigate]);



  return (
    <div className="VerbalTense">
      <MenuIngles />
     
           <header className="titulo">
             
           </header>
     
           <section className="pesquisar">
           
           </section>
     
           <section className="principal">
            
           </section>
     
           <Link to={'/de-NewMusicPage'}><img className="addCircle" src="/assets/images/Plus circle.png" /></Link>
     
    </div>
  );
}

export default VerbalTense;
