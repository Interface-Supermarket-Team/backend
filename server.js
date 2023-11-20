const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

const productRouter = require('./routes/product');
const marketRouter = require('./routes/market');
const categoryRouter = require('./routes/category');

const db = require('./db');

app.use(bodyParser.json());

db.connect();

let corsOptions = {
    origin: ['*', 'null'],
    credentials: true
}

app.use(cors(corsOptions));

app.use('/product',productRouter);
app.use('/market',marketRouter);
app.use('/category',categoryRouter);

app.get('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    return res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
})

//1시간 주기로 MySQL Connection 유지용 쿼리 보내기
const mysql_Connect_Maintenance = setInterval(() => {
    const connection = db.return_connection();
    connection.query("SELECT 1");
}, 360000); //10분