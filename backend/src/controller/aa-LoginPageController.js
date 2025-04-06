import * as db from '../repository/aa-LoginPageRepository.js'


import { Router } from 'express'

import { gerarToken } from '../utils/jwt.js'

const Endpoints = Router();


Endpoints.post('/entrar/', async (req,resp) => {
    try {
        let pessoa = req.body;
        let usuario = await db.validarUsuario(pessoa);

        if(usuario == null){
            resp.send({erro: "Usuário ou Senha incorreto(s)"})
        } else{
            let token = gerarToken(usuario);
            resp.send({
                "token": token
            })
        }
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
        
    }
})


Endpoints.post ('/usuario/', async (req,resp) => {
    try {
        let pessoa = req.body;

        let id = await db.inserirUsuario(pessoa);

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

export default Endpoints;