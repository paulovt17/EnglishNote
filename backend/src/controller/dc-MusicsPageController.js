import * as db from '../repository/dc-MusicsPageRepository.js'


import { Router } from 'express'

import { autenticar } from '../utils/jwt.js'

const Endpoints = Router();


Endpoints.get ('/musics/', autenticar, async (req,resp) => {
    try { 

        const registro = await db.musicas();
        resp.send(registro)

    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

Endpoints.get ('/musics/filtradas', autenticar, async (req,resp) => {
    try {

        const { music } = req.query;
        const registro = await db.musicasFiltradas({ music, artist: music });
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


Endpoints.delete ('/musics/deletar/:id', autenticar, async (req,resp) => {
    try {

        let id = req.params.id

        let linhasAfetadas = await db.deletarMusica(id);

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