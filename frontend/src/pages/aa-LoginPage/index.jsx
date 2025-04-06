import './index.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';


function LoginPage() {

  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  const navigate = useNavigate()

  async function entrar(){
    const user = {
      "usuario": usuario,
      "senha": senha
    }

    const url = 'http://localhost:2311/entrar/'
    let resp = await axios.post(url, user)

    if(resp.data.erro != undefined){
      alert('ta errado meu nobre')
    }
    else{
      localStorage.setItem('USUARIO', resp.data.token)
      navigate('/')
    }
  }



  return (
    <div className="LoginPage">
     <header className='titulo'>
        <h1>A Determinação de Hoje é o Sucesso de Amanhã:</h1>
      </header>
      <section className='principal'>
        <h2>Faça Seu Login</h2>
        <input type='text' placeholder='Usuário' value={usuario} onChange={(e) =>setUsuario(e.target.value)}/>
        <input type='text' placeholder='Senha' value={senha} onChange={(e) =>setSenha(e.target.value)}/>
        <button onClick={entrar}>LOGIN</button>
      </section>
    </div>
  );
}

export default LoginPage;
