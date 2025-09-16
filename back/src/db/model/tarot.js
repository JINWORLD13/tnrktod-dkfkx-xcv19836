const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const currentDate = new Date();
const threeMonthsLater = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 3,
  currentDate.getDate()
);

let remainingTime = Math.floor((threeMonthsLater - currentDate) / 1000);

const tarotSchema = new Schema(
  {
    questionInfo: {
      type: Object,
      theme: {
        type: String,
        required: false,
      },
      subject: {
        type: String,
        required: false,
      },
      object: {
        type: String,
        required: false,
      },
      relationship: {
        type: String,
        required: false,
      },
      situation: {
        type: String,
        required: false,
      },
      question: {
        type: String,
        required: false,
      },
      firstOption: {
        type: String,
        required: false,
      },
      secondOption: {
        type: String,
        required: false,
      },
      required: true,
      
    },
    spreadInfo: {
      type: Object,
      spreadTitle: {
        type: String,
        requird: true,
      },
      cardCount: {
        type: Number,
        requird: true,
      },
      selectedTarotCardsArr: {
        type: Array,
        
        of: {
          type: String,
          required: false,
        },
        required: true,
      },
      requird: true,
    },
    answer: {
      type: String,
      required: true,
      default: "",
    },
    type: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      requried: false,
    },
    userInfo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timeOfCounselling: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

tarotSchema.index(
  { createdAt: 1 }, 
  {
    expireAfterSeconds: remainingTime,
    name: "expire_after_3_month_tarot",
  }
);

const Tarot = mongoose.model("Tarot", tarotSchema);
module.exports = Tarot;
