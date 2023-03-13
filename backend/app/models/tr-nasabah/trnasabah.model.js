module.exports = (sequelize, Sequelize) => {
    const trnasabahDB = sequelize.define("TRANSAKSI_NASABAH", {
        idTransaksiNasabah: {
            field: 'ID_TRANSAKSI_NASABAH',
            // autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        norek: {
            field: 'NOREK',
            type: Sequelize.INTEGER
        },
        tanggal: {
            field: 'TANGGAL',
            type: Sequelize.DATE
        },
        status: {
            field: 'STATUS',
            type: Sequelize.STRING
        },
        uang: {
            field: 'UANG',
            type: Sequelize.INTEGER

        },
        statusKet: {
            field: 'STATUS_KET',
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
            modelName: 'trnasabahDB', // We need to choose the model name,
            tableName: 'TRANSAKSI_NASABAH',
            freezeTableName: true
        });

    // provDB.associate = function (models) {
    //     provDB.belongsTo(models.managerDB, { foreignKey: 'managerId', sourceKey: '' })

    //     provDB.belongsTo(models.deptDB, { foreignKey: 'departmentId' })
    //     provDB.belongsTo(models.jobDB, { foreignKey: 'jobId' })
    // };

    return trnasabahDB;
};

