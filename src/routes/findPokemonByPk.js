const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
          if(pokemon === null) {
            const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`
            return res.status(404).json({message})
          }
          const message = `Le pokémon ${pokemon.name} a bien été récupéré.`
            res.json({message, data: pokemon})
      })
      .catch(error => {
          res.status(500).json({ message: 'Erreur lors de la récupération du pokémon.', error })
      })
  })
}