const mysql = require('mysql2');

// Configurar a conexão com o MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Abacate1@',
    database: 'vegas'
});

module.exports = db; // Exportando a conexão