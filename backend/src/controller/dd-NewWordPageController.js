
import * as db from '../repository/dd-NewWordPageRepository.js'


import { Router } from 'express'

import { autenticar } from '../utils/jwt.js'

const Endpoints = Router();


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

export default Endpoints;