import * as db from '../repository/aea-WeekWordsPageRepository.js'


import { Router } from 'express'

import { autenticar } from '../utils/jwt.js'

const Endpoints = Router();



Endpoints.get ('/words/semana', autenticar, async (req,resp) => {
    try {
        const { startDate, endDate } = req.query;
        const registro = await db.palavrasSemana({startDate, endDate});
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

Endpoints.get ('/words/tipo/semana', autenticar, async (req,resp) => {
    try {
        const { startDate, endDate, type } = req.query;
        const registro = await db.palavrasTypeSemana({startDate, endDate, type});
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