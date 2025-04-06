
import { Link } from 'react-router-dom';
import './index.scss';
import { useState } from 'react';
import axios from 'axios'



export default function CardsMusics(props) {

  let [token, setToken]=useState(localStorage.getItem('USUARIO'))
  

  async function excluir() {
    await axios.delete(`http://localhost:2311/musics/deletar/${props.item.id_music}?x-access-token=${token}`)
    
  }

  let [openned, setOpenned] = useState(false)

  function abrir(){
    setOpenned(true)
  }

  function fechar(){
    setOpenned(false)
  }

  return (
    <div className="musics">
     <div className='music'>
     <Link to={`/dca-SelectedMusicPage/${props.item.id_music}`}>
        {props.item.cover ? (<img className='musicimg' src={props.item.cover}/>) : (
            <img className='musicimg' src='/assets/images/no-image.png'/>
        )}
        <div className='info'>
        <p id='um'>{props.item.music}</p>
        <p id='dois'>{props.item.artist}</p>
        <p id='tres'>DURAÇÃO: {props.item.length}</p>
        </div>
        </Link>
        {props.item.visto ? (
            <i id='check' class="fa-regular fa-circle-check"></i>
        ) : (
             openned == false ? (
                <div className='icones'>
                <i id='doisponto' class="fa-solid fa-ellipsis-vertical" onClick={abrir}></i>
                </div>
                ) : (
                    <div className='icones'>
               <i id='doisponto' class="fa-solid fa-ellipsis-vertical" onClick={fechar}></i>
                
                <i id='icon' class="fa-solid fa-trash-can" onClick={excluir}></i>
                
                </div>
                )
        )}
       
        
     </div>
        
        
      
    
    </div>
  );
}

