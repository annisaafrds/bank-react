module.exports = (sequelize, Sequelize) => {
    const usersDB = sequelize.define("USERSDB", {
        user_id :  {
            field: 'USER_ID',
            //autoIncrement: true,
            primaryKey: true,
            type: Sequelize.DECIMAL(11, 0)
        },
        username:{

            field: 'USERNAME',
            type: Sequelize.STRING
        },
        password:{

            field: 'PASSWORD',
            type: Sequelize.STRING
        },
        nama:{

            field: 'NAMA',
            type: Sequelize.STRING
        },
        alamat:{

            field: 'ALAMAT',
            type: Sequelize.STRING
        },
        email:{

            field: 'EMAIL',
            type: Sequelize.STRING
        },
        telp:{

            field: 'TELP',
            type: Sequelize.STRING
        },
        program_name:{

            field: 'PROGRAM_NAME',
            type: Sequelize.STRING
        },
        
        create_date:{

            field: 'CREATED_DATE',
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        },
        created_by:{

            field: 'CREATED_BY',
            type: Sequelize.STRING
        },

        updated_date:{

            field: 'UPDATED_DATE',
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        },
        updated_by:{

            field: 'UPDATED_BY',
            type: Sequelize.STRING
        }
        //

    }, {
        sequelize, // We need to pass the connection instance
        modelName: 'usersDB', // We need to choose the model name,
        tableName: 'USERS'
      })
//    });
    usersDB.associate = function(models) {
        usersDB.hasMany(models.hakaksessDB, {foreignKey: 'user_id',sourceKey: 'user_id'})
      };
    
    return usersDB;
  };





