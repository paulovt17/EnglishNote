import * as db from '../repository/dca-SelectedMusicPageRepository.js'


import { Router } from 'express'

import { autenticar } from '../utils/jwt.js'

const Endpoints = Router();


Endpoints.get ('/musics/:id', autenticar, async (req,resp) => {
    try {

        const id = req.params.id;

        const registro = await db.musicasId(id);
        resp.send(registro)
 
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

Endpoints.put ('/musics/marcarvisto/:id', autenticar, async (req,resp) => {
    try {

        let id = req.params.id
        let music = req.body

        let linhasAfetadas = await db.marcarMusicaVisto(id, music);

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

Endpoints.post ('/words/inserir', autenticar, async (req,resp) => {
    try {
        let word = req.body;

        let id = await db.inserirPalavra(word);

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

Endpoints.get ('/words/:id', autenticar, async (req,resp) => {
    try {

        const id = req.params.id;

        const registro = await db.palavras(id);
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