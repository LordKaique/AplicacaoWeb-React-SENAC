import jwt from 'jsonwebtoken';
import { Router } from "express";
import { db } from '/Users/Usuario/Desktop/AplicacaoWeb-React-SENAC-main/server.js';

const endpoints = Router();


const secret = "456468"

function verifyJWT(req,res,next){
  const token = req.headers['x-access-token'];
jwt.verify(token,secret,(err,decoded)=>{
  if(err) return res.status(401).end();

  req.userId = decoded.userId;
  next();
}) 
}

// Rota de login
endpoints.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM Adm WHERE email = ? AND senha = ?', [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao realizar login');
    }

    if (results.length === 1) {
     const token = jwt.sign({userId: 1}, secret,{expiresIn:300})
      return res.json({ auth: true, token,});

    } else {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
  });
});

export default endpoints;
