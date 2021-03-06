const Post = require('../models/postModel')
var express = require('express');
var router = express.Router();

/* GET users listing. */
// 取得所有資料
router.get('/', async (req, res, next)=> {
    const allPost = await Post.find()
    res.status(200).json({
        allPost
    })
});
// 刪除所有資料
router.delete('/', async (req, res, next) => {
    const post = await Post.deleteMany({})
    res.status(200).json({
        "status" : "success",
        "post" : post
    })
  });
// 刪除單筆資料
router.delete('/:id', async (req, res, next) => {
const id = req.params.id
try {
    const post = await Post.findByIdAndDelete(id)
    res.status(200).json({
        "status" : "success",
        post
    })
}
catch(error){
    res.status(400).json({
        "status" : "找無此路由 或 ID有誤",
        "error" : error
    })
}
});

// 新增單筆資料
router.post('/', async (req, res, next) => {
    try{
        const newPost = await Post.create(req.body)
        res.status(200).json({
            "status" : "success",
            newPost
        })
    }
    catch(error){
        res.status(400).json({
            "status" : "找無此路由 或 ID有誤",
            "error" : error
        })
    }
});
// 修改單筆資料
router.patch('/:id', async (req,res,next) => {
    const id = req.params.id
    const data = req.body
    console.log(id,data)
    try{
        const newPost = await Post.findByIdAndUpdate(id,data)
        res.status(200).json({
            "status" : "success",
            newPost
        })
    }
    catch(error){
        res.status(400).json({
            "status" : "找無此路由 或 ID有誤",
            "error" : error
        }) 
    }
})
module.exports = router;