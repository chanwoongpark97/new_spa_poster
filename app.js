const express = require('express');
const globalRouter = require("./routes/index.js"); // 라우터 저장 관리소
const cookieParser = require("cookie-parser");

// 웹 서버에서 MongoDB에 연결
const connect = require("./schemas");
connect();

const app = express();
const port = 3002;

// 라우터 연결 (변경 전)
// const postsRouter = require("./routes/posts.js");
// const commentsRouter = require("./routes/comments.js");

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static("assets"));
app.use("/api", [globalRouter]);

app.get('/', (req, res) => {
    res.send('안녕하세요. 게시판 프로젝트 입니다.');
});
  
app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});