// Importa o Babel para garantir que os arquivos JSX sejam processados
import './babel-register.js';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2';

import AdmController from './src/Controller/admController.js';
import AgendarController from './src/Controller/agendarController.js';
import DepoimentosController from './src/Controller/depoimentosController.js';
import GaleriaController from './src/Controller/galeriaController.js';
import LoginController from './src/Controller/loginController.js';

// Configuração do dotenv
dotenv.config();

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Testa e faz a conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

export { db };

// Adiciona a conexão `db` a cada controlador que precisar
AdmController.db = db;
AgendarController.db = db;
DepoimentosController.db = db;
GaleriaController.db = db;
LoginController.db = db;

const servidor = express();
servidor.use(express.json());
servidor.use(cors({ origin: process.env.CLIENT_ORIGIN }));

// Usa os controladores, com `db` acessível a cada um
servidor.use(AdmController);
servidor.use(AgendarController);
servidor.use(DepoimentosController);
servidor.use(GaleriaController);
servidor.use(LoginController);

// Middleware para servir arquivos estáticos
servidor.use('/uploads', express.static('public/uploads'));

// Inicia o servidor na porta 3001
const PORT = 3001;

servidor.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
