import mysql from 'mysql2/promise.js'

const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB
})

console.log('---A Conexão com o Banco foi um sucesso---');
export default connection