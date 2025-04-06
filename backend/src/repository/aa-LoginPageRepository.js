import connection from "./connection.js";

export async function inserirUsuario(user){
    const comando = `
        insert into pivitiel_db.tb_usuario (nome_usuario, senha_usuario)
        values (?,?)
    `
    let resposta = await connection.query (comando, [user.usuario, user.senha])
    let info = resposta[0];
    return info.insertId;

}

export async function validarUsuario(user){
    const comando = `
        select
            id_usuario      id,
            nome_usuario    usuario
            from pivitiel_db.tb_usuario
            where nome_usuario = ? and senha_usuario = ?
            `
    let registros = await connection.query(comando, [user.usuario, user.senha])
    return registros[0][0]
}