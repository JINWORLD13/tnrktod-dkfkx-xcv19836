const mongoose = require("mongoose");
const { Schema } = mongoose;

const chargeSchema = new Schema(
  {
    orderId: {
      type: String,
      
      required: true,
    },
    paymentKey: {
      type: String,
      required: false,
      
    },
    purchaseToken: {
      
      type: String,
      required: false,
      
    },
    orderName: {
      type: String,
      required: true,
    },
    adsFreePass: {
      type: Object,
      required: false,
    },
    orderHistory: {
      type: Object,
      required: false,
    },
    orderVouchers: {
      type: Array,
      required: false,
    },
    
    refundReceiveAccount: {
      type: Object,
      required: false,
    },
    
    amount: {
      type: Number,
      required: false,
    },
    productId: {
      type: String,
      required: false,
    },
    currency: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    method: {
      type: String,
      required: false,
    },
    packageName: {
      
      type: String,
      required: false,
    },
    apiName: {
      type: String,
      required: false,
    },
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: null, 
    },
    outOfStock: {
      type: Boolean,
      requird: false,
      default: false,
    },
    createdAtForIAP: {
      type: String, 
      required: false,
      expires: 31536000, 
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 31536000, 
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

chargeSchema.index({ userInfo: 1, orderId: 1 }, { unique: true });

chargeSchema.index(
  { createdAt: 1 }, 
  {
    expireAfterSeconds: 31536000,
    partialFilterExpression: { apiName: "Toss" },
    name: "expire_after_1_year_toss",
  }
);

chargeSchema.index(
  { createdAt: 1 }, 
  {
    expireAfterSeconds: 7884000,
    partialFilterExpression: {
      method: "가상계좌",
    },
    name: "expire_after_3_month_toss",
  }
);

chargeSchema.index(
  { createdAt: 1 }, 
  {
    expireAfterSeconds: 7884000,
    partialFilterExpression: {
      method: "card",
    },
    name: "expire_after_3_month_paypal_toss",
  }
);

chargeSchema.index(
  { createdAt: 1 }, 
  {
    expireAfterSeconds: 2628000,
    partialFilterExpression: {
      method: "휴대폰",
    },
    name: "expire_after_1_month_toss",
  }
);

chargeSchema.index(
  { createdAt: 1 }, 
  {
    expireAfterSeconds: 259200,
    partialFilterExpression: {
      productId: "cosmos_vouchers_ads_remover_3d",
    },
    name: "expire_after_3_day_ads_remover_andorid",
  }
);

chargeSchema.index(
  { createdAt: 1 }, 
  {
    expireAfterSeconds: 1200,
    partialFilterExpression: {
      apiName: "Toss(미입금상태)",
    },
    name: "expire_after_20_minutes_toss_unpaid",
  }
);

chargeSchema.index(
  { createdAt: 1 }, 
  {
    expireAfterSeconds: 900,
    partialFilterExpression: { paymentKey: "not yet" },
    name: "expire_after_15_minutes_not_yet",
  }
);

const Charge = mongoose.model("Charge", chargeSchema);

module.exports = Charge;
