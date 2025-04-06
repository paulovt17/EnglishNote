import { Link, useNavigate } from 'react-router-dom';
import './index.scss';
import { useState, useEffect } from 'react';
import MenuIngles from '../../components/menuIngles';


function LandingEnglish() {

  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(()=>{
    let usu = localStorage.getItem('USUARIO')
    setToken(usu)

    if(usu == undefined){
      navigate('/aa-LoginPage')
    }
  }, []);

  return (
    <div className="LandingEnglish">
  
     <MenuIngles/>
      
      <header className='titulo'>
        <h1>Learn English 
        Writing New Words!</h1>
      </header>
      <section className='principal'>
        <Link to={'/db-WordsPage'}><p>Words Page</p><img src='/assets/images/book.jpg'/></Link>
        <Link to={'/dc-MusicsPage'}><p>Musics Page</p><img src='/assets/images/guitar-image.jpg'/></Link>
      </section>
    </div>
  );
}

export default LandingEnglish;
