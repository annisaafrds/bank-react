module.exports = (sequelize, Sequelize) => {
    const hakaksessDB = sequelize.define("HAKAKSES", {
        hak_akses_id:{
            field: 'HAK_AKSES_ID',
            primaryKey: true,
            type: Sequelize.DECIMAL(11, 0)

        },
        user_id:  {
            field: 'USER_ID',
             //primaryKey: true,
            type: Sequelize.DECIMAL(11, 0)
        },
        
        role_id:{
            field: 'ROLE_ID',
            // primaryKey: true,
            type: Sequelize.DECIMAL(11, 0)            
        },
        program_name :{
            field: 'PROGRAM_NAME',
            // primaryKey: true,
            type: Sequelize.DECIMAL(2, 0)            
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
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
            allowNull: false,
        },
        updated_by:{

            field: 'UPDATED_BY',
            type: Sequelize.STRING
        }
        //


    }, 
    {
        sequelize, // We need to pass the connection instance
        modelName: 'hakaksessDB', // We need to choose the model name,
        tableName: 'HAK_AKSES'
    })
    hakaksessDB.associate = function(models) {
        hakaksessDB.belongsTo(models.usersDB, {foreignKey: 'user_id',sourceKey: 'user_id'})
        hakaksessDB.belongsTo(models.rolesDB, {foreignKey: 'role_id',sourceKey: 'role_id'})
      };

    return hakaksessDB;
}