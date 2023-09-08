const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const PokemonModel = require('../models/pokemon');
const UserModel = require('../models/user');
const pokemons = require('./mock-pokemon');
  

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
const User = UserModel(sequelize, DataTypes); //Initialisation du model User au niveau de sequelize

const initDb = () => {

    return sequelize.sync({force: true}) // force: true, on supprime la table si elle existe déjà
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
            
            bcrypt.hash('pikachu', 10) //on hash le mot de passe avec un salt de 10
            .then(hash => {
                User.create({ //on charge un utilisateur en base
                    username: 'pikachu',
                    password: hash,
                }).then(user => console.log(user.toJSON()))
            })

            console.log('La base de donnée a bien été initialisée !')
        })
}
  
module.exports = { 
  initDb, Pokemon, User
}