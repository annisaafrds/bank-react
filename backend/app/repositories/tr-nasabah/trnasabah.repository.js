function trnasabahRepository(db) {


    const getOptionstrnasabah = (condition, limit, offset) => {
        //console.log("Mysql", db.sequelize.whereQuery);    
        return db.trnasabahDB.findAndCountAll({
            attributes: [
                'idTransaksiNasabah',
                //'DEPT.departmentName'
                //[db.sequelize.col('DEPT.departmentName'),'departmentName']
                'norek',
                'tanggal',
                'status',
                'uang',
                'statusKet',
                'norekDituju',
                'nomorTlp'


                //                ['EMPNO','value'],['ENAME','label'],
            ],
            where: {
                //'$DEPT.DEPTNO$' : 30, 
                ...condition
            },
            raw: true,
            //            nest : true,
            //            plain: true,

        });
    }

    const gettrnasabah = (condition, limit, offset) => {

        return db.trnasabahDB.findAndCountAll({
            // distinct: true,


            attributes:
                [
                    'idTransaksiNasabah',
                    //'DEPT.departmentName'
                    //[db.sequelize.col('DEPT.departmentName'),'departmentName']
                    'norek',
                    'tanggal',
                    'status',
                    'uang',
                    'statusKet',
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
                'idTransaksiNasabah'
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

    // const getMax = () => {

    //     try {
    //         const max = db.trnasabahDB.findAll({
    //             attributes: [
    //                 //db.sequelize.fn('MAX', db.sequelize.col('EMPLOYEE_ID'))
    //                 [db.sequelize.fn('MAX', db.sequelize.literal('trnasabahINSI_ID')), "trnasabah"]
    //             ],
    //             raw: true,
    //             nest: true,
    //             plain: true,

    //         });
    //         return max;

    //     } catch (err) {
    //         const errMessage = err.message || "Some error occurred while input trnasabah";
    //         if (err.original !== undefined) {
    //             console.log("err.original.code", err.original.code);
    //             console.log("err.message", err.message);
    //             res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
    //         } else {
    //             res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
    //         }
    //     }

    // }
    const inserttrnasabah = (trnasabahData, tr) => {

        const inserttrnasabah = db.trnasabahDB.create(trnasabahData,
            {
                transaction: tr
            }
        );
        return inserttrnasabah
    }

    //db.empDB.create
    const updatetrnasabah = (idTransaksiNasabahPrm, trnasabahData, tr) => {
        const updatetrnasabah = db.trnasabahDB.update(trnasabahData,
            {
                where: {
                    idTransaksiNasabah: idTransaksiNasabahPrm,
                },

                transaction: tr
            }
        );
        return updatetrnasabah

    }

    const deletetrnasabah = (idTransaksiNasabahPrm, tr) => {

        const deletetrnasabah = db.trnasabahDB.destroy(
            {
                where: {
                    idTransaksiNasabah: idTransaksiNasabahPrm,
                },

                transaction: tr
            }
        );
        return deletetrnasabah

    }

    return {
        getOptionstrnasabah,
        inserttrnasabah,
        gettrnasabah,
        // getMax,
        updatetrnasabah,
        deletetrnasabah
    }
}


module.exports = trnasabahRepository