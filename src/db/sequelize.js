const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')
  

const sequelize = new Sequelize(
    'pokedex', 
    'root',    
    'root',    
    {
        host: '127.0.0.1',    // Adresse IP du serveur
        port: 8889,          // Port de la base de données
        dialect: 'mariadb', // Dialecte utilisé
        dialectOptions: {
            timezone: 'Etc/GMT-2', // heure française
        },
        logging: false, // désactive les logs
    }
);

  
const Pokemon = PokemonModel(sequelize, DataTypes) //on passe l'objet sequelize et DataTypes à notre model PokemonModel pour créer le model Pokemon
  
const initDb = () => {
  return sequelize.sync({force: true}) // force: true pour supprimer la table à chaque fois
    .then(_ => {
        pokemons.map(pokemon => {
        Pokemon.create({
            name: pokemon.name,
            hp: pokemon.hp,
            cp: pokemon.cp,
            picture: pokemon.picture,
            types: pokemon.types
        }).then(pokemon => console.log(pokemon.toJSON()))
        })
        console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Pokemon
}