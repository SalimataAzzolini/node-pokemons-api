const { ValidationError, UniqueConstraintError, Sequelize } = require('sequelize');

const { Pokemon } = require('../db/sequelize');

  
module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
        return Pokemon.findByPk(id).then(pokemon => { //ici avec return, on retourne la promesse de la fonction findByPk et si c'est pas bon on passe à la suite avec le catch
          if(!pokemon) {
              const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`
              return res.status(404).json({message})
          }
          const message = `Le pokémon ${pokemon.name} a bien été modifié.`
          res.json({message, data: pokemon })
        })
    })
    .catch(error => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error }) //error.message contient le message d'erreur de la validation mis dans le model
      }
      if(error instanceof Sequelize.UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error })
      }
        const message = `Le pokémon n'a pas pu être modifié. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
    })
  })
}
