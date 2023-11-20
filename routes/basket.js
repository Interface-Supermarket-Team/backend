const router = require('express').Router();
const db = require('../db');

//장바구니 조회
router.get('/',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        
    }
    catch(err){
        console.error(err.toString());
        return res.status(400).json({
            error: err.toString()
        })
    }

});

module.exports = router;