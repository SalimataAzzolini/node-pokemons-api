const express = require('express');
// const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');


const app = express();
const port = process.env.PORT || 3000;

//Déclaration des middlewares
app
   .use(favicon(__dirname + '/favicon.ico')) 
   // .use(morgan('dev')) // logger pour afficher les requêtes entrantes
   .use(bodyParser.json()) //ici on parse toutes les données entrantes dans notre api rest pour les avoir en JSON


sequelize.initDb()//on initialise la base de données

app.get('/', (req, res) => res.json({ message: 'Hello World from Sali!' })); 
//Import des routes api
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/login')(app);



app.use(({res}) => { 
   const message =  'Impossible de trouver la ressource demandée ! Essayez une autre url';
   res.status(404).json({message});
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`));