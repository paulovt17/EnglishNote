
import * as db from '../repository/de-NewMusicPageRepository.js'


import { Router } from 'express'

import { autenticar } from '../utils/jwt.js'

const Endpoints = Router();


Endpoints.post ('/musics/inserir', autenticar, async (req,resp) => {
    try {
        let music = req.body;

        let id = await db.inserirMusica(music);

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