const { Pokemon } = require('../db/sequelize');
const auth = require('../auth/auth');
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
        .then(pokemon => { //on récupère le pokémon correspondant à l'id passé en paramètre

            if (!pokemon) {
                const message = `Aucun pokémon trouvé avec l'identifiant n°${req.params.id}.`;
                return res.status(404).json({ message });
            }

            const pokemonDeleted = pokemon; //on stocke le pokémon dans une variable
            return Pokemon.destroy({ //on retourne la promesse de la fonction destroy qui supprime le pokémon
                where: { id: pokemon.id } //on précise l'id du pokémon à supprimer
            })

        .then(_ => { //une fois que le pokémon est supprimé, on envoie une réponse avec le pokémon supprimé
            const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
            res.json({message, data: pokemonDeleted })
        })
        .catch(error => {
            res.status(500).json({message: 'Erreur lors de la suppression du pokémon.', data : error })
        });
    })
  })
}