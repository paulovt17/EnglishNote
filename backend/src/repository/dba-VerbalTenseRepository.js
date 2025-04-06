import connection from "./connection.js";

/*select word, translation, phrase
from tb_words;

select word, translation, phrase
from tb_words;
where word like '?% or translation like '?%';

select word, translation, phrase
from tb_words
where type = word;

select word, translation, phrase
from tb_words
where type = word and word like '?% or translation like '?%';

select word, translation, phrase
from tb_words
where type = expression;

select word, translation, phrase
from tb_words
where type = expression and word like '?% or translation like '?%';

delete from tb_words
where id_word = ?;

update tb_words
set word = ?, translation = ?, phrase = ?
where id_word = ?;*/



export async function palavrasGerais(){
    const comando = `
        select
            id_word,
            word,
            translation,
            phrase
            from pivitiel_db.tb_words
            `
    let registros = await connection.query(comando)
    return registros[0]
}
export async function palavrasFiltradas(word){
    const comando = `
        select
            id_word,
            word,
            translation,
            phrase
            from pivitiel_db.tb_words
            where word like CONCAT(?, '%') or translation like CONCAT(?, '%')
            `
    let registros = await connection.query(comando, [word.word, word.translation])
    return registros[0]
}
export async function palavrasType({type}){
    const comando = `
        select
            id_word,
            word,
            translation,
            phrase
            from pivitiel_db.tb_words
            where type = ?
            `
    let registros = await connection.query(comando, [type])
    return registros[0]
}
export async function palavrasTypeFiltradas({ type, word, translation }){
    const comando = `
        select
            id_word,
            word,
            translation,
            phrase
            from pivitiel_db.tb_words
            WHERE type = ? AND (word LIKE CONCAT(?, '%') OR translation LIKE CONCAT(?, '%'))
            `
    let registros = await connection.query(comando, [type, word, translation])
    return registros[0]
}
export async function atualizarPalavra(id, word){
    const comando = `
        update pivitiel_db.tb_words
        set word    = ?, 
            translation = ?,
            phrase = ?
            where id_word = ?
            `
    let registros = await connection.query(comando, [word.word, word.translation, word.phrase, id])
    let info = registros[0]
    return info.affectedRows;
}
export async function deletarPalavra(id){
    const comando = `
        delete from pivitiel_db.tb_words
        where id_word = ?
            `
    let registros = await connection.query(comando, [id])
    let info = registros[0]
    return info.affectedRows;
}
