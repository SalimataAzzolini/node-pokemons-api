const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize');
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name) {
        const name = req.query.name
          return Pokemon.findAll({ 
            where: {
                name: { //Name correspond au nom dans le model pokemon
                    [Op.like]: `%${name}%` //Utilisation de l'opérateur like pour chercher les pokémons qui contiennent le nom recherché
                }
            },
            limit : 5
        })
        .then(pokemons => {
            const message = `Il y a ${pokemons.length} pokémon(s) qui correspond(ent) au nom ${name}.`
            res.json({ message, data: pokemons })
        })

    } else {
      Pokemon.findAll()
          .then(pokemons => {
              const message = 'La liste des pokémons a bien été récupérée.'
              res.json({ message, data: pokemons })
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des pokémons :', error)
          res.status(500).json({ message: 'Erreur lors de la récupération des pokémons.' })
        })
    }
  })
}