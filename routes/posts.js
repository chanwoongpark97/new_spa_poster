const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post.js");
const authMiddleware = require("../middlewares/auth-middleware.js")

// 게시글 작성 API
router.post('/posts', authMiddleware, async(req, res) => {
    try {
        const {title, content} = req.body; // 제목, 내용 입력
        const user = res.locals.user; // 토큰을 검사하여, 유효한 토큰일 경우에만 게시글 작성 가능
        // 제목 미입력
        if (!title) {
            res.status(412).json({
                errorMessage: "게시글 제목의 형식이 일치하지 않습니다."
            });
            return;
        }
        // 내용 미입력
        if (!content) {
            res.status(412).json({
                errorMessage: "게시글 내용의 형식이 일치하지 않습니다."
            });
            return;
        }
        // 게시글 생성
        await Posts.create({
            title: title,
            content: content,
            nickname: user.nickname,
            createdAt: new Date(),
            updatedAt: new Date() 
        });

        res.status(201).json({ message: "게시글 작성에 성공하였습니다." });
    } catch(err) {
        res.status(400).json({
            errorMessage: "게시글 작성에 실패했습니다."
        });
        return;
    }
});

// 게시글 조회 API
router.get("/posts", async(req, res) => {
    try {
        const posts = await Posts.find()
        .sort("-createdAt"); // 게시날짜 내림차순 정렬

        res.status(200).json({ posts });
    } catch(err) {
        res.status(400).json({
            errorMessage: "게시글 조회에 실패했습니다."
        });
        return;
    }
});

// 게시글 상세 조회 API
router.get("/posts/:postId", async(req, res) => {
    try {
        const { postId } = req.params;
        const posts = await Posts.findOne({_id : postId})

        res.status(200).json({ posts });
    } catch(err) {
        res.status(400).json({
            errorMessage: "게시글 조회에 실패했습니다."
        });
        return;
    }
});

// 게시글 수정 API
router.put("/posts/:postId", authMiddleware, async(req, res) => {
    try {
        const { postId } = req.params;
        const { title, content } = req.body;
        const user = res.locals.user; // 토큰을 검사하여, 유효한 토큰일 경우에만 게시글 작성 가능
        // console.log(user);        
        const updateData = await Posts.findOne({ _id : postId });
        // 데이터 형식이 올바르지 않음
        if (!updateData) {
            res.status(412).json({
                errorMessage: "데이터 형식이 올바르지 않습니다."
            });
            return;
        }
        // 제목 미입력
        if (!title) {
            res.status(412).json({
                errorMessage: "게시글 제목의 형식이 일치하지 않습니다."
            });
            return;
        }
        // 내용 미입력
        if (!content) {
            res.status(412).json({
                errorMessage: "게시글 내용의 형식이 일치하지 않습니다."
            });
            return;
        }
        // 로그인한 회원의 닉네임과 해당 게시글 작성한 닉네임이 다른 경우
        if (updateData.nickname !== user.nickname)  {
            res.status(403).json({
                errorMessage: "게시글 수정의 권한이 존재하지 않습니다."
            });
            return;
        }
        // 수정할 게시글의 제목, 내용, 업데이트 날짜 수정
        await Posts.updateOne(
            {_id: postId},
            {$set: {title: title, content: content, updatedAt: new Date()}}
            // {$set: {content: content}} -> 수정 전 코드
        )
        // 게시글 수정
        if (updateData) {
            res.status(200).json({ message: "게시글을 수정하였습니다." });
            return;
        } else {
            res.status(401).json({ errorMessage: "게시글이 정상적으로 수정되지 않았습니다." });
            return;
        }
    } catch(err) {
        res.status(400).json({
            errorMessage: "게시글 수정에 실패했습니다."
        });
        return;
    }
});

// 게시글 삭제 API
router.delete("/posts/:postId", authMiddleware, async(req, res) => {
    try {
        const { postId } = req.params;
        const user = res.locals.user; // 토큰을 검사하여, 유효한 토큰일 경우에만 게시글 작성 가능
        // console.log(user);
        const deleteData = await Posts.findOne({ _id : postId });
        // 게시글이 존재하지 않는 경우
        if (!deleteData) {
            res.status(404).json({
                errorMessage: "게시글이 존재하지 않습니다."
            });
            return;
        }
        // 로그인한 회원의 닉네임과 해당 게시글 작성한 닉네임이 다른 경우
        if (deleteData.nickname !== user.nickname)  {
            res.status(403).json({
                errorMessage: "게시글 삭제의 권한이 존재하지 않습니다."
            });
            return;
        }
        // 삭제할 게시글 조회
        await Posts.deleteOne(
            {_id: postId},
        )
        // 게시글 삭제
        if (deleteData) {
            res.status(200).json({ message: "게시글을 삭제하였습니다." });
            return;
        } else {
            res.status(401).json({ errorMessage: "게시글이 정상적으로 삭제되지 않았습니다." });
            return;
        }
    } catch(err) {
        res.status(400).json({
            errorMessage: "게시글 삭제에 실패했습니다."
        });
        return;
    }
});

module.exports = router;