import { Link, useNavigate } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';
import MenuIngles from '../../components/menuIngles';
import CardsMusics from '../../components/cardsmusica';
import axios from 'axios';


function MusicsPage() {

  const [token, setToken] = useState(null);
  const [listaMusics, setListaMusics] = useState([]);
  const [pesquisar, setPesquisar] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar o loading
  


  const navigate = useNavigate();

  // Verifica se o usuário está autenticado
  useEffect(() => {
    let usu = localStorage.getItem('USUARIO');
    setToken(usu);

    if (usu === undefined) {
      navigate('/aa-LoginPage');
    }
  }, [navigate]);

  // Atualiza a lista de palavras sempre que o token ou o tipo de pesquisa mudar
  useEffect(() => {
    if (token) {
      consultar(); // Realiza a consulta sempre que o token ou o tipo mudar
    }
  }, [token, pesquisar]); 


  // Função de consulta de palavras
 async function consultar() {
  setLoading(true); // Inicia o loading

  try {
    let url = '';

 
    if (pesquisar.length >= 1) {
      url = `http://localhost:2311/musics/filtradas?x-access-token=${token}&music=${pesquisar}`;
    }
   
    else {
      url = `http://localhost:2311/musics/?x-access-token=${token}`;
    }
  
    const resp = await axios.get(url);
    setListaMusics(resp.data); 
  } catch (err) {
    console.error('Erro ao consultar Musicas:', err);
  } finally {
    setLoading(false); // Para o loading
  }
}


  // Debounce para evitar chamadas excessivas à API enquanto o usuário digita
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      consultar(); // Chama a consulta após um tempo sem digitar
    }, 500); // Aguarda 500ms após o usuário parar de digitar

    return () => clearTimeout(timeoutId); // Limpa o timeout quando o componente for desmontado ou o valor de pesquisar mudar
  }, [pesquisar]); // Chama quando o valor de pesquisar mudar


  return (
    <div className="MusicsPage">
      <MenuIngles />
     
           <header className="titulo">
             <h1>These are the saved songs:</h1>
           </header>
     
           <section className="pesquisar">
             <input
               type="text"
               placeholder="Buscar..."
               value={pesquisar}
               onChange={(e) => setPesquisar(e.target.value)} // Atualiza o valor de pesquisar
             />
           </section>
     
           <section className="principal">
             {listaMusics.length === 0 ? (
               <p>Nenhuma Música Encontrada</p>
             ) : (
                 <div className="musics">
                   {loading ? (
                     <p>Carregando...</p> // Exibe uma mensagem de carregamento
                   ) : (
                     listaMusics.map((item) => <CardsMusics item={item} key={item.id_music} />)
                   )}
                 </div>
               
             )}
           </section>
     
           <Link to={'/de-NewMusicPage'}><img className="addCircle" src="/assets/images/Plus circle.png" /></Link>
     
    </div>
  );
}

export default MusicsPage;
