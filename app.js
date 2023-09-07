const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');


const app = express();
const port = 3000;

//Déclaration des middlewares
app
   .use(favicon(__dirname + '/favicon.ico')) 
   .use(morgan('dev')) // logger pour afficher les requêtes entrantes
   .use(bodyParser.json()) //ici on parse toutes les données entrantes dans notre api rest pour les avoir en JSON


sequelize.initDb()//on initialise la base de données


//Import des routes api
require('./src/routes/findAllPokemons')(app); //on passe l'objet app à notre route pour pouvoir utiliser app.get
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);


//Ajout gestion erreur 404
app.use(({res}) => { //ici on utilise le middleware pour gérer les erreurs 404
   const message =  'Impossible de trouver la ressource demandée ! Essayez une autre url';
   res.status(404).json({message});
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`));