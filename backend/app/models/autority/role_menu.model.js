module.exports = (sequelize, Sequelize) => {


const roles_menuDB = sequelize.define("ROLES_MENU", {
    role_menu_id :{
        field: 'ROLE_MENU_ID',
         primaryKey: true,
        type: Sequelize.DECIMAL(11, 0)            
    },
    role_id :{
        field: 'ROLE_ID',
//         primaryKey: true,
        type: Sequelize.DECIMAL(11, 0)            
    },
    menu_id :{
        field: 'MENU_ID',
        primaryKey: true,
        type: Sequelize.DECIMAL(11, 0)            
    },
    is_active :{
        field: 'IS_ACTIVE',
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
    modelName: 'roles_menuDB', // We need to choose the model name,
    tableName: 'ROLE_MENU'
 })
 roles_menuDB.associate = function(models) {
    roles_menuDB.hasOne(models.rolesDB, {foreignKey: 'role_id',sourceKey: 'role_id'})
    roles_menuDB.hasOne(models.menusDB, {foreignKey: 'menu_id',sourceKey: 'menu_id'})
    //hakaksessDB.belongsToMany(rolesDBrolesDB, {foreignKey: 'role_id',sourceKey: 'role_id'})
};
  return roles_menuDB
}