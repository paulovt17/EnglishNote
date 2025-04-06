import connection from "./connection.js";

/*
select word, type, translation, phrase, id_usuario
from tb_words
where data < ? and data > ?;*/



export async function palavrasSemana({startDate, endDate}){
    const comando = `
        select
            id_word,
            word,
            translation,
            phrase
            from pivitiel_db.tb_words
            WHERE data < ? AND data > ?;
            `
    let registros = await connection.query(comando, [endDate, startDate])
    return registros[0]
}

export async function palavrasTypeSemana({startDate, endDate, type}){
    const comando = `
        select
            id_word,
            word,
            translation,
            phrase
            from pivitiel_db.tb_words
            WHERE data < ? AND data > ? AND type = ?;
            `
    let registros = await connection.query(comando, [endDate, startDate, type])
    return registros[0]
}