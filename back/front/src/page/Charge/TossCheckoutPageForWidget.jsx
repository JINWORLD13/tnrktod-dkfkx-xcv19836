import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/scss/_TossCheckoutPageForWidget.module.scss';
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';
import Button from '../../UI/Button.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { chargeApi } from '../../api/chargeApi.jsx';
import { useTranslation } from 'react-i18next';
const widgetClientKey =
  import.meta.env.VITE_NODE_ENV === 'PRODUCTION'
    ? import.meta.env.VITE_WIDGET_CLIENT_KEY_FOR_TOSS
    : import.meta.env.VITE_WIDGET_CLIENT_KEY_FOR_TOSS_TEST;
const customerKey = import.meta.env.VITE_CUSTOMER_KEY_FOR_TOSS;
export default function TossCheckoutPageForWidget({
  setChargeClicked,
  totalPrice,
  userInfo,
  voucherBox,
  currencyCode,
  countryCode,
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
          elem?.listPrice,
          elem?.salePercentage,
          elem?.originalPrice,
          orderId,
          'date',
          browserLanguage, 
          currencyCode,
          'not yet',
          'method',
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
      { variantKey: 'DEFAULT' }
    );
    const paymentAgreement = paymentWidget.renderAgreement('#agreement', {
      variantKey: 'agreement-kr',
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
  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef?.current;
    if (paymentMethodsWidget == null) {
      return;
    }
    paymentMethodsWidget.updateAmount(priceForToss);
  }, [priceForToss, browserLanguage]); 
  const savePaymentInfo = async () => {
    const paymentMethod =
      paymentMethodsWidgetRef.current.getSelectedPaymentMethod();
    const paymentAgreement = paymentAgreementWidgetRef.current;
    const agreementStatus = paymentAgreement.getAgreementStatus();
    if (agreementStatus.agreedRequiredTerms === false) return;
    setPreOrderId(orderId);
    const { response: existingChargeInfo } =
      await chargeApi.getPrePaymentForTossByOrderId({
        orderId: preOrderId,
      });
    let resultOfPostPrePayment;
    if (!existingChargeInfo) { 
      const { response } = await chargeApi.postPrePaymentForToss({
        orderId: orderId,
        paymentKey: 'not yet',
        orderName: orderName,
        orderHistory: Object.fromEntries(
          Object.entries(orderHistory).map(([key, value]) => [
            key,
            value.map((elem, i) => {
              if (i === 9 && elem === 'method') {
                return paymentMethod?.method || elem;
              }
              return elem;
            }),
          ])
        ),
        orderVouchersArr: orderVouchersArr,
        amount: priceForToss,
        currency: currencyCode,
        country: countryCode,
        method: paymentMethod?.method,
        apiName: 'Toss',
      });
      resultOfPostPrePayment = response;
    }
    if (resultOfPostPrePayment?.success === true) {
      try {
        await paymentWidget
          ?.requestPayment({
            orderId: orderId,
            orderName: orderName,
            customerName: userInfo.displayName,
            customerEmail: userInfo.email,
            successUrl: `${window.location.origin}/${browserLanguage}/toss/success`, 
            failUrl: `${window.location.origin}/${browserLanguage}/toss/fail`, 
          })
          .catch(function (error) {
            if (error.code === 'USER_CANCEL') {
            }
            if (error.code === 'INVALID_CARD_COMPANY') {
            }
            if (error.code === 'INVALID_FLOW_MODE_PARAMETERS') {
            }
            if (error.code === 'NEED_CARD_PAYMENT_DETAIL') {
            }
          });
      } catch (error) {
        console.error('Error requesting payment:', error);
      }
    }
  };
  const handlePaymentRequest = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await savePaymentInfo();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles['widget-container']}>
      <div className={styles['payment-widget']} id="payment-widget" />
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
