
import { Link } from 'react-router-dom';
import './index.scss';
import { useState } from 'react';
import axios from 'axios'



export default function CardsWords(props) {

  let [token, setToken]=useState(localStorage.getItem('USUARIO'))
  

  async function excluir() {
    await axios.delete(`http://localhost:2311/words/deletar/${props.item.id_word}?x-access-token=${token}`)
    
  }

  let [openned, setOpenned] = useState(false)

  function abrir(){
    setOpenned(true)
  }

  function fechar(){
    setOpenned(false)
  }

  return (
    <div className="words">
     <div className='word'>
        <p id='um'>{props.item.word}</p>
        <p id='dois'>{props.item.translation}</p>
        <p id='tres'>{props.item.phrase}</p>
        {openned == false ? (
            <div className='icones'>
            <i id='doisponto' class="fa-solid fa-ellipsis-vertical" onClick={abrir}></i>
            </div>
            ) : (
                <div className='icones'>
           <i id='doisponto' class="fa-solid fa-ellipsis-vertical" onClick={fechar}></i>
            <div className='change'>
            <i id='icon' class="fa-solid fa-trash-can" onClick={excluir}></i>
            <i id='icon' class="fa-solid fa-pen-to-square"></i>
            </div>
            </div>
            )}
        
     </div>
      
    
    </div>
  );
}

