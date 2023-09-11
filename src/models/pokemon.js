const validTypes = ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol', 'Combat', 'Psy'];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : {
            msg : 'Le nom est déjà pris.'
        },
        validate : {
            notNull : { msg : 'Vous devez renseigner un nom'},
            notEmpty : { msg : 'Le npm ne peut pas être vide'},
            max : {
              args : [25],
              msg : 'Le nom ne doit pas dépassé 25 caractères'
            },
            min : {
              args : [1],
              msg : 'Le nom ne peut être inférieur à 1 caractères'
            }
        }
      },
      hp: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate  : {
              isInt : { msg : 'Les points de vie doivent être un entier' },
              notNull : { msg : 'Les points de vie doivent être renseignés' },
          },
          max : {
            args : [999],
            msg : 'Les points de vie ne doivent pas dépassé 999'
          },
          min : {
            args : [0],
            msg : 'Les points de vie ne peuvent être inférieur à 0'
          }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate  : {
            isInt : { msg : 'Les points de dégâts être un entier' },
            notNull : { msg : 'Les points de dégâts être renseignés' },
        },
        max : {
          args : [99],
          msg : 'Les points de dégâts ne doivent pas dépassé 99'
        },
        min : {
          args : [0],
          msg : 'Les points de dégât ne peuvent être inférieur à 0'
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate  : {
            isUrl : { msg : 'la photo doit être un url' },
            notNull : { msg : 'L\n image ne peut pas être vide' },
        }
      },
      types: {
          type: DataTypes.STRING,
          allowNull: false,
          get() {
              return this.getDataValue('types').split(',') //on récupère les types sous forme de tableau
              },
          set(types) {
              this.setDataValue('types', types.join()) //on enregistre les types sous forme de chaîne de caractères séparés par une virgule
          },
          validate  : {

            isTypesValid(value) {
                if(!value) {
                    throw new Error('Les types doivent être renseignés')
                }
                if(value.split(',').length < 1 || value.split(',').length > 3) {
                    throw new Error('Le nombre de types doit être compris entre 1 et 3')
                }
                value.split(',').forEach(type => {
                    if(!validTypes.includes(type)) {
                        throw new Error(`Le type ${type} n'est pas valide`)
                    }
                })
            }
          },
       }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
  }
  