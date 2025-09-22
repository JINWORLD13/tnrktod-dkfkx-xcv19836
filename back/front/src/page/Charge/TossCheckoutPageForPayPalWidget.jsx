import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/scss/_TossCheckoutPageForPayPalWidget.module.scss';
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { nanoid } from 'nanoid';
import Button from '../../UI/Button.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { chargeApi } from '../../api/chargeApi.jsx';
import { useTranslation } from 'react-i18next';
const widgetClientKey =
  import.meta.env.VITE_NODE_ENV === 'PRODUCTION'
    ? import.meta.env.VITE_WIDGET_CLIENT_KEY_FOR_TOSS
    : import.meta.env.VITE_WIDGET_CLIENT_KEY_FOR_TOSS_TEST;
const clientKey =
  import.meta.env.VITE_NODE_ENV === 'PRODUCTION'
    ? import.meta.env.VITE_WIDGET_CLIENT_KEY_FOR_TOSS_PAYPAL
    : import.meta.env.VITE_WIDGET_CLIENT_KEY_FOR_TOSS_PAYPAL_TEST;
function TossCheckoutPageForPayPalWidget({
  setChargeClicked,
  totalPrice,
  userInfo,
  voucherBox,
  currencyCode,
  countryCode,
  priceForPayPal,
  ...props
}) {
  const { t } = useTranslation();
  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const paymentAgreementWidgetRef = useRef(null);
  const [priceForToss, setPriceForToss] = useState(totalPrice);
  const [preOrderId, setPreOrderId] = useState(null);
  const browserLanguage = useLanguageChange(); 
  const orderId = nanoid();
  const [isLoading, setIsLoading] = useState(false);
  const orderHistory = {
    ...voucherBox
      ?.filter(elem => elem?.amount > 0)
      .reduce((acc, elem) => {
        acc[`${elem?.count}`] = [
          elem?.amount,
          elem?.listPriceForUSD,
          elem?.salePercentage,
          elem?.originalPriceForUSD,
          orderId,
          'date',
          browserLanguage, 
          currencyCode,
          'not yet',
          'card',
        ];
        return acc;
      }, {}),
  };
  const orderVouchersArr =
    voucherBox
      ?.filter(elem => elem?.amount > 0)
      ?.map(elem => [elem?.count, elem?.amount]) || [];
  const orderName = orderVouchersArr
    ?.map(elem => {
      const [count, amount] = elem;
      const voucherNames = {
        1: 'voucher.one-card-name',
        2: 'voucher.two-cards-name',
        3: 'voucher.three-cards-name',
        4: 'voucher.four-cards-name',
        5: 'voucher.five-cards-name',
        6: 'voucher.six-cards-name',
        7: 'voucher.seven-cards-name',
        8: 'voucher.eight-cards-name',
        9: 'voucher.nine-cards-name',
        10: 'voucher.ten-cards-name',
        11: 'voucher.eleven-cards-name',
        13: 'voucher.thirteen-cards-name',
      };
      return voucherNames[count]
        ? `${t(voucherNames[count])} x ${amount}`
        : null;
    })
    ?.filter(Boolean) 
    ?.join(', ');
  const updatedWidgetClientKey =
    userInfo?.email === import.meta.env.VITE_COS1
      ? import.meta.env.VITE_WIDGET_CLIENT_KEY_FOR_TOSS_TEST
      : widgetClientKey;
  const updatedClientKey =
    userInfo?.email === import.meta.env.VITE_COS1
      ? import.meta.env.VITE_WIDGET_CLIENT_KEY_FOR_TOSS_PAYPAL_TEST
      : clientKey;
  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(
          updatedWidgetClientKey,
          ANONYMOUS
        );
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error('Error fetching payment widget:', error);
      }
    };
    fetchPaymentWidget();
  }, [updatedWidgetClientKey]); 
  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      {
        value: priceForToss,
        currency: currencyCode,
        country: countryCode,
      },
      { variantKey: 'PAYPAL' }
    );
    const paymentAgreement = paymentWidget.renderAgreement('#agreement', {
      variantKey: 'agreement-en',
    });
    paymentAgreement.on('change', agreementStatus => {
      if (agreementStatus.agreedRequiredTerms) {
        paymentAgreementWidgetRef.current = paymentAgreement;
        paymentMethodsWidgetRef.current = paymentMethodsWidget;
      }
    });
  }, [
    paymentWidget,
    priceForToss,
    currencyCode, 
    countryCode, 
    browserLanguage,
  ]);
  const handlePayment = async userInfo => {
    const paymentAgreement = paymentAgreementWidgetRef.current;
    const agreementStatus = paymentAgreement.getAgreementStatus();
    if (agreementStatus.agreedRequiredTerms === false) return;
    setPreOrderId(orderId);
    const previousChargeInfo = await chargeApi.getPrePaymentForTossByOrderId({
      orderId: preOrderId,
    });
    let resultOfPostPrePayment;
    if (!previousChargeInfo.response) {
      resultOfPostPrePayment = await chargeApi.postPrePaymentForToss({
        orderId: orderId,
        paymentKey: 'not yet',
        orderName: orderName,
        orderHistory: orderHistory,
        orderVouchersArr: orderVouchersArr,
        amount: priceForToss,
        currency: currencyCode,
        country: countryCode,
        method: 'card',
        apiName: 'Toss',
      });
    }
    if (resultOfPostPrePayment?.response?.success === true) {
      const tossPayments = await loadTossPayments(updatedClientKey); 
      const mongoCreatedAtDate = new Date(
        resultOfPostPrePayment?.response?.createdChargeInfo?.createdAt
      );
      const formattedCreatedAtDate = mongoCreatedAtDate
        .toISOString()
        .replace('Z', '-0:00');
      try {
        await tossPayments.requestPayment('해외간편결제', {
          amount: priceForToss,
          orderId: orderId,
          orderName: orderName,
          customerName: userInfo?.displayName,
          successUrl: `${window.location.origin}/${browserLanguage}/toss/success`, 
          failUrl: `${window.location.origin}/${browserLanguage}/toss/fail`, 
          provider: 'PAYPAL',
          currency: currencyCode,
          country: countryCode,
          paymentMethodOptions: {
            paypal: {
              setTransactionContext: {
                sender_account_id: userInfo?.email.split('@')[0],
                full_name: userInfo?.displayName,
                sender_email: userInfo?.email,
                sender_country_code: countryCode,
                sender_create_date: formattedCreatedAtDate,
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
        if (error.code === 'USER_CANCEL') {
        } else if (error.code === 'INVALID_CARD_COMPANY') {
        }
      }
    }
  };
  const handlePaymentRequest = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await handlePayment(userInfo);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles['widget-container']}>
      <div id="payment-widget" />
      <div id="agreement" />
      <div className={styles['btn-box']}>
        <Button
          className={styles['btn-pay']}
          onClick={handlePaymentRequest}
          disabled={isLoading} 
        >
          {isLoading ? t('button.loading') : t('button.pay')}
        </Button>
        <Button
          className={styles['btn-pay-cancel']}
          onClick={() => setChargeClicked(false)}
        >
          {t('button.cancel')}
        </Button>
      </div>
    </div>
  );
}
export default TossCheckoutPageForPayPalWidget;
