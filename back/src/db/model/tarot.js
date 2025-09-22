const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const THREE_MONTHS_SECONDS = 60 * 60 * 24 * 90;
const tarotSchema = new Schema(
  {
    questionInfo: {
      theme: { type: String, required: false },
      subject: { type: String, required: false },
      object: { type: String, required: false },
      relationship: { type: String, required: false },
      situation: { type: String, required: false },
      question: { type: String, required: false },
      firstOption: { type: String, required: false },
      secondOption: { type: String, required: false },
    },
    spreadInfo: {
      spreadTitle: { type: String, required: true },
      cardCount: { type: Number, required: true },
      spreadListNumber: { type: Number, required: true },
      selectedTarotCardsArr: {
        type: Array,
        of: {
          type: String,
          required: false,
        },
        required: true,
      },
    },
    answer: { type: String, required: false, default: "" },
    type: { type: String, required: true },
    language: { type: String, required: false },
    userInfo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timeOfCounselling: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
tarotSchema.index(
  { "questionInfo.question": 1, timeOfCounselling: 1 },
  { unique: true }
);


// TTL 인덱스
tarotSchema.index(
  { createdAt: 1 }, // 오름차순(오래된 거부터 searching) // createdAt 기준으로 TTL 계산
  {
    expireAfterSeconds: THREE_MONTHS_SECONDS,
    name: "expire_after_3_month_tarot",
  }
);
const Tarot = mongoose.model("Tarot", tarotSchema);
module.exports = Tarot;
