import { Router } from "express";



const endpoints = Router();




// Rota PUT para atualizar os depoimentos
endpoints.put('/api/depoimentos', (req, res) => {
    const { id, NomeDepoimento, comentario } = req.body;
  
    if (!NomeDepoimento || !comentario) {
      return res.status(400).json({ message: 'Nome e comentário são obrigatórios!' });
    }
  
    console.log("Atualizando depoimento", { id, NomeDepoimento, comentario }); // Debug para verificar os dados
  
    const query = 'UPDATE depoimentos SET NomeDepoimento = ?, comentario = ? WHERE id = ?';
  
    endpoints.db.query(query, [NomeDepoimento, comentario, id], (err, result) => {
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
  endpoints.get('/api/depoimentos', (req, res) => {
    endpoints.db.query('SELECT * FROM depoimentos', (err, results) => {
      if (err) {
        console.error('Erro ao buscar depoimentos:', err);
        return res.status(500).send('Erro ao buscar depoimentos');
      }
      res.json(results); // Retorna todos os depoimentos
    });
  });

  export default endpoints;