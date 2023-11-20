const router = require('express').Router();
const db = require('../db');

//상품 등록
router.post('/',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        const name = req.body.name;
        const category = req.body.category;
        const price = req.body.price;
        const image = req.body.image;
        const intro = req.body.intro;
        const main = req.body.main;

        const SQL = "Insert into product (name,category,price,image,intro,main)values (?,?,?,?,?,?);";
        const connection = db.return_connection();
        
        connection.query(SQL,[name,category,price,image,intro,main],function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
            console.log("상품이 등록됐습니다.");
            return res.status(200).json({
                status: 200,
                message: "상품이 등록됐습니다."
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


//전체 상품 조회
router.get('/all',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        const SQL = "Select * from product;";
        const connection = db.return_connection();

        connection.query(SQL,function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
            console.log("상품 전체 조회");
            return res.status(200).json({
                status: 200,
                message: "상품 전체 조회",
                productList: results
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

//메인 상품 조회
router.get('/main',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{

        const SQL = "Select * from product where main = 1;";
        const connection = db.return_connection();

        connection.query(SQL,function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
            console.log("메인 상품 조회");
            return res.status(200).json({
                status: 200,
                message: "메인 상품 조회",
                productList: results
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

//카테고리별 상품 조회
router.get('/category/:category',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{

        const category = req.params.category;

        const SQL = "Select * from product where category = ?;";
        const connection = db.return_connection();

        connection.query(SQL,category,function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
            console.log(category + " 조회");
            return res.status(200).json({
                status: 200,
                message: category + " 조회",
                productList: results
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

//이름별 상품 조회
router.get('/name/:name',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        
        const name = req.params.name+'%';

        const SQL = "Select * from product where name Like ?;";
        const connection = db.return_connection();

        connection.query(SQL,name,function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
            console.log(name + " 조회");
            return res.status(200).json({
                status: 200,
                message: name + " 조회",
                productList: results
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

//단일 상품 조회
router.get('/:id',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        const id = req.params.id;

        const SQL = "Select * from product where id = ?;";
        const connection = db.return_connection();

        connection.query(SQL,[id],function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
            console.log("상품 " + id + " 조회");
            return res.status(200).json({
                status: 200,
                message: "상품 " + id + " 조회",
                id: id,
                name: results[0].name,
                category: results[0].category,
                price: results[0].price,
                image: results[0].image,
                intro: results[0].intro
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


//단일 상품 삭제
router.delete('/:id',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        const id = req.params.id;

        const SQL = "Delete from product where id = ?;";
        const connection = db.return_connection();

        connection.query(SQL,[id],function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }

            console.log("상품 " + id + " 삭제");
            return res.status(200).json({
                status: 200,
                message: "상품 " + id + " 삭제"
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

//단일 상품 수정
router.put('/:id',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        const id = req.params.id;
        const name = req.body.name;
        const category = req.body.category;
        const price = req.body.price;
        const image = req.body.image;
        const intro = req.body.intro;
        const main = req.body.main;

        const SQL = "update product set name = ? , category = ? , price = ? , image = ? , intro = ? , main = ? where id = ?;";
        const connection = db.return_connection();

        connection.query(SQL,[name,category,price,image,intro,main,id],function(err,results,field){
            if(err){
                 console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }

            console.log("상품 " + name + " 수정");
            return res.status(200).json({
                status: 200,
                message: "상품 " + name + " 수정"
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