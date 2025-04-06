import * as db from '../repository/aeb-WeekListenedMusicRepository.js'


import { Router } from 'express'

import { autenticar } from '../utils/jwt.js'

const Endpoints = Router();



Endpoints.get ('/musics/semana', autenticar, async (req,resp) => {
    try {
        const { startDate, endDate, visto } = req.query;
        const registro = await db.musicasSemana({startDate, endDate, visto});
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


export default Endpoints;