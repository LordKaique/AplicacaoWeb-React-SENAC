import { Router } from "express";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const endpoints = Router();

// Configuração do __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Rota para fazer upload de uma imagem
endpoints.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Erro ao fazer upload da imagem' });
  }

  const imagePath = `/uploads/${req.file.filename}`;

  const query = 'INSERT INTO fotos (caminho) VALUES (?)';
  endpoints.db.query(query, [imagePath], (err, result) => {
    if (err) {
      console.error('Erro ao salvar imagem no banco de dados:', err);
      return res.status(500).json({ message: 'Erro ao salvar imagem' });
    }

    res.status(200).json({ message: 'Imagem salva com sucesso', imagePath });
  });
});

// Rota para buscar todas as imagens do banco de dados
endpoints.get('/api/galeria', (req, res) => {
  endpoints.db.query('SELECT * FROM fotos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar imagens:', err);
      return res.status(500).send('Erro ao buscar imagens');
    }
    res.json(results); // Retorna todas as imagens do banco
  });
});

// Rota para excluir uma imagem
endpoints.delete('/api/excluir/:id', (req, res) => {
  const { id } = req.params;

  const querySelect = 'SELECT caminho FROM fotos WHERE id = ?';
  endpoints.db.query(querySelect, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar imagem no banco de dados:', err);
      return res.status(500).json({ message: 'Erro ao buscar imagem' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Imagem não encontrada' });
    }

    const caminhoImagem = results[0].caminho;
    const caminhoCompleto = path.join(__dirname, 'public', caminhoImagem);

    const queryDelete = 'DELETE FROM fotos WHERE id = ?';
    endpoints.db.query(queryDelete, [id], (err, result) => {
      if (err) {
        console.error('Erro ao excluir imagem do banco de dados:', err);
        return res.status(500).json({ message: 'Erro ao excluir imagem do banco de dados' });
      }

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

export default endpoints;
