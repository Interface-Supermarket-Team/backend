const router = require('express').Router();
const db = require('../db');

//모든 카테고리 조회
router.get('/all',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        const SQL = "select * from category order by id;";
        const connection = db.return_connection();
        
        connection.query(SQL,function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
            console.log("전체 카테고리 정보 조회");
            return res.status(200).json(results)
        })
    }
    catch(err){
        console.error(err.toString());
        return res.status(400).json({
            error: err.toString()
        })
    }

});

//단일 카테고리 조회
router.get('/:id',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const id = req.params.id;
        const SQL = "select * from category where id = ? order by id;";
        const connection = db.return_connection();
        
        connection.query(SQL,[id],function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
            console.log(results[0].name + "카테고리 정보 조회");
            return res.status(200).json({
                id: results[0].id,
                name:results[0].name,
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

//카테고리 등록
router.post('/',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        const name = req.body.name;

        const SQL = "insert into category (name) values (?);";
        const connection = db.return_connection();

        connection.query(SQL,name,function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
            console.log("카테고리 " + name + " 추가");
            return res.status(200).json({})
        })
    }
    catch(err){
        console.error(err.toString());
        return res.status(400).json({
            error: err.toString()
        })
    }

});

//카테고리 수정
router.put('/:id',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        const id = req.params.id;
        const name = req.body.name;

        const SQL = "update category set name = ? where id = ?;";
        const connection = db.return_connection();

        connection.query(SQL,[name,id],function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
            console.log("카테고리 " + id + " 수정");
            return res.status(200).json({})
        })
    }
    catch(err){
        console.error(err.toString());
        return res.status(400).json({
            error: err.toString()
        })
    }

});

//카테고리 삭제
router.delete('/:id',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        const id = req.params.id;
        const SQL = "delete from category where id = ?;";
        const connection = db.return_connection();

        connection.query(SQL,id,function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
            console.log("카테고리 " + id + " 삭제");
            return res.status(200).json({})
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