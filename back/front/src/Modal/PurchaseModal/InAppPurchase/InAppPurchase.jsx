import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from '../../../styles/scss/_InAppPurchase.module.scss';
import lockStyles from '../../../styles/scss/_Button.module.scss';
import fontStyles from '../../../styles/scss/_Font.module.scss';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange.jsx';
import { useTranslation } from 'react-i18next';
import { Capacitor } from '@capacitor/core';
import 'cordova-plugin-purchase/www/store.js';
import { VoucherTitle } from './module/VoucherTitle.jsx';
import { VoucherDescription } from './module/VoucherDescription.jsx';
import { TicketIcon } from './module/TicketIcon.jsx';
import { formatPrice } from '../../../function/formatPrice.js';
import Button from '../../../UI/Button.jsx';
import Card from '../../../UI/Card.jsx';
import CancelButton from '../../../UI/CancelButton.jsx';
import PriceInfoModal from '../../PriceInfoModal.jsx';
import { voucherBox } from '../../../data/voucherBox/voucherBox.jsx';
import { chargeApi } from '../../../api/chargeApi.jsx';
import useButtonLock from '../../../hooks/useEffect/useButtonLock.jsx';
import { formattingDate } from '../../../function/formattingDate.jsx';
import { isAdsFreePassValid } from '../../../function/isAdsFreePassValid.jsx';
import { Preferences } from '@capacitor/preferences';
import GiftBoxIcon from './module/GiftBoxIcon.jsx';
import PurchaseItem from './module/PurchaseItem.jsx';
import AlertModal from './module/AlertModal.jsx';
const { store, ProductType, Platform } = window.CdvPurchase;
const platform =
  Capacitor.getPlatform() === 'android'
    ? Platform?.GOOGLE_PLAY
    : Platform?.APPLE_APPSTORE;
const productIds = [
  import.meta.env.VITE_COSMOS_VOUCHERS_1,
  import.meta.env.VITE_COSMOS_VOUCHERS_2,
  import.meta.env.VITE_COSMOS_VOUCHER_3,
  import.meta.env.VITE_COSMOS_VOUCHERS_4,
  import.meta.env.VITE_COSMOS_VOUCHERS_5,
  import.meta.env.VITE_COSMOS_VOUCHERS_6,
  import.meta.env.VITE_COSMOS_VOUCHERS_7,
  import.meta.env.VITE_COSMOS_VOUCHERS_8,
  import.meta.env.VITE_COSMOS_VOUCHERS_9,
  import.meta.env.VITE_COSMOS_VOUCHER_10,
  import.meta.env.VITE_COSMOS_VOUCHERS_11,
  import.meta.env.VITE_COSMOS_VOUCHERS_13,
  import.meta.env.VITE_COSMOS_VOUCHERS_ADS_REMOVER_3D,
  import.meta.env.VITE_COSMOS_VOUCHERS_EVENT_PACKAGE_EXPIRED,
  import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_NEWBIE,
  import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_1,
  import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_2,
  import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_3,
  import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_4,
  import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_5,
  import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_6,
  import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_10,
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
  const { t } = useTranslation();
  const [iapProducts, setIapProducts] = useState([]);
  const [purchasing, setPurchasing] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isProcessingPurchase, setIsProcessingPurchase] = useState(false);
  const [userInfo, setUserInfo] = useState(userInfoFromMyPage || {});
  const [processedTransactions, setProcessedTransactions] = useState(new Set());
  const [isConfirmClicked, setConfirmClicked] = useState(false);
  const [requiredVoucherName, serRequiredVoucherName] = useState(prev => {
    if (props?.stateGroup?.requiredVoucherInfo?.name === 1) return `I`;
    if (props?.stateGroup?.requiredVoucherInfo?.name === 2) return `II`;
    if (props?.stateGroup?.requiredVoucherInfo?.name === 3) return `III`;
    if (props?.stateGroup?.requiredVoucherInfo?.name === 4) return `IV`;
    if (props?.stateGroup?.requiredVoucherInfo?.name === 5) return `V`;
    if (props?.stateGroup?.requiredVoucherInfo?.name === 6) return `VI`;
    if (props?.stateGroup?.requiredVoucherInfo?.name === 7) return `VII`;
    if (props?.stateGroup?.requiredVoucherInfo?.name === 8) return `VIII`;
    if (props?.stateGroup?.requiredVoucherInfo?.name === 9) return `IX`;
    if (props?.stateGroup?.requiredVoucherInfo?.name === 10) return `X`;
    if (props?.stateGroup?.requiredVoucherInfo?.name === 11) return `XI`;
    if (props?.stateGroup?.requiredVoucherInfo?.name === 13) return `XIII`;
  });
  const [totalEventPackageCount, setEventPackageCount] = useState(0);
  const [totalNewbiePackageCount, setNewbiePackageCount] = useState(0);
  let debounceTimer = null;
  const socketRef = useRef();
  const { clickCount, isLocked, remainingTime, handleClick, isLoading } =
    useButtonLock(() => {
      return {
        maxClicks: 5,
        particalLockDuration: 60 * 60 * 1000,
        lockDuration: 5 * 60 * 60 * 1000,
        uniqueId: userInfo?.email,
      };
    });
  const initializeStore = () => {
    store.verbosity = store.DEBUG;
    productIds.forEach(productId => {
      store.register({
        type: ProductType.CONSUMABLE,
        id: productId,
        platform: platform,
      });
    });
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
      const productId = receipt.sourceReceipt.transactions[0].products[0]?.id;
      if (processedTransactions.has(transactionId)) {
        return;
      }
      if (!productIds.includes(productId)) {
        return;
      }
      const now = new Date();
      const offsetMinutes = now.getTimezoneOffset(); 
      const zd = -offsetMinutes / 60; 
      try {
        const result = await chargeApi.postPaymentForGooglePlayStore({
          email: userInfo?.email, 
          className: receipt.className,
          id: receipt?.id,
          sourceReceiptClassName: receipt.sourceReceipt.className,
          transactionId: receipt.sourceReceipt.transactions[0].transactionId,
          state: receipt.sourceReceipt.transactions[0].state,
          products: receipt.sourceReceipt.transactions[0].products,
          productId: receipt.sourceReceipt.transactions[0].products[0]?.id,
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
          autoRenewing:
            receipt.sourceReceipt.transactions[0].nativePurchase.autoRenewing,
          accountId: userInfo?.email,
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
          zd: zd, 
        });
        setProcessedTransactions(prev => new Set(prev).add(transactionId));
        return result;
      } catch (error) {
        console.error('Error sending purchase to server:', error);
        throw error;
      }
    },
    [processedTransactions]
  );
  const refreshUI = useCallback(async () => {
    const products = await Promise.all(
      productIds.map(productId =>
        store.get(productId, platform, ProductType.CONSUMABLE)
      )
    );
    setIapProducts(products);
  }, []);
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
        setPurchasing(true); 
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
  const orderProduct = useCallback(
    product => {
      if (isOrdering) return;
      setIsOrdering(true);
      const order = async () => {
        try {
          const instructionOfLoginForPurchase = browserLanguage => {
            if (browserLanguage === 'en')
              return `Please log in with your Google account to proceed with the purchase.`;
            if (browserLanguage === 'ko')
              return `구매를 진행하려면 구글 계정으로 로그인해 주세요.`;
            if (browserLanguage === 'ja')
              return `購入を進めるためにGoogleアカウントでログインしてください。`;
          };
          if (!userInfo?.email) {
            alert(instructionOfLoginForPurchase(browserLanguage));
            setIsOrdering(false);
            return;
          }
          const showPaymentAlertIfNeeded = async () => {
            try {
              if (!userInfo?.email) return;
              const key = `alert_${userInfo.email}`;
              const { value } = await Preferences.get({ key });
              const now = Date.now();
              const threeDays = 3 * 24 * 60 * 60 * 1000; 
              if (!value || now - Number(value) > threeDays) {
                const instructionOfChangingAccountForPay = browserLanguage => {
                  if (browserLanguage === 'en')
                    return `Payments will be processed through the account linked to Google Play. Please verify that this email and the Google Play account are the same. If you want to use a different account, you can go to "Manage accounts on this device" in the Google Play account settings, remove the payment account, and then switch to the desired account.`;
                  if (browserLanguage === 'ko')
                    return `결제는 구글 플레이에 연결된 계정으로 진행됩니다. 이 이메일과 구글 플레이 계정이 동일한지 확인해 주세요. 다른 계정을 사용하려면 구글 플레이 계정 설정에서 '이 기기에서 계정 관리'로 들어가 결제 계정을 삭제한 뒤 원하는 계정으로 변경할 수 있습니다.`;
                  if (browserLanguage === 'ja')
                    return `お支払いはグーグルプレイに紐づけられたアカウントで行われます。このメールアドレスとグーグルプレイアカウントが同一であるかご確認ください。別のアカウントを使用したい場合は、グーグルプレイのアカウント設定で「このデバイスでアカウントを管理」に進み、お支払いアカウントを削除した後、ご希望のアカウントに変更できます。`;
                };
                alert(instructionOfChangingAccountForPay(browserLanguage));
                await Preferences.set({ key, value: String(now) });
              }
            } catch (err) {
              console.error('showPaymentAlertIfNeeded error:', e);
            }
          };
          await showPaymentAlertIfNeeded();
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
    [isOrdering, userInfo?.email]
  );
  const removeRefundedItem = useCallback(async productId => {
    try {
      console.log(`Refund for ${productId} processed`);
    } catch (error) {
      console.error('Error processing refund:', error);
    }
  }, []);
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
  useEffect(() => {
    initializeStore();
    restorePurchases();
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
  useEffect(() => {
    store.when().productUpdated(refreshUI),
      store.when().approved(transaction => {
        transaction.verify(); 
        transaction.finish(); 
      });
    store.when().verified(finishPurchase);
    store.when().unverified(() => setPurchasing(false));
    store.when().receiptsReady(handleReceipts);
    return () => {
      store.off();
    };
  }, []);
  const browserLanguage = useLanguageChange();
  const fetchedVoucherBox = voucherBox();
  const openChargePage = () => {
    setConfirmClicked(true);
  };
  const closeChargeModal = () => {
    setShowInAppPurchase(false);
  };
  useEffect(() => {
    if (userInfo?.email && userInfo?.email !== '') {
      purchaseLimit(
        `purchase_limit_exceeded_event_package_expired_${userInfo?.email}`,
        import.meta.env.VITE_COSMOS_VOUCHERS_EVENT_PACKAGE_EXPIRED,
        userInfo,
        setEventPackageCount
      );
      purchaseLimit(
        `purchase_limit_exceeded_bundle_package_newbie_${userInfo?.email}`,
        import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_NEWBIE,
        userInfo,
        setNewbiePackageCount
      );
    }
  }, [userInfo?.email]);
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const deadline = new Date('2025-08-25T23:59:59');
      if (now > deadline) {
        setExpired(true);
      } else {
        setExpired(false);
      }
    }, 1000); 
    return () => {
      clearInterval(timer);
    };
  }, []);
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
              {}
              {!userInfo?.purchased?.packageForNewbie && (
                <PurchaseItem
                  whichItem={'bundle-package'}
                  iapProductId={
                    import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_NEWBIE
                  }
                  iapProducts={iapProducts}
                  icon={
                    <GiftBoxIcon
                      size={32}
                      color="#EF4444"
                      ribbonColor="#FBBF24"
                    />
                  }
                  title={t(
                    'product.cosmos_vouchers_bundle_package_newbie_title'
                  )}
                  description={t(
                    'product.cosmos_vouchers_bundle_package_newbie'
                  )}
                  buttonLockCondition={totalNewbiePackageCount >= 1}
                  browserLanguage={browserLanguage}
                  purchasing={purchasing}
                  setPurchasing={setPurchasing}
                  orderProduct={orderProduct}
                  t={t}
                />
              )}
              <PurchaseItem
                whichItem={'bundle-package'}
                iapProductId={import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_1}
                iapProducts={iapProducts}
                icon={
                  <GiftBoxIcon
                    size={32}
                    color="#10B981"
                    ribbonColor="#F59E0B"
                  />
                }
                title={t('product.cosmos_vouchers_bundle_package_1_title')}
                description={t('product.cosmos_vouchers_bundle_package_1')}
                browserLanguage={browserLanguage}
                purchasing={purchasing}
                setPurchasing={setPurchasing}
                orderProduct={orderProduct}
                t={t}
              />
              <PurchaseItem
                whichItem={'bundle-package'}
                iapProductId={import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_2}
                iapProducts={iapProducts}
                icon={
                  <GiftBoxIcon
                    size={32}
                    color="#3B82F6"
                    ribbonColor="#EF4444"
                  />
                }
                title={t('product.cosmos_vouchers_bundle_package_2_title')}
                description={t('product.cosmos_vouchers_bundle_package_2')}
                browserLanguage={browserLanguage}
                purchasing={purchasing}
                setPurchasing={setPurchasing}
                orderProduct={orderProduct}
                t={t}
              />
              <PurchaseItem
                whichItem={'bundle-package'}
                iapProductId={import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_3 }
                iapProducts={iapProducts}
                icon={
                  <GiftBoxIcon
                    size={32}
                    color="#F97316"
                    ribbonColor="#A855F7"
                  />
                }
                title={t('product.cosmos_vouchers_bundle_package_3_title')}
                description={t('product.cosmos_vouchers_bundle_package_3')}
                browserLanguage={browserLanguage}
                purchasing={purchasing}
                setPurchasing={setPurchasing}
                orderProduct={orderProduct}
                t={t}
              />
              <PurchaseItem
                whichItem={'bundle-package'}
                iapProductId={import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_4}
                iapProducts={iapProducts}
                icon={
                  <GiftBoxIcon
                    size={32}
                    color="#14B8A6"
                    ribbonColor="#F472B6"
                  />
                }
                title={t('product.cosmos_vouchers_bundle_package_4_title')}
                description={t('product.cosmos_vouchers_bundle_package_4')}
                browserLanguage={browserLanguage}
                purchasing={purchasing}
                setPurchasing={setPurchasing}
                orderProduct={orderProduct}
                t={t}
              />
              <PurchaseItem
                whichItem={'bundle-package'}
                iapProductId={import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_5}
                iapProducts={iapProducts}
                icon={
                  <GiftBoxIcon
                    size={32}
                    color="#6366F1"
                    ribbonColor="#FCD34D"
                  />
                }
                title={t('product.cosmos_vouchers_bundle_package_5_title')}
                description={t('product.cosmos_vouchers_bundle_package_5')}
                browserLanguage={browserLanguage}
                purchasing={purchasing}
                setPurchasing={setPurchasing}
                orderProduct={orderProduct}
                t={t}
              />
              <PurchaseItem
                whichItem={'bundle-package'}
                iapProductId={import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_6}
                iapProducts={iapProducts}
                icon={
                  <GiftBoxIcon
                    size={32}
                    color="#EC4899"
                    ribbonColor="#10B981"
                  />
                }
                title={t('product.cosmos_vouchers_bundle_package_6_title')}
                description={t('product.cosmos_vouchers_bundle_package_6')}
                browserLanguage={browserLanguage}
                purchasing={purchasing}
                setPurchasing={setPurchasing}
                orderProduct={orderProduct}
                t={t}
              />
              <PurchaseItem
                whichItem={'bundle-package'}
                iapProductId={import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_10}
                iapProducts={iapProducts}
                icon={
                  <GiftBoxIcon
                    size={32}
                    color="#8B5CF6"
                    ribbonColor="#84CC16"
                  />
                }
                title={t('product.cosmos_vouchers_bundle_package_10_title')}
                description={t('product.cosmos_vouchers_bundle_package_10')}
                browserLanguage={browserLanguage}
                purchasing={purchasing}
                setPurchasing={setPurchasing}
                orderProduct={orderProduct}
                t={t}
              />
              {}
            {}
            <CancelButton
              className={`${styles['purchase-button']} ${
                browserLanguage === 'ja'
                  ? styles['purchase-button-font-ja']
                  : styles['purchase-button-font']
              }`}
              onClick={(e = null) => {
                setConfirmClicked(false);
                closeChargeModal();
              }}
            >
              {t('button.close')}
            </CancelButton>
          </footer>
        </Card>
      )}
      {isConfirmClicked === false && (
        <AlertModal
          t={t}
          browserLanguage={browserLanguage}
          children={props?.children}
          stateGroup={props?.stateGroup}
          requiredVoucherName={requiredVoucherName}
          openChargePage={openChargePage}
          closeChargeModal={closeChargeModal}
          styles={styles}
        />
      )}
    </>
  );
};
const purchaseLimit = async (key, productId, userInfo, setPurchaseCount) => {
  const { value } = (await Preferences.get({
    key,
  })) ?? { value: 'false' };
  const isExceeded = JSON.parse(value); 
  if (!isExceeded) {
    let result;
    let purchased;
    let purchaseCount;
    if (
      productId === import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_NEWBIE
    ) {
      purchased = userInfo?.purchased?.packageForNewbie;
    } else {
      if (
        productId ===
          import.meta.env.VITE_COSMOS_VOUCHERS_EVENT_PACKAGE_EXPIRED &&
        new Date() > new Date('2025-08-27')
      )
        return;
      result = await chargeApi.getPurchaseLimit({
        productId,
      });
      purchaseCount =
        typeof result?.response === 'number'
          ? result?.response
          : Number(result?.response);
      setPurchaseCount(purchaseCount);
    }
    if (
      purchaseCount >= 50 &&
      productId === import.meta.env.VITE_COSMOS_VOUCHERS_EVENT_PACKAGE_EXPIRED
    ) {
      await Preferences.set({
        key,
        value: JSON.stringify(true),
      });
    } else if (
      purchased &&
      productId === import.meta.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_NEWBIE
    ) {
      setPurchaseCount(1);
      await Preferences.set({
        key,
        value: JSON.stringify(true),
      });
    } else {
      await Preferences.set({
        key,
        value: JSON.stringify(false),
      });
    }
  } else {
    setPurchaseCount(10000000000); 
  }
};
export default InAppPurchase;
