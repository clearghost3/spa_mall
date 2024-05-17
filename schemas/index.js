import mongoose from "mongoose";

const connection = () => {
    mongoose.connect('mongodb+srv://clearghost:sightdrop5238@express-mongo.kiustf6.mongodb.net/?retryWrites=true&w=majority&appName=Express-mongo',
        {
            dbName: "yun_mall"
        }
    ).catch((err) => {
        console.log("mongoDB에 연결실패 reason:", err);
    }).then(() => {
        console.log("mongoDB에 연결 성공");
    });
};

mongoose.connection.on('error', (err) => {
    console.log("mongoDB에 에러");
});

export default connection;