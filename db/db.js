import mysql from "mysql2/promise";

// generalmente se llama pool
export const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'agencia_de_viajes'
})