import { Link, useNavigate, useParams } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';
import MenuIngles from '../../components/menuIngles';
import axios from 'axios';
import CardsWords from '../../components/cardpalavras';


function SelectedMusicPage() {

  const [token, setToken] = useState(null);

  const [listaWords, setListaWords] = useState([]);
  const [musicName, setMusicName] = useState('')
  const [artist, setArtist] = useState('')
  const [link, setLink] = useState('')
  const [letra, setLetra] = useState('')
  const [traducao, setTraducao] = useState('')

  const [word, setWord] = useState('')
  const [translation, setTranslation] = useState('')
  const [type, setType] = useState('')
  const [phrase, setPhrase] = useState('')

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  // Verifica se o usuário está autenticado
  useEffect(() => {
    let usu = localStorage.getItem('USUARIO');
    setToken(usu);

    if (usu === undefined) {
      navigate('/aa-LoginPage');
    }
  }, [navigate]);

  useEffect(() => {
    if (token) {
      consultar();
    }
  }, [token]);


  async function consultar() {
  
    try {
      let url =  `http://localhost:2311/musics/${id}?x-access-token=${token}`;
      
      const resp = await axios.get(url);
      let musica = resp.data
      setMusicName(musica.music); 
      setArtist(musica.artist);
      setLink(musica.link);
      setLetra(musica.lyric);
      setTraducao(musica.translation);

      let url2 = `http://localhost:2311/words/${id}?x-access-token=${token}`;
      const resp2 = await axios.get(url2);
      setListaWords(resp2.data)
      
    } catch (err) {
      console.error('Erro ao consultar:', err);
    }
  }

  function Mostrar(){
    setShow(true);
  }

  return (
    <div className="SelectedMusicPage">
     <MenuIngles />
     <header className="titulo">
       <h1>{musicName}</h1>
       <h2>{artist}</h2>
        </header>
      
        <section className="musica">
        <iframe width="560" height="315" src={link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <div className='letra'>
            <p>{letra}</p>
            <img src='/assets/images/Line 6.png'/>
            <p>{traducao}</p>
          </div>
        </section>
      
        {show ? (<section className="addword">
          <div className='botoes'>
            <button>NEW WORD</button>
            <button>FINISH</button>
          </div>
          
          <div className='inputs'>
            <div className='top'>
            <div className='word'>
              <p>Word</p>
              <input type='text' placeholder='word...' value={word} onChange={e=> setWord(e.target.value)}/>
            </div>
            <div className='translation'>
              <p>Translation</p>
              <input type='text' placeholder='translation...' value={translation} onChange={e=> setTranslation(e.target.value)}/>
            </div>
            <div className='type'>
              <p>Type</p>
              <input type='text' placeholder='word...' value={word} onChange={e=> setWord(e.target.value)}/>
            </div>
            </div>  
            <div className='phrase'>
              <p>Phrase</p>
              <input type='text' placeholder='phrase...' value={phrase} onChange={e=> setPhrase(e.target.value)}/>
            </div>
          </div>

          <button className='send'>SEND</button>
         
        </section>) : (
          <section className="addword">
          <div className='botoes'>
            <button onClick={Mostrar}>NEW WORD</button>
            <button>FINISH</button>
          </div>

        </section>
        )}
        

        <section className="palavras">
          
          
          { listaWords.map((item) => <CardsWords item={item} key={item.id_word} />)}
         
        </section>
        
    </div>
  );
}

export default SelectedMusicPage;
