require('dotenv').config();
const db = require('./src/backend/DbConnect');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001; // Porta do servidor API

// Configuração do CORS para permitir acesso do frontend (porta 3000)
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware para parsing do corpo da requisição
app.use(express.json());

// Testa e faz a conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Rota de login
app.post('/api/login', (req, res) => {
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

//rota pra verificar os dados

app.get('/api/user', (req, res) => {
  const userId = 1;  // ID fixo do único usuário (no seu caso o ID é 1)

  db.query('SELECT nome, email, endereco FROM Adm WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao obter dados do usuário');
    }

    if (results.length === 1) {
      return res.json(results[0]);  // Retorna os dados do usuário
    } else {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
  });
});

// Rota PUT para atualizar os dados do usuário
app.put('/api/user', (req, res) => {
  const { nome, email, endereco } = req.body;  // Recebe os dados enviados do frontend

  // Verifica se o e-mail foi fornecido
  if (!email) {
    return res.status(400).json({ message: 'E-mail é obrigatório!' });
  }

  // ID fixo do único usuário (no seu caso o ID é 1)
  const userId = 1;

  // Cria a query SQL para atualizar os dados
  const query = `
    UPDATE Adm 
    SET nome = ?, endereco = ?, email = ? 
    WHERE id = ?  -- Usamos o ID para identificar o usuário
  `;

  // Executa a query no banco de dados
  db.query(query, [nome, endereco, email, userId], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar dados:', err);
      return res.status(500).json({ message: 'Erro ao atualizar dados.' });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Dados atualizados com sucesso!' });
    } else {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }
  });
});

// Outras rotas, caso necessário
// app.get('/outros-endpoints', (req, res) => { ... });

// Inicia o servidor na porta 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
