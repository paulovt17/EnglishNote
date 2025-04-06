import connection from "./connection.js";

/*select music_name, artist, cover, lyric, translation, music_link, id_usuario
from tb_musics
where id_music = ?;

insert into tb_word (word, translation, type, phrase, data, id_music, id_usuario)
values (?,?,?,?,?,?,?);

update tb_musics
set visto = ?
where id_music = ?;

select word, translation, phrase, id_usuario
from tb_words
where id_music = ?;

delete from tb_words;

update tb_words
set word = ?, translation = ?, phrase = ?
where id_word = ?;
*/


export async function musicasId(id){
    const comando = `
        select
            id_music    id,
            music_name      music,
            artist,
            cover,
            lyric,
            translation,
            music_link      link
            from pivitiel_db.tb_musics
            where id_music = ?
            `
    let registros = await connection.query(comando, [id])
    let resposta = registros[0][0]

     resposta.cover=resposta.cover?.toString();

    return resposta;
}

export async function marcarMusicaVisto(id, music){
    const comando = `
        update pivitiel_db.tb_musics
        set visto    = ?
            where id_music = ?
            `
    let registros = await connection.query(comando, [music.visto, id])
    let info = registros[0]
    return info.affectedRows;
}

export async function inserirPalavra(word){
    const comando = `
        insert into pivitiel_db.tb_words (word, translation, type, phrase, data, music_id, id_usuario)
        values (?,?,?,?,?,?,?)
    `
    let resposta = await connection.query (comando, [word.word, word.translation, word.type, word.phrase, word.data, word.music_id, word.id_usuario])
    let info = resposta[0];
    return info.insertId;

}

export async function palavras(id){
    const comando = `
        select
            id_word,
            word,
            translation,
            phrase
            from pivitiel_db.tb_words
            WHERE music_id = ?
            `
    let registros = await connection.query(comando, [id])
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
