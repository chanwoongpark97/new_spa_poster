const mongoose = require("mongoose");

// 댓글 모델 작성
const commentsSchema = new mongoose.Schema({
    postId : { // 해당 게시글
        type: String,
        required : true
    },
    nickname: { // 작성자
        type: String,
        required: true
    },
    comment: { // 댓글내용
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

// 가상의 commentId 값을 할당
commentsSchema.virtual("commentId").get(function () {
    return this._id.toHexString();
});
  
// user 정보를 JSON으로 형변환 할 때 virtual 값이 출력되도록 설정
commentsSchema.set("toJSON", {
    virtuals: true, // JSON 형태로 가공할 때, userId를 출력 시켜준다.
});

module.exports = mongoose.model("Comments", commentsSchema);