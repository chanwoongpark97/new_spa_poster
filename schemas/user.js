const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nickname: { // nickname 필드
    type: String,
    required: true,
    unique: true,
    trim: true, // 공백제거
    minlength: 3,
    match: /^[a-zA-Z0-9]+$/
  },
  password: { // password 필드
    type: String,
    required: true,
    minlength: 4,
  },
});

// 가상의 userId 값을 할당
UserSchema.virtual("userId").get(function () {
  return this._id.toHexString();
});

// user 정보를 JSON으로 형변환 할 때 virtual 값이 출력되도록 설정
UserSchema.set("toJSON", {
  virtuals: true, // JSON 형태로 가공할 때, userId를 출력 시켜준다.
});

module.exports = mongoose.model("User", UserSchema);