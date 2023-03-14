function historyRepository(db) {


    const getOptionshistory = (condition, limit, offset) => {
        //console.log("Mysql", db.sequelize.whereQuery);    
        return db.historyDB.findAndCountAll({
            attributes: [
                'idHistoryBank',
                //'DEPT.departmentName'
                //[db.sequelize.col('DEPT.departmentName'),'departmentName']
                'tanggal',
                'norek',
                'statusKet',
                'nama',
                'uang',
                'norekDituju',
                'nomorTlp'


                //                ['EMPNO','value'],['ENAME','label'],
            ],
            where: {
                //'$DEPT.DEPTNO$' : 30, 
                ...condition
            },
            limit,
            offset,
            raw: true,
            nest: true,
            plain: false,
            //            nest : true,
            //            plain: true,

        });
    }

    const gethistory = (condition, limit, offset) => {

        return db.historyDB.findAndCountAll({
            // distinct: true,


            attributes:
                [
                    'idHistoryBank',
                    //'DEPT.departmentName'
                    //[db.sequelize.col('DEPT.departmentName'),'departmentName']
                    'tanggal',
                    'norek',
                    'statusKet',
                    'nama',
                    'uang',
                    'norekDituju',
                    'nomorTlp'


                ],

            /**/

            /* */

            //group: ["EMP.EMPLOYEE_ID"],

            /**/
            where: {
                //'$deptDB.DEPARTMENT_NAME$' : 100,    
                ...condition
            },//
            order: [
                'idHistoryBank'
            ],
            limit,
            offset,
            raw: true,
            nest: true,
            plain: false,
            //mapToModel: false,
            //distinct :true

        });
    }

    
    const inserthistory = (historyData, tr) => {

        const inserthistory = db.historyDB.create(historyData,
            {
                transaction: tr
            }
        );
        return inserthistory
    }

    //db.empDB.create
    const updatehistory = (idHistoryBankPrm, historyData, tr) => {
        const updatehistory = db.historyDB.update(historyData,
            {
                where: {
                    idHistoryBank: idHistoryBankPrm,
                },

                transaction: tr
            }
        );
        return updatehistory

    }

    const deletehistory = (idHistoryBankPrm, tr) => {

        const deletehistory = db.historyDB.destroy(
            {
                where: {
                    idHistoryBank: idHistoryBankPrm,
                },

                transaction: tr
            }
        );
        return deletehistory

    }

    return {
        getOptionshistory,
        inserthistory,
        gethistory,
        // getMax,
        updatehistory,
        deletehistory,
    }
}


module.exports = historyRepository