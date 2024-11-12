import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2';

import AdmController from "./src/Controller/admController.js";
import AgendarController from "./src/Controller/agendarController.js";
import DepoimentosController from "./src/Controller/depoimentosController.js";
import GaleriaController from "./src/Controller/galeriaController.js";

// Configuração do dotenv
dotenv.config();

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Abacate1@',
    database: 'vegas'
});

// Testa e faz a conexão com o banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao MySQL');
});

// Adicione a conexão `db` a cada controlador que precisar
AdmController.db = db;
AgendarController.db = db;
DepoimentosController.db = db;
GaleriaController.db = db;

const servidor = express();
servidor.use(express.json());
servidor.use(cors({ origin: 'http://localhost:3000' }));

const PORT = 3001;

// Use os controladores, com `db` acessível a cada um
servidor.use(AdmController);
servidor.use(AgendarController);
servidor.use(DepoimentosController);
servidor.use(GaleriaController);

// Middleware para servir arquivos estáticos
servidor.use('/uploads', express.static('public/uploads'));


// Rota de login
servidor.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM Adm WHERE email = ? AND senha = ?', [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao realizar login');
    }

    if (results.length === 1) {
      return res.json({ message: 'Login bem-sucedido' });
    } else {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
  });
});



// Inicia o servidor na porta 3001
servidor.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


