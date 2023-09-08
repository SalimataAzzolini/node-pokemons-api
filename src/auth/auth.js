const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
  
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  
    if(!authorizationHeader) {
        const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
        return res.status(401).json({ message })
    }
    
    const token = authorizationHeader.split(' ')[1];

    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {// ici on vérifie le token avec la clé privée
        if(error) {
            const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
            return res.status(401).json({ message, data: error })
    }
  
    const userId = decodedToken.userId; //on récupère l'id de l'utilisateur à partir du token
    if (req.body.userId && req.body.userId !== userId) {
        const message = `L'identifiant de l'utilisateur est invalide.`
        res.status(401).json({ message })
    } else {
      next();//on continue l'exécution de la requête
    }
  })
}