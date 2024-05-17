import mongoose from "mongoose";

const goods={
    name: {
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    },
    manager: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true
    },
    status: {
        type:String,
    }
    ,
    createdAt: {
        type:Date,
        required:true
    },
    updatedAt: {
        type:Date,

    }
}

const goods_schema=mongoose.model('Goods',goods);

export default goods_schema;