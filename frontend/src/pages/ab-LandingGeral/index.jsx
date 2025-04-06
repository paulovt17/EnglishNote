import { Link, useNavigate } from 'react-router-dom';
import './index.scss';

import { useEffect, useState } from 'react';


function LandingGeral() {

  const [token, setToken] = useState(null);
  const navigate = useNavigate();


  useEffect(()=>{
    let usu = localStorage.getItem('USUARIO')
    setToken(usu)

    if(usu == 'undefined' || !usu){
      navigate('/aa-LoginPage')
    }
  })

  async function sair(){
    localStorage.setItem('USUARIO', undefined)
    navigate('/aa-LoginPage')
  }


  return (
    <div className="LandingGeral">
      <i class="fa-solid fa-arrow-right-from-bracket" onClick={sair}></i>
      
      <header className='titulo'>
        <h1>Organize sua rotina...
        Escolha um dos tópicos:</h1>
      </header>
      <section className='principal'>
        <div className='FSA'>
          <Link to={'/ba-LandingFSA'} ><img src='/assets/images/filmes.jpg'/></Link>  
          <h2>FILMES</h2>
        </div>
        <div className='treino'>
          <Link to={'/ca-LandingTreino'}> <img src='/assets/images/atleta.jpg'/></Link>
          <h2>EXERCÍCIOS</h2>
        </div>
        <div className='english'>
          <Link to={'/da-LandingEnglish'}><img src='/assets/images/ingles.jpg'/></Link>
         <h2>INGLÊS</h2>
        </div>
        </section>
    </div>
  );
}

export default LandingGeral;
