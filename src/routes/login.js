const express = require('express');
const bcrypt = require('bcrypt');

const { User } = require('../db/sequelize');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');
  
module.exports = (app) => {
    app.post('/api/login', (req, res) => {
  
        User.findOne({ where: { username: req.body.username } })
            .then(user => {
                if(!user) {
                    const message = `L'utilisateur demandé n'existe pas.`
                    return res.status(404).json({ message })
                }
                bcrypt.compare(req.body.password, user.password)
                    .then(isPasswordValid => {
                        if(!isPasswordValid) {
                            const message = `Le mot de passe est invalide.`
                            return res.json({ message, data: user })
                        }

                
                        const token = jwt.sign(
                            { userId: user.id },
                            privateKey,
                            { expiresIn: '24h' }
                        )
                        const message = 'Vous êtes connecté.'
                        res.json({ message, data: user, token })
                    })
            })
            .catch(error => {
                res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur.', error })
            })
    })
}