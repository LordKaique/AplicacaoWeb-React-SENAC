require('dotenv').config();
const db = require('./src/backend/DbConnect');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = 3001; // Porta do servidor API

// Configuração do CORS para permitir acesso do frontend (porta 3000)
app.use(cors({ origin: 'https://vegasink.netlify.app' }));


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

// Configuração do Multer para o upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Pasta para armazenar as imagens
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada arquivo
  },
});

const upload = multer({ storage });

// Middleware para servir arquivos estáticos (imagens)
app.use('/uploads', express.static('public/uploads'));

// Rota para fazer upload de uma imagem
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Erro ao fazer upload da imagem' });
  }

  const imagePath = `/uploads/${req.file.filename}`;

  const query = 'INSERT INTO fotos (caminho) VALUES (?)';
  db.query(query, [imagePath], (err, result) => {
    if (err) {
      console.error('Erro ao salvar imagem no banco de dados:', err);
      return res.status(500).json({ message: 'Erro ao salvar imagem' });
    }

    res.status(200).json({ message: 'Imagem salva com sucesso', imagePath });
  });
});

// Rota para buscar todas as imagens do banco de dados
app.get('/api/galeria', (req, res) => {
  db.query('SELECT * FROM fotos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar imagens:', err);
      return res.status(500).send('Erro ao buscar imagens');
    }
    res.json(results); // Retorna todas as imagens do banco
  });
});

app.delete('/api/excluir/:id', (req, res) => {
  const { id } = req.params;

  // Primeiro, obtenha o caminho do arquivo da imagem para excluí-lo do diretório
  const querySelect = 'SELECT caminho FROM fotos WHERE id = ?';
  db.query(querySelect, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar imagem no banco de dados:', err);
      return res.status(500).json({ message: 'Erro ao buscar imagem' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Imagem não encontrada' });
    }

    const caminhoImagem = results[0].caminho;
    const caminhoCompleto = path.join(__dirname, 'public', caminhoImagem);

    // Exclua o registro do banco de dados
    const queryDelete = 'DELETE FROM fotos WHERE id = ?';
    db.query(queryDelete, [id], (err, result) => {
      if (err) {
        console.error('Erro ao excluir imagem do banco de dados:', err);
        return res.status(500).json({ message: 'Erro ao excluir imagem do banco de dados' });
      }

      // Exclua o arquivo da pasta
      fs.unlink(caminhoCompleto, (err) => {
        if (err) {
          console.error('Erro ao excluir o arquivo:', err);
          return res.status(500).json({ message: 'Erro ao excluir o arquivo' });
        }

        res.status(200).json({ message: 'Imagem excluída com sucesso' });
      });
    });
  });
});


// Rota PUT para atualizar os depoimentos
app.put('/api/depoimentos', (req, res) => {
  const { id, NomeDepoimento, comentario } = req.body;

  if (!NomeDepoimento || !comentario) {
    return res.status(400).json({ message: 'Nome e comentário são obrigatórios!' });
  }

  console.log("Atualizando depoimento", { id, NomeDepoimento, comentario }); // Debug para verificar os dados

  const query = 'UPDATE depoimentos SET NomeDepoimento = ?, comentario = ? WHERE id = ?';

  db.query(query, [NomeDepoimento, comentario, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar depoimento:', err);
      return res.status(500).json({ message: 'Erro ao atualizar depoimento' });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Depoimento atualizado com sucesso!' });
    } else {
      return res.status(404).json({ message: 'Depoimento não encontrado!' });
    }
  });
});

// Rota GET para obter os depoimentos
app.get('/api/depoimentos', (req, res) => {
  db.query('SELECT * FROM depoimentos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar depoimentos:', err);
      return res.status(500).send('Erro ao buscar depoimentos');
    }
    res.json(results); // Retorna todos os depoimentos
  });
});

// Rota para agendar um serviço
app.post('/api/agendar', (req, res) => {
  const { NomeCliente, numero, servico, descricao } = req.body;

  if (!NomeCliente || !numero || !servico || !descricao) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }

  const query = 'INSERT INTO servico (NomeCliente, numero, servico, descricao) VALUES (?, ?, ?, ?)';
  db.query(query, [NomeCliente, numero, servico, descricao], (err, result) => {
    if (err) {
      console.error('Erro ao agendar serviço:', err);
      return res.status(500).json({ message: 'Erro ao agendar serviço.' });
    }

    res.status(200).json({ message: 'Serviço agendado com sucesso!' });
  });
});
//rota para ver os agendamentos
app.get('/api/agendamentos', (req, res) => {
  db.query('SELECT * FROM servico', (err, results) => {
    if (err) {
      console.error('Erro ao buscar agendamentos:', err);
      return res.status(500).send('Erro ao buscar agendamentos');
    }
    res.json(results);
  });
});

// Rota para excluir um agendamento
app.delete('/api/agendamento/:id', (req, res) => {
  const agendamentoId = req.params.id;

  // Query para excluir o agendamento no banco de dados
  const query = 'DELETE FROM servico WHERE id = ?';

  db.query(query, [agendamentoId], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o agendamento:', err);
      return res.status(500).json({ message: 'Erro ao excluir agendamento' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    return res.status(200).json({ message: 'Agendamento excluído com sucesso' });
  });
});


// Inicia o servidor na porta 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
