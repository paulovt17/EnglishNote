
import { Link } from 'react-router-dom';
import './index.scss';
import { useState } from 'react';



export default function MenuIngles() {

  const [openned, setOpenned] = useState(false)

  function abrir(){
    setOpenned(true)
  }

  function fechar(){
    setOpenned(false)
  }

  return (
    <div className="MenuEnglish">
      {openned === false ? (
        <img className='icone-menu' src='/assets/images/Menu 28.png' onClick={abrir}/>
        ) : (
          <div className='menu'   >
            <img className='bar' src='/assets/images/Menu 28.png' onClick={fechar} />
            <Link to={'/da-LandingEnglish'}><i id='home' class="fa-solid fa-house-chimney"></i></Link>
            <Link to={'/db-WordsPage'}><i id='home' class="fa-solid fa-eye"></i></Link>
            <Link to={'/dd-NewWordPage'}><i id='home' class="fa-solid fa-plus"></i></Link>
            <Link to={'/'}><i id='home' class="fa-solid fa-arrow-right-from-bracket"></i></Link>
            </div> 
        )}
      
    
    </div>
  );
}

