import React, { useState, useEffect, useCallback, useRef } from 'react';
import Card from '../../UI/Card.jsx';
import styles from '../../styles/scss/_InAppPurchase.module.scss';
import Button from '../../UI/Button.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { useTranslation } from 'react-i18next';
import { Capacitor } from '@capacitor/core';
import 'cordova-plugin-purchase/www/store.js';
import axios from 'axios';
import PriceInfoModal from '../Modal/PriceInfoModal.jsx';
import { voucherBox } from '../../data/voucherBox/voucherBox.jsx';
import socketIOClient from 'socket.io-client';
import { chargeApi } from '../../api/chargeApi.jsx';
const { store, ProductType, Platform } = window.CdvPurchase;
const platform =
  Capacitor.getPlatform() === 'android'
    ? Platform.GOOGLE_PLAY
    : Platform.APPLE_APPSTORE;
const productIds = [
  'cosmos_vouchers_1',
  'cosmos_vouchers_2',
  'cosmos_voucher_3',
  'cosmos_vouchers_4',
  'cosmos_vouchers_6',
  'cosmos_voucher_10',
];
const InAppPurchase = ({
  updateRefundPolicyOpen,
  updatePriceInfoModalOpen,
  userInfoFromMyPage,
  isPriceInfoModalOpen,
  showInAppPurchase,
  setShowInAppPurchase,
  setUnavailableVoucher,
  ...props
}) => {
  const [iapProducts, setIapProducts] = useState([]);
  const [purchasing, setPurchasing] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isProcessingPurchase, setIsProcessingPurchase] = useState(false);
  const [userInfo] = useState(userInfoFromMyPage || {});
  const [processedTransactions, setProcessedTransactions] = useState(new Set());
  const [isConfirmClicked, setConfirmClicked] = useState(false);
  let debounceTimer = null;
  const socketRef = useRef();
  useEffect(() => {
    initializeStore();
    restorePurchases();
    socketRef.current = socketIOClient('https:
      transports: ['websocket'],
      upgrade: false,
    });
    socketRef.current.on('refundProcessed', orderId => {
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [
    props?.stateGroup?.whichTarot,
    props?.stateGroup?.country,
    props?.stateGroup?.isAdsWatched,
    props?.stateGroup?.answerForm,
  ]);
  useEffect(() => {
    if (showInAppPurchase) {
      setIsOrdering(false);
      setPurchasing(false);
      refreshUI();
    }
  }, [showInAppPurchase]);
  const initializeStore = () => {
    store.verbosity = store.DEBUG;
    productIds.forEach(productId => {
      store.register({
        type: ProductType.CONSUMABLE,
        id: productId,
        platform: platform,
      });
    });
    store.when().productUpdated(refreshUI);
    store.when().approved(transaction => {
      transaction.verify(); 
      transaction.finish(); 
    });
    store.when().verified(finishPurchase);
    store.when().unverified(() => setPurchasing(false));
    store.when().receiptsReady(handleReceipts);
    store.initialize([platform]);
  };
  const restorePurchases = async () => {
    try {
      await store.restorePurchases();
      console.log('Purchases restored successfully');
    } catch (error) {
      console.error('Error restoring purchases:', error);
    }
  };
  const sendPurchaseToServer = useCallback(
    async receipt => {
      const transactionId = receipt.sourceReceipt.transactions[0].transactionId;
      const productId = receipt.sourceReceipt.transactions[0].products[0].id;
      if (processedTransactions.has(transactionId)) {
        console.log('Transaction already processed:', transactionId);
        return;
      }
      if (!productIds.includes(productId)) {
        console.error('Invalid productId:', productId);
        return;
      }
      console.log('Sending purchase to server:', JSON.stringify(receipt));
      try {
        const response = Api.postPaymentForGooglePlayStore({
          className: receipt.className,
          id: receipt.id,
          sourceReceiptClassName: receipt.sourceReceipt.className,
          transactionId: receipt.sourceReceipt.transactions[0].transactionId,
          state: receipt.sourceReceipt.transactions[0].state,
          products: receipt.sourceReceipt.transactions[0].products,
          productId: receipt.sourceReceipt.transactions[0].products[0].id,
          platform: receipt.sourceReceipt.transactions[0].platform,
          orderId: receipt.sourceReceipt.transactions[0].nativePurchase.orderId,
          packageName:
            receipt.sourceReceipt.transactions[0].nativePurchase.packageName,
          purchaseTime:
            receipt.sourceReceipt.transactions[0].nativePurchase.purchaseTime,
          purchaseState:
            receipt.sourceReceipt.transactions[0].nativePurchase.purchaseState,
          purchaseToken:
            receipt.sourceReceipt.transactions[0].nativePurchase.purchaseToken,
          quantity:
            receipt.sourceReceipt.transactions[0].nativePurchase.quantity,
          acknowledged:
            receipt.sourceReceipt.transactions[0].nativePurchase.acknowledged,
          getPurchaseState:
            receipt.sourceReceipt.transactions[0].nativePurchase
              .getPurchaseState,
          developerPayload:
            receipt.sourceReceipt.transactions[0].nativePurchase
              .developerPayload,
          autoRenewing:
            receipt.sourceReceipt.transactions[0].nativePurchase.autoRenewing,
          accountId:
            receipt.sourceReceipt.transactions[0].nativePurchase.accountId,
          profileId:
            receipt.sourceReceipt.transactions[0].nativePurchase.profileId,
          signature:
            receipt.sourceReceipt.transactions[0].nativePurchase.signature,
          nativeReceipt:
            receipt.sourceReceipt.transactions[0].nativePurchase.receipt,
          purchaseId: receipt.sourceReceipt.transactions[0].purchaseId,
          purchaseDate: receipt.sourceReceipt.transactions[0].purchaseDate,
          isPending: receipt.sourceReceipt.transactions[0].isPending,
          isAcknowledged: receipt.sourceReceipt.transactions[0].isAcknowledged,
          renewalIntent: receipt.sourceReceipt.transactions[0].renewalIntent,
          sourcePlatform: receipt.sourceReceipt.platform,
          sourcePurchaseToken: receipt.sourceReceipt.purchaseToken,
          sourceOrderId: receipt.sourceReceipt.orderId,
          collection: receipt.collection,
          latestReceipt: receipt.latestReceipt,
          nativeTransactions: receipt.nativeTransactions,
          validationDate: receipt.validationDate,
        });
        console.log('Server response:', response);
        setProcessedTransactions(prev => new Set(prev).add(transactionId));
        return response;
      } catch (error) {
        console.error('Error sending purchase to server:', error);
        throw error;
      }
    },
    [processedTransactions]
  );
  transactionId;
  const finishPurchase = useCallback(
    async receipt => {
      if (isProcessingPurchase) return;
      setIsProcessingPurchase(true);
      try {
        const transactionId =
          receipt.sourceReceipt.transactions[0].transactionId;
        if (processedTransactions.has(transactionId)) {
          console.log('Transaction already processed:', transactionId);
          setIsProcessingPurchase(false);
          return;
        }
        const result = await sendPurchaseToServer(receipt);
        if (result.response.success === true) {
          await receipt.finish();
          console.log('Purchase completed and consumed');
          await refreshUI();
          setProcessedTransactions(prev => new Set(prev).add(transactionId));
          window.location.reload();
        }
      } catch (error) {
        console.error('Error finishing purchase:', error);
      } finally {
        setPurchasing(false);
        setIsProcessingPurchase(false);
        refreshUI();
      }
    },
    [isProcessingPurchase, sendPurchaseToServer, processedTransactions]
  );
  const refreshUI = useCallback(async () => {
    const products = await Promise.all(
      productIds.map(productId =>
        store.get(productId, platform, ProductType.CONSUMABLE)
      )
    );
    setIapProducts(products);
  }, []);
  const orderProduct = useCallback(
    product => {
      if (isOrdering) return;
      setIsOrdering(true);
      const order = async () => {
        try {
          if (product?.getOffer()) {
            await product.getOffer().order();
          } else {
            throw new Error('Product offer not available');
          }
        } catch (error) {
          console.error('Purchase error:', error);
        } finally {
          setIsOrdering(false);
        }
      };
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(order, 500);
    },
    [isOrdering]
  );
  const handleReceipts = useCallback(async receipts => {
    for (let receipt of receipts) {
      for (let transaction of receipt.transactions) {
        if (transaction.state === store.TRANSACTION_STATE_REFUNDED) {
          console.log(`Product ${transaction.productId} has been refunded`);
          await removeRefundedItem(transaction.productId);
        }
      }
    }
  }, []);
  const removeRefundedItem = useCallback(async productId => {
    try {
      console.log(`Refund for ${productId} processed`);
    } catch (error) {
      console.error('Error processing refund:', error);
    }
  }, []);
  const browserLanguage = useLanguageChange();
  const { t } = useTranslation();
  const fetchedVoucherBox = voucherBox();
  const openChargePage = () => {
    setConfirmClicked(true);
  };
  const closeChargeModal = () => {
    setShowInAppPurchase(false);
  };
  return (
    <>
      <div className={`${styles['backdrop']}`} />
      {isPriceInfoModalOpen === true && isConfirmClicked === true && (
        <PriceInfoModal
          updatePriceInfoModalOpen={updatePriceInfoModalOpen}
          voucherBox={fetchedVoucherBox}
        />
      )}
      {isConfirmClicked === true && (
        <Card className={styles['purchase-modal']}>
          <header className={styles['charge-content']}>
            <div className={styles['empty']}></div>
            <div className={styles['voucher-box']}>
              {iapProducts.map((product, i) => {
                return (
                  <div key={product?.id} className={styles['voucher']}>
                    <div className={styles['voucher-info-box']}>
                      <h2
                        className={`${styles['voucher-title']} ${
                          product?.id === 'cosmos_vouchers_1' &&
                          styles['one-card']
                        } ${
                          product?.id === 'cosmos_vouchers_2' &&
                          styles['two-cards']
                        } ${
                          product?.id === 'cosmos_voucher_3' &&
                          styles['three-cards']
                        } ${
                          product?.id === 'cosmos_vouchers_4' &&
                          styles['four-cards']
                        } ${
                          product?.id === 'cosmos_vouchers_5' &&
                          styles['five-cards']
                        } ${
                          product?.id === 'cosmos_vouchers_6' &&
                          styles['six-cards']
                        } ${
                          product?.id === 'cosmos_vouchers_7' &&
                          styles['seven-cards']
                        } ${
                          product?.id === 'cosmos_vouchers_8' &&
                          styles['eight-cards']
                        } ${
                          product?.id === 'cosmos_vouchers_9' &&
                          styles['nine-cards']
                        } ${
                          product?.id === 'cosmos_voucher_10' &&
                          styles['ten-cards']
                        } ${
                          product?.id === 'cosmos_vouchers_11' &&
                          styles['eleven-cards']
                        } ${
                          product?.id === 'cosmos_vouchers_13' &&
                          styles['thirteen-cards']
                        } ${
                          browserLanguage === 'ko' &&
                          styles['korean-dongle-font']
                        } ${
                          browserLanguage === 'en' &&
                          styles['korean-dongle-font']
                        } ${
                          browserLanguage === 'ja' &&
                          styles['japanese-potta-font']
                        }`}
                      >
                        {product?.title || 'Unknown Product'}
                      </h2>
                      <p className={styles['voucher-description']}>
                        {product?.description || 'No description available'}
                      </p>
                    </div>
                    <div className={styles['voucher-button-box']}>
                      <p className={styles['voucher-price']}>
                        {product?.pricing?.price || 'Price not available'}
                      </p>
                      <Button
                        className={styles['voucher-button']}
                        onClick={() => {
                          orderProduct(product);
                        }}
                        disabled={purchasing}
                      >
                        {purchasing
                          ? t('button.loading')
                          : t('button.purchase')}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles['empty']}></div>
          </header>
          <footer className={styles['purchase-button-box']}>
            {}
            <Button
              className={styles['purchase-button']}
              onClick={() => {
                setConfirmClicked(false);
                closeChargeModal();
              }}
            >
              {t('button.close')}
            </Button>
          </footer>
        </Card>
      )}
      {isConfirmClicked === false && (
        <Card className={styles['modal']}>
          <header
            className={`${
              browserLanguage === 'ja'
                ? styles['title-japanese']
                : styles['title']
            }`}
          >
            <p>{t(`alert_modal.notice`)}</p>
          </header>
          <div
            className={`${
              browserLanguage === 'ja'
                ? styles['modal-content-japanese']
                : styles['modal-content']
            }`}
          >
            <p>{props?.children}</p>
          </div>
          {}
          <footer className={styles['purchase-button-box']}>
            <Button
              className={styles['purchase-button']}
              onClick={() => {
                openChargePage();
              }}
            >
              {t(`button.confirm`)}
            </Button>
            <Button
              className={styles['purchase-button']}
              onClick={() => {
                closeChargeModal();
              }}
            >
              {t(`button.close`)}
            </Button>
          </footer>
        </Card>
      )}
    </>
  );
};
export default InAppPurchase;
