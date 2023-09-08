const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize');
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name) {

        const name = req.query.name;
        const limit = parseInt(req.query.limit) || 5;

        if(name.length < 2) {
            const message = 'Le nom de recherche doit contenir au moins 2 caractères.'
            return res.status(400).json({ message })
        }
   
        return Pokemon.findAndCountAll({
            where: {
                name: { //Name correspond au nom dans le model pokemon
                    [Op.like]: `%${name}%` //Utilisation de l'opérateur like pour chercher les pokémons qui contiennent le nom recherché
                }
            },
            order: ['name'], //Tri par ordre alphabétique
            limit : limit
        })
      
        .then(({count, rows: pokemons}) => {
            const message = `Il y a ${count} pokémon(s) qui correspond(ent) au nom ${name}.`
            res.json({ message, data: pokemons })
        })

    } else {
      Pokemon.findAll({ order: ['name'] })
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