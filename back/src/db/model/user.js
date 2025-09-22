const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    profilePictureUrl: {
      type: String,
      required: false,
    },
    userAgent: {
      type: Object,
      required: false,
      default: {
        deviceType: "",
        os: "",
        browser: "",
        login: "",
      },
    },
    ipAdd: {
      type: String,
      required: false,
      default: "",
    },
    adsFreePass: {
      type: Object,
      required: false,
    },
    vouchersInDetail: {
      type: Object,
      required: false,
      default: {
        1: [], 
        2: [], 
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
        13: [],
      },
    },
    vouchers: {
      type: Object,
      required: false,
      default: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        13: 0,
      },
    },
    accessToken: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
      default: "user",
    },
    isOldUser: {
      type: Boolean,
      required: false, 
      default: false, 
    },
    purchased: {
      type: Object,
      required: false, 
      default: false,
    },
    isRanked: {
      type: Object,
      required: false,
      default: { VIP: false, COSMOS: false, START: false, NEW: true },
    },
    isInViolation: {
      type: Boolean,
      required: false,
      default: false,
    },
    violationsInDetail: {
      type: Array, 
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
userSchema.index({ email: 1 }, { unique: true });
userSchema.index(
  { updatedAt: 1 }, 
  {
    expireAfterSeconds: 1900800, 
    partialFilterExpression: {
      "adsFreePass.name": "",
      "adsFreePass.expired": "",
      "vouchers.1": 0,
      "vouchers.2": 0,
      "vouchers.3": 0,
      "vouchers.4": 0,
      "vouchers.5": 0,
      "vouchers.6": 0,
      "vouchers.7": 0,
      "vouchers.8": 0,
      "vouchers.9": 0,
      "vouchers.10": 0,
      "vouchers.11": 0,
      "vouchers.13": 0,
    },
    name: "expire_after_3_week(+1_day)_user",
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
