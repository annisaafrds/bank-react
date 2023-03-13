module.exports = (sequelize, Sequelize) => {
    const historyDB = sequelize.define("HISTORY_BANK", {
        idHistoryBank: {
            field: 'ID_HISTORY_BANK',
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        tanggal: {
            field: 'TANGGAL',
            type: Sequelize.DATE
        },
        norek: {
            field: 'NOREK',
            type: Sequelize.INTEGER
        },
        statusKet: {
            field: 'STATUS_KET',
            type: Sequelize.INTEGER
        },
        nama: {
            field: 'NAMA',
            type: Sequelize.INTEGER
        },
        uang: {
            field: 'UANG',
            type: Sequelize.INTEGER

        },
        /**/
        norekDituju: {
            field: 'NOREK_DITUJU',
            type: Sequelize.INTEGER,
        },/**/
        nomorTlp: {
            field: 'NO_TLP',
            type: Sequelize.INTEGER,
        },
    },
        {
            sequelize, // We need to pass the connection instance
            modelName: 'historyDB', // We need to choose the model name,
            tableName: 'HISTORY_BANK',
            freezeTableName: true
        });

    // provDB.associate = function (models) {
    //     provDB.belongsTo(models.managerDB, { foreignKey: 'managerId', sourceKey: '' })

    //     provDB.belongsTo(models.deptDB, { foreignKey: 'departmentId' })
    //     provDB.belongsTo(models.jobDB, { foreignKey: 'jobId' })
    // };

    return historyDB;
};

