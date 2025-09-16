import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/scss/_TossCheckoutPageForPayPalWidget.module.scss';
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { nanoid } from 'nanoid';
import Button from '../../UI/Button.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { chargeApi } from '../../api/chargeApi.jsx';
import { useTranslation } from 'react-i18next';

const widgetClientKey = import.meta.env.VITE_WIDGET_CLIENT_KEY_FOR_TOSS;
const clientKey = import.meta.env.VITE_WIDGET_CLIENT_KEY_FOR_TOSS_PAYPAL;

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
  const browswerLanguage = useLanguageChange();
  const orderId = nanoid();
  const [isLoading, setIsLoading] = useState(false);
  
  const orderHistory = {
    ...voucherBox
      ?.filter(elem => elem?.amount > 0)
      .reduce((acc, elem) => {
        if (elem?.amount > 0) {
          acc[`${elem?.count}`] = [
            elem?.amount,
            elem?.listPriceForUSD,
            elem?.salePercentage,
            elem?.originalPriceForUSD,
            orderId,
            'date',
            browswerLanguage,
            currencyCode,
            'not yet',
            'card',
          ];
        }
        return acc;
      }, {}),
  };

  const orderVouchersArr = voucherBox
    ?.filter(elem => elem?.amount > 0)
    ?.map((elem, i) => {
      if (elem?.amount > 0) return [elem?.count, elem?.amount];
    });
  const orderName = orderVouchersArr
    ?.filter(elem => elem !== undefined && elem !== null) 
    ?.map((elem, i) => {
      if (elem[0] === 1) return `${t(`voucher.one-card-name`)} x ${elem[1]}`;
      if (elem[0] === 2) return `${t(`voucher.two-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 3) return `${t(`voucher.three-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 4) return `${t(`voucher.four-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 5) return `${t(`voucher.five-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 6) return `${t(`voucher.six-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 7) return `${t(`voucher.seven-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 8) return `${t(`voucher.eight-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 9) return `${t(`voucher.nine-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 10) return `${t(`voucher.ten-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 11) return `${t(`voucher.eleven-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 13)
        return `${t(`voucher.thirteen-cards-name`)} x ${elem[1]}`;
    })
    ?.join(', ')
    ?.trim(','); 
  
  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(
          widgetClientKey,
          ANONYMOUS 
        );
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error('Error fetching payment widget:', error);
      }
    };

    fetchPaymentWidget();
  }, []);

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
    paymentMethodsWidgetRef,
    paymentAgreementWidgetRef,
    browswerLanguage,
  ]);

  const handlePayment = async () => {
    const paymentAgreement = paymentAgreementWidgetRef.current;
    const agreementStatus = paymentAgreement.getAgreementStatus();
    
    if (agreementStatus.agreedRequiredTerms === false) return;
    
    setPreOrderId(orderId);
    
    const previousChargeInfo = await chargeApi.getPrePaymentForTossByOrderId({
      orderId: preOrderId,
    });

    let resultOfPostPrePayment;
    if (previousChargeInfo.response === undefined || previousChargeInfo.response === null) {
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
      const tossPayments = await loadTossPayments(clientKey);
      
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
          successUrl: `${window.location.origin}/${browswerLanguage}/toss/success`,
          failUrl: `${window.location.origin}/${browswerLanguage}/toss/fail`,
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
      await handlePayment();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles['widget-container']}>
      {}
      {}
      {}
      <div id="payment-widget" />
      {}
      <div id="agreement" />
      {}
      <div className={styles['btn-box']}>
        <Button className={styles['btn-pay']} onClick={handlePaymentRequest}>
          {t(`button.pay`)}
        </Button>
        <Button
          className={styles['btn-pay-cancel']}
          onClick={() => {
            setChargeClicked(false);
          }}
        >
          {t(`button.cancel`)}
        </Button>
      </div>
    </div>
  );
}

export default TossCheckoutPageForPayPalWidget;
