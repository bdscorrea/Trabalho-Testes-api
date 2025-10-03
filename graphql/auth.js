// graphql/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'secrdev_secret_for_learning_purposes';

function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return verifyToken(token, SECRET);
  } catch (err) {
    return null;
  }
}

const contextFromReq = async (req) => {
    if (!req || !req.headers) {
        return { user: null }; 
    }

    const authHeader = req.headers.authorization || '';

    if (authHeader.startsWith('Bearer ')) {
        const token = authHeader.split('Bearer ')[1];
        try {
            // Sua lógica de verificação JWT
            const user = await verifyJwt(token); 
            return { user }; // Retorna o usuário
        } catch (err) {
            // Token inválido/expirado, retorna contexto vazio, SEM ERRO
            return { user: null }; 
        }
    }
    
    // Sem token, retorna contexto vazio, SEM ERRO
    return { user: null }; 
};

module.exports = { signToken, verifyToken, contextFromReq };
