const router = require('express').Router();
const { basename } = require('path');
const db = require('../db');

//장바구니 조회
router.get('/',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        const SQL = "Select * from basket order by id desc;";
        const connection = db.return_connection();

        connection.query(SQL,function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }

            const basket = {
                product: results,
                totalprice: 0
            }

            for(let i=0;i<results.length;i++){
                basket.totalprice += results[0].price;
            }

            return res.status(200).json(basket);
        })
    }
    catch(err){
        console.error(err.toString());
        return res.status(400).json({
            error: err.toString()
        })
    }

});

//장바구니 금액 조회
router.get('/price',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        const SQL = "Select ifNULL(sum(price),0) as totalprice from basket;";
        const connection = db.return_connection();

        connection.query(SQL,function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
            return res.status(200).json({
                totalprice: results[0].totalprice
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

//장바구니 담기
router.post('/',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{

        const id = req.body.product.id;
        const spicy = req.body.product.spicy;
        const options = req.body.product.options;
        const cnt = req.body.cnt;

        const SQL = "Select id,name,category,price,image,intro from product where id = ?;";
        const SQL2 = "insert into basket (product,cnt,price) values (?,?,?);";
        const connection = db.return_connection();

        connection.query(SQL,[id],function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
            results[0].spicy = spicy;
            results[0].options = options;
            connection.query(SQL2,[JSON.stringify(results[0]),cnt,results[0].price*cnt],function(err,results,field){
                if(err){
                    console.error(err.toString());
                    return res.status(400).json({
                        error: err.toString()
                    })
                }
                return res.status(200).json({});
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


//장바구니 초기화
router.delete('/reset',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        const SQL = "truncate basket;";
        const connection = db.return_connection();

        connection.query(SQL,function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
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

//장바구니 물품 삭제
router.delete('/:id',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");

    try{
        const id = req.params.id;

        const SQL = "delete from basket where id = ?;";
        const connection = db.return_connection();

        connection.query(SQL,[id],function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
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