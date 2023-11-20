const router = require('express').Router();
const db = require('../db');

//가게 조회
router.get('/:id',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    const id = req.params.id;

    try{
        const SQL = "select * from market where id = ? order by id;";
        const connection = db.return_connection();
        
        connection.query(SQL,[id],function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
            console.log(results[0].name + "가게 정보 조회");
            return res.status(200).json({
                id: results[0].id,
                name:results[0].name,
                info:results[0].info,
                category:results[0].category
            })
        })
    }
    catch(err){
        console.error(err.toString());
        return res.status(400).json({
            error: err.toString()
        })
    }

});

module.exports = router;