const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const PokemonModel = require('../models/pokemon');
const UserModel = require('../models/user');
const pokemons = require('./mock-pokemon');


let sequelize;

if (process.env.NODE_ENV === 'production'){
    sequelize = new Sequelize(
        'q97lpqnhwumoly4u',
        'cijwxjbmdxl5qapn',
        'djr99ym7snhzpldb',
        {
            host: 'eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
            port: 3306,         
            dialect: 'mariadb', 
            dialectOptions: {
                timezone: 'Etc/GMT-2', 
            },
            logging: true
        }
        )
} else{

    sequelize = new Sequelize(
        'pokedex', 
        'root',    
        'root',    
        {
            host: '127.0.0.1',
            port: 8889,        
            dialect: 'mariadb',
            dialectOptions: {
                timezone: 'Etc/GMT-2', 
            },
            logging: false, 
        }
);
}
  
const Pokemon = PokemonModel(sequelize, DataTypes) 
const User = UserModel(sequelize, DataTypes); 

const initDb = () => {

return sequelize.sync()
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
            
            bcrypt.hash('pikachu', 10) 
            .then(hash => {
                User.create({
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