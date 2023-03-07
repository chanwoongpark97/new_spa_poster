// 웹 서버에서 MongoDB에 연결
const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/spa_poster")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

mongoose.set("strictQuery", false); // 에러가 뜨면 다음 같은 코드 한줄 추가하면 해결된다.

module.exports = connect;