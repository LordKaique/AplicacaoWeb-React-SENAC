import { Router } from "express";


const endpoints = Router();

// Rota para verificar os dados do usuário
endpoints.get('/api/user',  (req, res) => {
  const userId = 1;  // ID fixo do único usuário (no seu caso o ID é 1)

  endpoints.db.query('SELECT nome, email, endereco FROM Adm WHERE id = ?', [userId], (err, results) => {
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
endpoints.put('/api/user', (req, res) => {
  const { nome, email, endereco } = req.body;  // Recebe os dados enviados do frontend

  if (!email) {
    return res.status(400).json({ message: 'E-mail é obrigatório!' });
  }

  const userId = 1;

  const query = `
    UPDATE Adm 
    SET nome = ?, endereco = ?, email = ? 
    WHERE id = ?
  `;

  endpoints.db.query(query, [nome, endereco, email, userId], (err, result) => {
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

export default endpoints;
