import express from 'express';
import mongoose from 'mongoose';
import goodsRouter from './routes/goods.js';
import connect from "./schemas/index.js";

const PORT=3000;
const app=express();

connect();

//req.body에 접근해 body의 데이터로 사용하기 위함
app.use(express.json());                            //백엔드의 방법
app.use(express.urlencoded({extended:true}));       //프론트엔드의 방법

app.get('/',(req,res) =>{
    return res.json({Message:"This mainpage"});
});

app.use('/api',[goodsRouter]);



app.listen(PORT,()=>{
    console.log(PORT+"번 포트에서 서버가 열렸어요!");
});