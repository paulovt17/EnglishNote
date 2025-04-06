import connection from "./connection.js";

/*insert into tb_musics (music_name, artist, length, lyric, translation, cover, music_link, visto, data, id_usuario)
values (?,?,?,?,?,?,?,?,?,?);
*/


export async function inserirMusica(music){
    const comando = `
        insert into tb_musics (music_name, artist, length, lyric, translation, cover, music_link, visto, data, id_usuario)
        values (?,?,?,?,?,?,?,?,?,?);
    `
    let resposta = await connection.query (comando, [music.music, music.artist, music.length, music.lyric, music.translation, music.cover, music.link, music.visto, music.data, music.id_usuario])
    let info = resposta[0];
    return info.insertId;

}