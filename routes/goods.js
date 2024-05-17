import express from 'express';
import Goods from '../schemas/goods.schemas.js';

const Router = express.Router();

console.log("<===Applyed goodsRouter===>");

//상품 조회==========================================
Router.get('/goods', async (req, res) => {
    const goods = await Goods.find().exec();

    return res.status(200).json({ goods });
});

//상품 상세 조회==========================================
Router.get('/goods/:goodsid', async (req, res) => {
    const { goodsid } = req.params;
    const goods = await Goods.findOne({ _id: goodsid }).exec();

    return res
        .status(200)
        .json({ goods });
});




//상품 게시==========================================
Router.post('/goods', async (req, res) => {

    //클라이언트로부터 정보 전달 받기
    const { name,
        description,
        manager,
        password
    } = req.body;

    //유효성 검사
    if (!manager) {
        return res.status(400).json({ error: 'particular fields are required' });
    };

    if (!name || !description || !manager || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    };

    //정보 저장
    try {
        //현재시간 값을 서버에서 얻어내서 model 인스턴스 에게 전달
        let now = new Date();
        console.log(now, "에 상품정보 생성됨");

        const newgoods = new Goods({ name, description, manager, password, undefined, createdAt: now });
        await newgoods.save();
        return res.status(201).json({ message: "성공적으로 생성되었습니다!" });
    }
    catch (err) {
        return res.status(500).json({ Errormessage: "오류가 발생했습니다 reason:" + err.message });
    }
});

//상품 내용 변경,==========================================
Router.patch('/goods/:goodsid', async (req, res) => {
    const { goodsid } = req.params;
    try {
        const goods = await Goods.findOne({ _id: goodsid }).exec();
    }
    catch (err) {
        return res
            .status(400)
            .json({ Errormessage: "존재하지 않는 상품 정보입니다" });
    };
    const { name, description, manager, status, password
    } = req.body;

    //클라이언트에게 가져온 데이터를 전부 넣어주기
    if (req.body) {
        goods.name = name;
        goods.description = description;
        goods.manager = manager;
        goods.status = status;
        goods.password = password;

        goods.save();
    }
});


Router.delete('/goods/:goodsid',async(res,req) => {
    const { goodsid } = req.params;
    try {
        await Goods.deleteOne({ _id: goodsid });
        return res
            .status(200)
            .json({message:"성공적으로 삭제되었습니다"});
    }
    catch (err) {
        return res
            .status(400)
            .json({ Errormessage: "존재하지 않는 상품 정보입니다" });
    };
})


export default Router;

