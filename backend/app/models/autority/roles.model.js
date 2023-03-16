module.exports = (sequelize, Sequelize) => {

const rolesDB = sequelize.define("ROLES", {
    role_id :{
        field: 'ROLE_ID',
         primaryKey: true,
        type: Sequelize.DECIMAL(11, 0)            
    },
    nama :{
        field: 'NAMA',
         primaryKey: true,
        type: Sequelize.DECIMAL(11, 0)            
    },
    program_name :{
        field: 'PROGRAM_NAME',
        // primaryKey: true,
        type: Sequelize.DECIMAL(11, 0)            
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
    modelName: 'rolesDB', // We need to choose the model name,
    tableName: 'ROLES'
  })

rolesDB.associate = function(models) {
    rolesDB.belongsTo(models.hakaksessDB, {foreignKey: 'role_id',sourceKey: 'role_id'})
    rolesDB.hasMany(models.roles_menuDB, {foreignKey: 'role_id',sourceKey: 'role_id'})
    //hakaksessDB.belongsToMany(rolesDBrolesDB, {foreignKey: 'role_id',sourceKey: 'role_id'})
};

  return rolesDB
}
