module.exports = (sequelize, Sequelize) => {

    const menusDB = sequelize.define("MENUS", {
        menu_id :{
            field: 'MENU_ID',
             primaryKey: true,
            type: Sequelize.DECIMAL(11, 0)            
        },
        nama :{
            field: 'NAMA',
             primaryKey: true,
            type: Sequelize.DECIMAL(11, 0)            
        },
        icon :{
            field: 'ICON',
             primaryKey: true,
            type: Sequelize.DECIMAL(11, 0)            
        },
        url :{
            field: 'URL',
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
        modelName: 'menusDB', // We need to choose the model name,
        tableName: 'MENU'
     })
     menusDB.associate = function(models) {
        menusDB.belongsTo(models.roles_menuDB, {foreignKey: 'menu_id',sourceKey: 'menu_id'})
        //hakaksessDB.belongsToMany(rolesDBrolesDB, {foreignKey: 'role_id',sourceKey: 'role_id'})
    };
      return menusDB
    }