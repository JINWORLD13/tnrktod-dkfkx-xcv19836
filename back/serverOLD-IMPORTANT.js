require("dotenv").config();
require("./src/db/mongoose/mongoose")();
const express = require("express");
const app = express();
const {
  tarotRouter,
  authRouter,
  userRouter,
  adminRouter,
  chargeRouter,
  googleRouter,
} = require("./src/routes/index");
const googlePassport = require("./src/middlewares/googlePassportForJWT");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression"); 
const socketIO = require("socket.io");
const { chargeService, userService } = require("./src/MVC/service");
const currentPath = __dirname; 
const parentPath = path.join(currentPath, ".."); 
if (process.env.NODE_ENV === "DEVELOPMENT") {
  const cors = require("cors");
  app.use(cors());
}
app.use(googlePassport.initialize());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/tarot", tarotRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/charge", chargeRouter);
app.use("/google", googleRouter);
app.use((req, res, next) => {
  const allowedOrigins = ["cosmostarot:
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Max-Age", "3600");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https:
  );
  next();
});
app.use(express.static(path.join(currentPath, "front/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(currentPath, "front/dist/index.html"));
});
const port = Number(process.env.PORT) || 8080;
let server;
if (process.env.NODE_ENV === "DEVELOPMENT") {
  server = app.listen(port, () => {
    console.log(`Development server listening on port ${port}`);
  });
} else if (process.env.NODE_ENV === "PRODUCTION") {
  server = app.listen(port, () => {
    console.log(`Production server listening on port ${port}`);
  });
}
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
const topicName = process.env.PUBSUB_TOPIC_NAME;
const subscriptionName = process.env.PUBSUB_SUBSCRIPTION_NAME;
const io = socketIO(server, {
  transports: ["websocket"],
  allowUpgrades: false,
});
const pubSubClient = new PubSub({ projectId });
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
listenForMessages(subscriptionName);
function listenForMessages(subscriptionName) {
  const subscription = pubSubClient.subscription(subscriptionName);
  const messageHandler = async (message) => {
    console.log("Refund event:", message.data.toString());
    const refundData = JSON.parse(message.data.toString());
    const orderId = refundData?.voidedPurchaseNotification?.orderId || "";
    let retryCount = 0;
    const maxRetries = 2;
    while (retryCount < maxRetries) {
      try {
        if (orderId) {
          await processRefund(orderId);
          io.emit("refundProcessed", orderId);
          message.ack();
          return;
        }
        message.ack();
        return;
      } catch (error) {
        console.error("Error processing refund:", error);
        retryCount++;
        if (retryCount >= maxRetries) {
          console.error(`Max retries reached for orderId: ${orderId}`);
          message.ack(); 
          return;
        }
      }
    }
  };
  subscription.on("message", messageHandler);
  console.log(`Listening for messages on ${subscriptionName}`);
}
async function processRefund(orderId) {
  console.log(`Processing refund for orderId: ${orderId}`);
  const chargeInDB = await chargeService.getChargeByOrderId(orderId);
  const userInDB = await userService.getUserByObjId(chargeInDB?.userInfo);
  if (!userInDB) {
    console.log(`No user found for orderId: ${orderId}`);
    return;
  }
  if (!chargeInDB) {
    console.log(`No charge found for orderId: ${orderId}`);
    return;
  }
  const updatedUser = await updateUserVouchers(
    userInDB,
    chargeInDB.orderVouchers,
    chargeInDB.orderHistory
  );
  await userService.updateUser(updatedUser);
  await chargeService.deleteChargeByOrderId(orderId);
}
async function updateUserVouchers(user, orderVouchers, orderHistory) {
  const updatedVouchers = { ...user.vouchers };
  const updatedVouchersInDetail = { ...user.vouchersInDetail };
  orderVouchers.forEach(([voucherType, count]) => {
    if (updatedVouchers[voucherType] !== undefined) {
      updatedVouchers[voucherType] -= count;
    }
  });
  Object.entries(orderHistory).forEach(
    ([voucherType, oneVoucherDetailInArr]) => {
      if (updatedVouchersInDetail[voucherType]?.length > 0) {
        oneVoucherDetailInArr.forEach((detail) => {
          const index = updatedVouchersInDetail[voucherType].findIndex(
            (voucherArray) => voucherArray[4] === detail
          );
          if (index !== -1) {
            updatedVouchersInDetail[voucherType][index][0] -=
              oneVoucherDetailInArr[0];
            if (updatedVouchersInDetail[voucherType][index][0] <= 0) {
              updatedVouchersInDetail[voucherType].splice(index, 1);
            }
          }
        });
        if (updatedVouchersInDetail[voucherType].length === 0) {
          updatedVouchersInDetail[voucherType] = [];
        }
      }
    }
  );
  return {
    ...user,
    vouchers: { ...user?.vouchers, ...updatedVouchers },
    vouchersInDetail: { ...user?.vouchersInDetail, ...updatedVouchersInDetail },
  };
}
app.use((err, req, res, next) => {
  console.error("전역 에러미들웨어 이름 : ", err.name);
  console.error("전역 에러미들웨어 메세지 : ", err.message);
  console.error("전역 에러미들웨어 에러코드 : ", err.statusCode);
  res.status(err.statusCode || 500).json({
    error_name: err.name,
    error_msg: err.message,
    status_code: err.statusCode || 500,
  });
});
