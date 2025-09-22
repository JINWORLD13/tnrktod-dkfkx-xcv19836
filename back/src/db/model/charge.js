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
    },
    outOfStock: {
      type: Boolean,
      required: false,
      default: false,
    },
    createdAtForIAP: {
      type: String, 
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
chargeSchema.index({ userInfo: 1, orderId: 1 }, { unique: true });
/**
 * expireAfterSeconds 옵션은 초 단위로 지정되며, MongoDB는 60초마다 한 번씩 TTL(Time-to-Live) 프로세스를 실행합니다. 이 프로세스는 TTL 인덱스를 검사하고 만료된 문서를 삭제합니다. createdAt 기준으로 카운트 됩니다.
 * 따라서 expireAfterSeconds: 1로 설정하더라도 실제로는 1초 후에 문서가 즉시 삭제되지 않습니다. 대신 다음 TTL 프로세스 실행 시점에 삭제됩니다. TTL 프로세스는 60초마다 실행되므로, 문서가 생성된 후 최대 60초 이내에 삭제될 것입니다.
 * 예를 들어, 문서가 12:00:00에 생성되었고 expireAfterSeconds: 1로 설정되어 있다면, 12:00:01에 문서는 만료 상태가 됩니다. 그러나 실제로는 12:00:00부터 12:01:00 사이의 어느 시점에 TTL 프로세스에 의해 삭제됩니다.
 * 따라서 expireAfterSeconds: 1로 설정하더라도 문서가 정확히 1초 후에 삭제되는 것이 아니라, 1초 이후부터 최대 60초 이내에 삭제됩니다.
 * 이러한 동작은 MongoDB의 TTL 프로세스가 60초마다 실행되는 방식 때문입니다. TTL 프로세스의 실행 주기를 변경하려면 MongoDB 서버의 설정을 수정해야 합니다.
 *! document 생성 후 혹은 partialFilterExpression 조건에 맞게 되는 시점부터 TTL 인덱스의 대상이 되지만 TTL 카운트다운은 여전히 원래의 createdAt 시점부터 계산되니 생성 후부터 기한이 지난 후 다시 조건에 걸리게 되면, 1분 지연 후, 바로 삭제될 것.
 */
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
    name: "expire_after_3_day_ads_remover_android",
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
