import * as db from '../repository/db-WordsPageRepository.js'


import { Router } from 'express'

import { autenticar } from '../utils/jwt.js'

const Endpoints = Router();


Endpoints.get ('/words/', autenticar, async (req,resp) => {
    try {

        const registro = await db.palavrasGerais();
        resp.send(registro)

    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

Endpoints.get ('/words/filtradas', autenticar, async (req,resp) => {
    try {

        const { word } = req.query;
        const registro = await db.palavrasFiltradas({ word, translation: word });
        if (!registro) {
            return resp.status(404).send({ message: 'Nenhum registro encontrado.' });
        }
        resp.send(registro)

    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

Endpoints.get ('/words/tipo', autenticar, async (req,resp) => {
    try {

        const {type}  = req.query;
        const registro = await db.palavrasType({type});
        resp.send(registro)

    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

Endpoints.get ('/words/tipo/filtradas', autenticar, async (req,resp) => {
    try {
        const { type, word } = req.query;
        const registro = await db.palavrasTypeFiltradas({type, word, translation: word});
        if (!registro) {
            return resp.status(404).send({ message: 'Nenhum registro encontrado.' });
        }
        resp.send(registro)

    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})


Endpoints.put ('/words/atualizar/:id', autenticar, async (req,resp) => {
    try {

        let id = req.params.id
        let word = req.body

        let linhasAfetadas = await db.atualizarPalavra(id, word);

        if(linhasAfetadas >=1){
        resp.send()
        }
        else {
            resp.status(404).send({erro: 'Nenhum registro encontrado'})
        }

    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

Endpoints.delete ('/words/deletar/:id', autenticar, async (req,resp) => {
    try {

        let id = req.params.id

        let linhasAfetadas = await db.deletarPalavra(id);

        if(linhasAfetadas >=1){
        resp.send()
        }
        else {
            resp.status(404).send({erro: 'Nenhum registro encontrado'})
        }
        
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

export default Endpoints;