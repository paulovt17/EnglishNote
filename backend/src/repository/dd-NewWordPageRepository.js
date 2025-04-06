import connection from "./connection.js";

/*insert into tb_word (word, translation, type, phrase, data, id_music, id_usuario)
values (?,?,?,?,?,?,?);
*/


export async function inserirPalavra(word){
    const comando = `
        insert into pivitiel_db.tb_words (word, translation, type, phrase, data, music_id, id_usuario)
        values (?,?,?,?,?,?,?)
    `
    let resposta = await connection.query (comando, [word.word, word.translation, word.type, word.phrase, word.data, word.music_id, word.id_usuario])
    let info = resposta[0];
    return info.insertId;

}
