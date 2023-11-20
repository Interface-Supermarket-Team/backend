const router = require('express').Router();
const db = require('../db');

//장바구니 조회
router.get('/wait',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        const SQL = "Select count(*) as cnt from order where status='ready';";
        const connection = db.return_connection();

        connection.query(SQL,function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }

            return res.status(200).json({
                cnt: results[0].cnt
            });
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