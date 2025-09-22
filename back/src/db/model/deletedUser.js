const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const deletedUserSchema = new Schema(
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
deletedUserSchema.index(
  { createdAt: 1 }, // 오름차순(오래된 거부터 searching)
  {
    expireAfterSeconds: 2628000,
    partialFilterExpression: {
      role: "user",
      isOldUser: false,
    },
    name: "expire_after_1_month_deletedUser",
  }
);
deletedUserSchema.index(
  { createdAt: 1 }, // 오름차순(오래된 거부터 searching)
  {
    expireAfterSeconds: 300,
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
      isOldUser: false,
    },
    name: "expire_after_5_minutes_deletedUser",
  }
);
const DeletedUser = mongoose.model("DeletedUser", deletedUserSchema);
module.exports = DeletedUser;

// address: {
//   type: new Schema(
//     {
//       postalCode: String,
//       address1: String,
//       address2: String,
//     },
//     {
//       _id: false,
//     }
//   ),
//   required: false,
// },

// {
//   collection: "users",
//   timestamps: true,
//   versionKey : false,
// }
