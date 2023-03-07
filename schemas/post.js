const mongoose = require("mongoose");

// 게시글 모델 작성
const postsSchema = new mongoose.Schema({
    nickname: { // 작성자
        type: String,
        required: true
    },
    title: { // 제목
        type: String,
        required: true
    },
    content: { // 내용
        type: String,
        required: true
    },
    createdAt: { // 작성날짜
        type: Date,
    },
    updatedAt: { // 수정날짜
        type: Date,
    },
},{ versionKey : false });

// 가상의 postId 값을 할당
postsSchema.virtual("postId").get(function () {
    return this._id.toHexString();
});
  
// user 정보를 JSON으로 형변환 할 때 virtual 값이 출력되도록 설정
postsSchema.set("toJSON", {
    virtuals: true, // JSON 형태로 가공할 때, userId를 출력 시켜준다.
});

module.exports = mongoose.model("Posts", postsSchema);