import { Link, useNavigate } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';
import MenuIngles from '../../components/menuIngles';
import CardsWords from '../../components/cardpalavras';
import axios from 'axios';

function WordsPage() {
  const [token, setToken] = useState(null);
  const [listaWords, setListaWords] = useState([]);
  const [pesquisar, setPesquisar] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar o loading
  const [tipo, setTipo] = useState(''); // Estado para o tipo (word, expression, '')
  const [allClass, setAllClass] = useState('1')
  const [wordClass, setWordClass] = useState('0')
  const [expressionClass, setExpressionClass] = useState('0')

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
  }, [token, tipo, pesquisar]); // Agora dependemos de token, tipo e pesquisar

  // Funções para alterar o tipo de filtro
  function tipoWord() {
    setTipo('word');
    setAllClass('0')
    setExpressionClass('0')
    setWordClass('1')
    
  }

  function tipoExpression() {
    setTipo('expression');
    setAllClass('0')
    setWordClass('0')
    setExpressionClass('1')
  }

  function tipoAll() {
    setTipo('');
    setWordClass('0')
    setExpressionClass('0')
    setAllClass('1')
  }

  // Função de consulta de palavras
 async function consultar() {
  setLoading(true); // Inicia o loading
  console.log('Pesquisando...', pesquisar, tipo);  // Log para depuração

  try {
    let url = '';

    // Consulta com pesquisa e sem tipo
    if (pesquisar.length >= 1 && tipo === '') {
      url = `http://localhost:2311/words/filtradas?x-access-token=${token}&word=${pesquisar}`;
    }
    // Consulta apenas por tipo (sem pesquisa)
    else if (pesquisar.length === 0 && (tipo === 'word' || tipo === 'expression')) {
      url = `http://localhost:2311/words/tipo?x-access-token=${token}&type=${tipo}`;
    }
    // Consulta com tipo e pesquisa
    else if (pesquisar.length >= 1 && (tipo === 'word' || tipo === 'expression')) {
      url = `http://localhost:2311/words/tipo/filtradas?x-access-token=${token}&type=${tipo}&word=${pesquisar}`;
    }
    // Consulta sem filtro de tipo e sem pesquisa
    else if (pesquisar.length === 0 && tipo === '') {
      url = `http://localhost:2311/words/?x-access-token=${token}`;
    }

    const resp = await axios.get(url);
    setListaWords(resp.data); // Garantir que seja sempre um array
  } catch (err) {
    console.error('Erro ao consultar palavras:', err);
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
    <div className="WordsPage">
      <MenuIngles />

      <header className="titulo">
        <h1>Here are the words learned:</h1>
      </header>

      <section className="pesquisar">
        <input
          type="text"
          placeholder="Buscar..."
          value={pesquisar}
          onChange={(e) => setPesquisar(e.target.value)} // Atualiza o valor de pesquisar
        />
        <div className="filtro">
          <p className={'all'+ allClass} onClick={tipoAll}>All</p>
          <p className={'word'+ wordClass} onClick={tipoWord}>Words</p>
          <p className={'expression'+ expressionClass} onClick={tipoExpression}>Expressions</p>
        </div>
      </section>

      <section className="principal">
        {listaWords.length === 0 ? (
          <p>Nenhuma Palavra Encontrada</p>
        ) : (
          <div>
            <div className="info">
              <p>palavra</p>
              <p>tradução</p>
              <p>frase</p>
            </div>
            <div className="palavras">
              {loading ? (
                <p>Carregando...</p> // Exibe uma mensagem de carregamento
              ) : (
                listaWords.map((item) => <CardsWords item={item} key={item.id_word} />)
              )}
            </div>
          </div>
        )}
      </section>

      <Link to={'/dd-NewWordPage'}><img className="addCircle" src="/assets/images/Plus circle.png" /></Link>
    </div>
  );
}

export default WordsPage;
