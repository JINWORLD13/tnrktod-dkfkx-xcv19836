const mongoose = require("mongoose");
const { Schema } = mongoose;
const violationSchema = new Schema(
  {
    violationName: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: false,
    },
    refundQuantity: {
      type: String,
      required: false,
    },
    remainingQuantity: {
      type: String,
      required: false,
    },
    violationDate: {
      type: Date,
      required: false,
      default: Date.now,
    },
    violationDescription: {
      type: String,
      required: false,
    },
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null, 
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Violation = mongoose.model("Violation", violationSchema);
module.exports = Violation;
