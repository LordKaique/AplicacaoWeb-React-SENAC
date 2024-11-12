import { Router } from "express";


const endpoints = Router();



// Rota para agendar um serviço
endpoints.post('/api/agendar', (req, res) => {
    const { NomeCliente, numero, servico, descricao } = req.body;
  
    if (!NomeCliente || !numero || !servico || !descricao) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }
  
    const query = 'INSERT INTO servico (NomeCliente, numero, servico, descricao) VALUES (?, ?, ?, ?)';
    endpoints.db.query(query, [NomeCliente, numero, servico, descricao], (err, result) => {
      if (err) {
        console.error('Erro ao agendar serviço:', err);
        return res.status(500).json({ message: 'Erro ao agendar serviço.' });
      }
  
      res.status(200).json({ message: 'Serviço agendado com sucesso!' });
    });
  });
  //rota para ver os agendamentos
  endpoints.get('/api/agendamentos', (req, res) => {
    endpoints.db.query('SELECT * FROM servico', (err, results) => {
      if (err) {
        console.error('Erro ao buscar agendamentos:', err);
        return res.status(500).send('Erro ao buscar agendamentos');
      }
      res.json(results);
    });
  });
  
  // Rota para excluir um agendamento
  endpoints.delete('/api/agendamento/:id', (req, res) => {
    const agendamentoId = req.params.id;
  
    // Query para excluir o agendamento no banco de dados
    const query = 'DELETE FROM servico WHERE id = ?';
  
    endpoints.db.query(query, [agendamentoId], (err, result) => {
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
  

  export default endpoints;