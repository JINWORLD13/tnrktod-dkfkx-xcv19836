
//& 포인트제
// const { sanitizeObject, buildResponse } = require("../../misc/util");
// const AppError = require("../../misc/AppError");
// const commonErrors = require("../../misc/commonErrors");
// const { userService, chargeService } = require("../service");
// // const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
// const axios = require("axios");

// const storeItems = new Map([
//   [1, { priceInUSCent: 1, name: "Point" }],
//   [2, { priceInKRW: 10, name: "Point" }],
//   [3, { priceInJPY: 1, name: "Point" }],
// ]);

// const chargeController = {
//   // & 미완성
//   async postChargeForGooglePay(req, res, next) {
//     try {
//       const userId = req?.user ?? req?.session?.user?.id ?? null;
//       req.user = userId;
//       if (req?.isAuthenticated() === true) {
//         const { paymentData, countryCode } = req.body; // 결제 정보
//         const totalPrice = parseFloat(paymentData.transactionInfo.totalPrice); // 결제 금액
//         const pointsToAdd = calculatePoints(totalPrice, countryCode); // 결제 금액에 따른 포인트 계산

//         // 사용자의 포인트를 갱신
//         const userInDB = await userService.getUserById(userId);
//         userInDB.points += pointsToAdd;
//         await userService.updateUser({
//           ...userInDB,
//           points: userInDB.points,
//         });

//         // 성공 응답
//         res.json({
//           success: true,
//           message: "Payment for GooglePay processed successfully",
//         });
//       } else {
//         next(
//           new AppError(
//             commonErrors.chargeControllerPostChargeForGooglePayError,
//             commonErrors.userInfoNotFoundError,
//             404
//           )
//         );
//       }
//     } catch (error) {
//       // 오류 처리
//       console.error("Error processing payment:", error);
//       res
//         .status(500)
//         .json({ success: false, message: "Payment processing failed" });
//     }

//     // 결제 금액에 따른 포인트 계산 함수
//     function calculatePoints(totalPrice, countryCode) {
//       // 포인트 계산 로직을 구현하여 적용
//       if (countryCode === "US") return totalPrice / 0.01;
//       if (countryCode === "KR") return totalPrice / 10;
//       if (countryCode === "JP") return totalPrice / 1;
//     }
//   },

//   async postPrePaymentForToss(req, res, next) {
//     try {
//       const userId = req?.user ?? req?.session?.user?.id ?? null;
//       req.user = userId;
//       if (req?.isAuthenticated() === true) {
//         const {
//           orderId,
//           paymentKey,
//           orderName,
//           orderPoint,
//           amount,
//           currency,
//           country,
//           method,
//           apiName,
//           ...rest
//         } = req.body; // 결제 정보
//         const userInDB = await userService.getUserById(userId);
//         await chargeService.createChargeForTossPrePayment({
//           orderId,
//           paymentKey,
//           orderName,
//           orderPoint,
//           amount,
//           currency,
//           country,
//           method,
//           apiName,
//           userInfo: userInDB,
//         });

//         // 성공 응답
//         res.json({
//           success: true,
//           message: "PrePayment for Toss processed successfully",
//         });
//       } else {
//         next(
//           new AppError(
//             commonErrors.chargeControllerPostPrePaymentForTossError,
//             commonErrors.userInfoNotFoundError,
//             404
//           )
//         );
//       }
//     } catch (error) {
//       // 오류 처리
//       console.error("Error processing payment:", error);
//       res
//         .status(500)
//         .json({ success: false, message: "Payment processing failed" });
//     }

//     // 결제 금액에 따른 포인트 계산 함수
//     function calculatePoints(totalPrice, countryCode) {
//       // 포인트 계산 로직을 구현하여 적용
//       if (countryCode === "US") return totalPrice / 0.01;
//       if (countryCode === "KR") return totalPrice / 10;
//       if (countryCode === "JP") return totalPrice / 1;
//     }
//   },

//   //& 초기 결제에서만 쓰이는 것.
//   async getPrePaymentForToss(req, res, next) {
//     try {
//       const userId = req?.user ?? req?.session?.user?.id ?? null;
//       req.user = userId;
//       if (req?.isAuthenticated() === true) {
//         const orderId = req?.query?.orderId ?? null;
//         if (orderId === null || orderId === undefined) {
//           const userInDB = await userService.getUserById(userId);
//           const chargeInDB = await chargeService.getChargeByUserObjId(
//             userInDB._id
//           );
//           // 성공 응답
//           res.json({
//             chargeInfo: chargeInDB,
//           });
//         }

//         const chargeInDB = await chargeService.getChargeByOrderId(orderId);
//         // 성공 응답
//         res.json({
//           chargeInfo: chargeInDB,
//         });
//       } else {
//         next(
//           new AppError(
//             commonErrors.chargeControllerGetPrePaymentForTossError,
//             commonErrors.userInfoNotFoundError,
//             404
//           )
//         );
//       }
//     } catch (error) {
//       // 오류 처리
//       console.error("Error fetching pre-payment Info:", error);
//       next(new AppError(error?.message, commonErrors.chargeController, 404));
//     }
//   },

//   async deletePrePaymentForTossByOrderId(req, res, next) {
//     try {
//       const userId = req?.user ?? req?.session?.user?.id ?? null;
//       req.user = userId;
//       if (req?.isAuthenticated() === true) {
//         const orderId = req?.body?.orderId;
//         await chargeService.deleteChargeByOrderId(orderId);
//         // 성공 응답
//         res.json({ success: true });
//       } else {
//         next(
//           new AppError(
//             commonErrors.chargeControllerDeletePrePaymentForTossByOrderIdError,
//             commonErrors.userInfoNotFoundError,
//             404
//           )
//         );
//       }
//     } catch (error) {
//       // 오류 처리
//       console.error("Error deleting pre-payment Info:", error);
//       res
//         .status(500)
//         .json({ success: false, message: "Deleting Pre-Payment Info failed" });
//     }
//   },

//   async deletePrePaymentForTossByPaymentKey(req, res, next) {
//     try {
//       const userId = req?.user ?? req?.session?.user?.id ?? null;
//       req.user = userId;
//       if (req?.isAuthenticated() === true) {
//         const paymentKey = req?.body?.paymentKey;
//         const userInDB = await userService.getUserById(userId);
//         const userObjId = userInDB._id;
//         await chargeService.deleteChargeByUserObjIdAndPaymentKey(
//           userObjId,
//           paymentKey
//         );
//         // 성공 응답
//         res.json({ success: true });
//       } else {
//         next(
//           new AppError(
//             commonErrors.chargeControllerDeletePrePaymentForTossByPaymentKeyError,
//             commonErrors.userInfoNotFoundError,
//             404
//           )
//         );
//       }
//     } catch (error) {
//       // 오류 처리
//       console.error("Error deleting pre-payment Info:", error);
//       res
//         .status(500)
//         .json({ success: false, message: "Deleting Pre-Payment Info failed" });
//     }
//   },

//   async putPrePaymentForToss(req, res, next) {
//     try {
//       const userId = req?.user ?? req?.session?.user?.id ?? null;
//       req.user = userId;
//       if (req?.isAuthenticated() === true) {
//         const { orderId, paymentKey } = req.body;
//         await chargeService.putChargeByOrderId(orderId, {
//           paymentKey,
//         });
//         // 성공 응답
//         res.json({ success: true });
//       } else {
//         next(
//           new AppError(
//             commonErrors.chargeControllerPutPrePaymentForTossError,
//             commonErrors.userInfoNotFoundError,
//             404
//           )
//         );
//       }
//     } catch (error) {
//       // 오류 처리
//       console.error("Error putting pre-payment Info:", error);
//       res
//         .status(500)
//         .json({ success: false, message: "Putting Pre-Payment Info failed" });
//     }
//   },

//   //! 나머지 일반결제 캔슬시 로직짜기;

//   async postWebHookForToss(req, res, next) {
//     //? 결제면, 결제, 환불이면 환불 등 금융처리된 후 들어오는 로직이다. 그래서 모든 수단으로 환불시, 환불전 포인트 봐야 함.
//     // console.log("postWebHookForToss1 : ", req.body);
//     if (
//       req?.body?.data !== undefined &&
//       req?.body?.data?.method !== "가상계좌"
//     ) {
//       // console.log("postWebHookForToss2 : ", req.body.data);
//       const status = req?.body?.data?.status;
//       const orderId = req?.body?.data?.orderId;
//       const chargeInDB = await chargeService.getChargeByOrderId(orderId);
//       if (chargeInDB === null || chargeInDB === undefined) return;
//       const userObjId = chargeInDB.userInfo;
//       const userInDB = await userService.getUserByObjId(userObjId);
//       const points = userInDB.points;
//       if (status === "DONE") {
//         await chargeService.putChargeByOrderId(orderId, {
//           apiName: "Toss",
//         });
//         res.status(200).json({ success: true }); // 성공 응답 보내기
//         return;
//       }
//       // & 결제 캔슬
//       if (status === "CANCELED") {
//         let updatedPoints;
//         if (points - chargeInDB.orderPoint < 0) {
//           updatedPoints = points - chargeInDB.orderPoint; // 0이 좋을까..
//         }
//         if (points - chargeInDB.orderPoint >= 0) {
//           updatedPoints = points - chargeInDB.orderPoint;
//         }
//         await userService.updateUser({
//           ...userInDB,
//           points: updatedPoints,
//         });
//         await chargeService.deleteChargeByOrderId(orderId);
//         res.status(200).json({ status });
//         return;
//       }
//     }
//     // console.log("postWebHookForToss3 : ", req.body);
//     const status = req?.body?.status;
//     const orderId = req?.body?.orderId;
//     const chargeInDB = await chargeService.getChargeByOrderId(orderId);
//     //! 자꾸 전에 취소했던 orderId가 인풋되어서 에러 발생하니, 여기서 객체 없으면 컷
//     if (chargeInDB === null || chargeInDB === undefined) return;
//     const userObjId = chargeInDB.userInfo;
//     const userInDB = await userService.getUserByObjId(userObjId);
//     const points = userInDB.points;
//     //! res.status(200).end() 메서드는 단순히 HTTP 응답의 상태 코드만 설정하고 응답을 종료합니다. 따라서 이 메서드를 통해 전송되는 데이터는 없습니다. 클라이언트에게 전송할 데이터가 있다면 .end() 메서드 이전에 res.send(), res.json(), res.sendFile() 등과 같은 메서드를 사용하여 데이터를 보내야 합니다.
//     //~ res.status(200).json({ message: 'Success' }).end();
//     //? READY => WAITING_FOR_DEPOSIT => DONE => (환불 필수 처리 해야 하는데,, 포인트 쓰면 안되잖아;;) CANCELED(결제 취소) , PARTIAL_CANCELED(결제 부분 취소)
//     //? READY => WAITING_FOR_DEPOSIT => CANCELED(입금 전 취소)
//     //?  s'EXPIRED'

//     //& 가상계좌 처리, 입금하기 등의 이벤트로 여기가 자동으로 호출됨. 그러니 여기서 포인트 갱신 로직 짜면 됨. 입금하면, alert로 보여주던가...
//     if (status === "DONE") {
//       await userService.updateUser({
//         ...userInDB,
//         points: points + chargeInDB.orderPoint,
//       });
//       await chargeService.putChargeByOrderId(orderId, {
//         apiName: "Toss",
//       });
//       res.status(200).json({ success: true }); // 성공 응답 보내기
//       return;
//     }
//     // & 결제 캔슬
//     if (status === "CANCELED") {
//       //& 결제 후 캔슬 (캔슬 전 잔여 포인트 반드시 수동으로 확인).
//       if (chargeInDB.apiName === "Toss") {
//         let updatedPoints;
//         if (points - chargeInDB.orderPoint < 0) {
//           updatedPoints = points - chargeInDB.orderPoint; // 0으로 할지..
//         }
//         if (points - chargeInDB.orderPoint >= 0) {
//           updatedPoints = points - chargeInDB.orderPoint;
//         }
//         await userService.updateUser({
//           ...userInDB,
//           points: updatedPoints,
//         });
//         await chargeService.deleteChargeByOrderId(orderId);
//         res.status(200).json({ status });
//         return;
//       }
//       //& 결제 전 캔슬.
//       if (chargeInDB.apiName === "Toss(미입금상태)") {
//         await chargeService.deleteChargeByOrderId(orderId);
//         res.status(200).json({ status });
//         return;
//       }
//     }
//   },

//   // 클라이언트에서 successURL로 이동하자마자 아래의 API를 통해 toss 시스템에 결제 요청.
//   async postConfirmForToss(req, res, next) {
//     const userId = req?.user ?? req?.session?.user?.id ?? null;
//     req.user = userId;
//     // 클라이언트에서 받은 JSON 요청 바디입니다.
//     const { paymentKey, orderId, amount } = req.body;

//     // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
//     // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
//     const widgetSecretKey = process.env.TOSS_SECRET_KEY;
//     // const widgetSecretKey = "test_sk_ex6BJGQOVDPN4MKDKqZ5VW4w2zNb";
//     const encryptedSecretKey =
//       "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");

//     //& 클라이언트에서 가상계좌 status 보내야 함. db 통해서. 가상계좌면 아래 과정 스킵하고 실패로직이 아닌, json으로 아직이라고 알려주면 됨. 클라이언트에선 이를 받아 success page든, 가상계좌 미입금 처리 페이지든 만들어서 처리하면됨.
//     const chargeInfo = await chargeService.getChargeByOrderId(orderId);

//     // 결제를 승인하면 결제수단에서 금액이 차감돼요.
//     await axios
//       .post(
//         "https://api.tosspayments.com/v1/payments/confirm",
//         {
//           orderId: orderId,
//           amount: amount,
//           paymentKey: paymentKey,
//         },
//         {
//           headers: {
//             Authorization: encryptedSecretKey,
//             "Content-Type": "application/json",
//           },
//           responseType: "json",
//         }
//       )
//       .then(async (response) => {
//         // 결제 성공 비즈니스 로직을 구현하세요.
//         //! db에서 point 꺼내고 user에 point 업데이트하기
//         if (chargeInfo.method === "가상계좌") {
//           await chargeService.putChargeByOrderId(orderId, {
//             paymentKey,
//             apiName: "Toss(미입금상태)",
//           });
//           res.status(200).json();
//           return;
//         }
//         const { orderPoint, ...rest } = await chargeService.getChargeByOrderId(
//           orderId
//         );
//         const userInDB = await userService.getUserById(userId);
//         const points = userInDB.points;
//         await userService.updateUser({
//           ...userInDB,
//           points: points + orderPoint,
//         });

//         res.status(response.request.res.statusCode).json(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//         // 결제 실패 비즈니스 로직을 구현하세요.
//         res.json(error);
//       });
//   },

//   async getExchangeRate(req, res, next) {
//     try {
//       const response = await axios.get(process.env.EXCHANGE_RATE_API_URL);
//       const exchangeRate = response.data.rates;
//       res.status(200).json({ exchangeRate });
//     } catch (error) {
//       console.error("Exchange Rate Error:", error);
//       next(error);
//     }
//   },

//   //! strip용
//   // async postPaymentForStripe(req, res, next) {
//   //   try {
//   //     const userId = req?.user ?? req?.session?.user?.id ?? null;
//   //     req.user = userId;
//   //     if (req?.isAuthenticated() === true) {
//   //       try {
//   //         // 포인트 충전 로직: DB 업데이트, 로깅 등
//   //         let pointQty;
//   //         const items = req?.body?.items;
//   //         const session = await stripe.checkout.sessions.create({
//   //           payment_method_types: ["card"],
//   //           mode: "payment",
//   //           line_items: items.map((item) => {
//   //             const storeItem = storeItems.get(item.id);
//   //             pointQty = item.quantity;
//   //             let currency;
//   //             let unitAmount;
//   //             if (item.id === 1) {
//   //               currency = "usd";
//   //               // unitAmount = storeItems.priceInUSCent; // 단일 가격용
//   //               unitAmount = item.unit_amount * 100; //~ usd 환율용(cent화 시킴)
//   //             }
//   //             if (item.id === 2) {
//   //               currency = "krw";
//   //               // unitAmount = storeItems.priceInKRW; // 단일 가격용
//   //               unitAmount = item.unit_amount; //~ usd 환율용
//   //             }
//   //             if (item.id === 3) {
//   //               currency = "jpy";
//   //               // unitAmount = storeItems.priceInJPY; // 단일 가격용
//   //               unitAmount = item.unit_amount; //~ usd 환율용
//   //             }
//   //             return {
//   //               price_data: {
//   //                 currency: currency,
//   //                 product_data: {
//   //                   name: storeItem.name + " : " + pointQty + "P",
//   //                 },
//   //                 unit_amount: unitAmount,
//   //               },
//   //               // quantity: pointQty, // 단일 가격용
//   //               quantity: 1, //~ usd 환율용
//   //             };
//   //           }),
//   //           success_url:
//   //             process.env.CLIENT_URL +
//   //             "/charge/create-checkout-session/success/" +
//   //             `${pointQty}`,
//   //           cancel_url: process.env.CLIENT_URL,
//   //           // Stripe 세션 객체에 pointQty 저장 가능
//   //         });
//   //         res.json({ url: session.url });
//   //       } catch (err) {
//   //         console.error("error while charging point", err);
//   //         next(
//   //           new AppError(
//   //             commonErrors.chargeControllerPostChargeError,
//   //             err.message,
//   //             500
//   //           )
//   //         );
//   //       }
//   //     } else {
//   //       next(
//   //         new AppError(
//   //           commonErrors.chargeControllerPostChargeError,
//   //           commonErrors.userInfoNotFoundError,
//   //           404
//   //         )
//   //       );
//   //     }
//   //   } catch (err) {
//   //     next(new AppError(err.name, err.message, err.statusCode));
//   //   }
//   // },
//   // async putPointForStripe(req, res, next) {
//   //   try {
//   //     const pointQty = req?.params?.points;

//   //     const user = req.session.user;

//   //     const userInDB = await userService.getUserById(userId);
//   //     await userService.updateUser({
//   //       ...userInDB,
//   //       points: userInDB.points + pointQty,
//   //     });

//   //     res.redirect(process.env.CLIENT_URL);
//   //   } catch (err) {
//   //     next(new AppError(err.name, err.message, err.statusCode));
//   //   }
//   //   ``;
//   // },
// };

// module.exports = chargeController;
