function masterpelangganRepository(db) {


    const getOptionsMasterPelanggan = (condition, limit, offset) => {
        //console.log("Mysql", db.sequelize.whereQuery);    
        return db.masterpelangganDB.findAndCountAll({
            attributes:[
                'idPelanggan',
                'nama',
                'noTelp',
                'alamat',
                'userId',
                //'DEPT.departmentName'
                //[db.sequelize.col('DEPT.departmentName'),'departmentName']
                

                
//                ['EMPNO','value'],['ENAME','label'],
      ],
            where : {
                //'$DEPT.DEPTNO$' : 30, 
                ... condition
            },
            raw : true,
//            nest : true,
//            plain: true,

        });
    }

    const getById = async (idPelanggan) => {
        const condition = { idPelanggan };
        const limit = 10;
        const offset = 0;
      
        try {
          const record = await db.masterpelangganDB.findOne({
            where: condition,
            limit: limit,
            offset: offset
          });
          return record;
        } catch (error) {
          console.error(error);
          return null;
        }
    };

    const getMasterPelanggan = (condition, limit, offset) => {
          
        return db.masterpelangganDB.findAndCountAll({
           // distinct: true,
           
                  
      attributes:
            [
                'idPelanggan',
                'nama',
                'noTelp',
                'alamat',
                'userId',
            ],
        },
       {
        //     attributes:['departmentId','departmentName'//'KODEATASAN',//'MANAGERNAME'
            
        //     ],//},//},
        //     model: db.deptDB,
        //    as:'DEPT', 
        //    required:true,
        //    where : {
        //     //'$deptDB.DEPARTMENT_NAME$' : 100,    
        //     //... condition
        //    }
        //    //where : {EMPNO : 20 },

        },
        {
//  //            attributes:['jobID','jobName'//'KODEATASAN',//'MANAGERNAME'
             
// //             ],//},//},
//              model: db.jobDB,
//             as:'JOB', 
//             required:true,
 
//             //where : {EMPNO : 20 },
 
        //  }],
         
            //group: ["EMP.EMPLOYEE_ID"],

         /**/
       where : {
        //'$deptDB.DEPARTMENT_NAME$' : 100,    
        ... condition
       },//
       order :[
        'idPelanggan'
       ],
    //    limit, 
       offset,
       raw : true,
            nest : true,
            plain: false,
            //mapToModel: false,
            //distinct :true

        });
    }

    // const getMax=()=>
    // {
        
    //     try{
    //         const max= db.masterpelangganDB.findAll({
    //             attributes: [
    //                 //db.sequelize.fn('MAX', db.sequelize.col('EMPLOYEE_ID'))
    //                 [db.sequelize.fn('MAX', db.sequelize.literal('ID_PELANGGAN')),"masterpelanggan"]
    //             ],       
    //             raw : true,
    //             nest : true,
    //             plain: true,
    
    //           }) ;
    //           return max;
    
    //       }catch(err)
    //     {
    //         const errMessage = err.message || "Some error occurred while input MASTER PELANGGAN";
    //         if(err.original !== undefined) {
    //             console.log("err.original.code",err.original.code);
    //             console.log("err.message",err.message);
    //             res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
    //         } else {
    //             res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
    //         }
    //     }
            
    // }
    const insertMasterPelanggan = (masterpelangganData, tr) => {
        
        const insertmasterpelanggan = db.masterpelangganDB.create(masterpelangganData,
            {
              transaction:tr
            }
        );
        return insertmasterpelanggan
    }

    //db.empDB.create
    const updateMasterPelanggan =(idPelangganPrm, masterpelangganData,tr)=>{
        const updatemasterpelanggan = db.masterpelangganDB.update(masterpelangganData,
            {
                where: {
                    idPelanggan : idPelangganPrm,
                },
 
              transaction:tr
            }
         );
         return updatemasterpelanggan

    }

    const deleteMasterPelanggan =(idPelangganPrm,tr)=>{
        
        const deletemasterpelanggan = db.masterpelangganDB.destroy(
            {
                where: {
                    idPelanggan : idPelangganPrm,
                },
 
              transaction:tr
            }
         );
         return deletemasterpelanggan

    }
 
    return {
        getOptionsMasterPelanggan,
        insertMasterPelanggan,
        getMasterPelanggan,
        // getMax,
        getById,
        updateMasterPelanggan,
        deleteMasterPelanggan
    }
}


module.exports = masterpelangganRepository