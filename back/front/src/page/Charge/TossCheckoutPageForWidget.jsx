
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/scss/_TossCheckoutPageForWidget.module.scss';
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';
import Button from '../../UI/Button.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { chargeApi } from '../../api/chargeApi.jsx';
import { useTranslation } from 'react-i18next';

const widgetClientKey = import.meta.env.VITE_WIDGET_CLIENT_KEY_FOR_TOSS;

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
            elem?.listPrice,
            elem?.salePercentage,
            elem?.originalPrice,
            orderId,
            'date',
            browswerLanguage,
            currencyCode,
            'not yet',
            'method',
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
      if (elem[0] === 1) return `${t(`voucher.one-card-name`)}x${elem[1]}`;
      if (elem[0] === 2) return `${t(`voucher.two-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 3) return `${t(`voucher.three-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 4) return `${t(`voucher.four-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 5) return `${t(`voucher.five-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 6) return `${t(`voucher.six-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 7) return `${t(`voucher.seven-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 8) return `${t(`voucher.eight-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 9) return `${t(`voucher.nine-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 10) return `${t(`voucher.ten-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 11)
        return `${t(`voucher.eleven-cards-name`)} x ${elem[1]}`;
      if (elem[0] === 13)
        return `${t(`voucher.thirteen-cards-name`)} x ${elem[1]}`;
    })
    ?.join(', ')
    ?.trim(','); 
  const orderVouchersObj = Object.fromEntries(
    orderVouchersArr
      ?.filter(elem => elem !== undefined)
      .map(elem => [elem[0], elem[1]])
  );
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
    paymentMethodsWidgetRef,
    paymentAgreementWidgetRef,
    browswerLanguage,
  ]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef?.current;
    if (paymentMethodsWidget == null) {
      return;
    }
    paymentMethodsWidget.updateAmount(priceForToss);
  }, [priceForToss, browswerLanguage]);
  
  const savePaymentInfo = async () => {
    
    const paymentMethod =
      paymentMethodsWidgetRef.current.getSelectedPaymentMethod();

    const paymentAgreement = paymentAgreementWidgetRef.current;
    const agreementStatus = paymentAgreement.getAgreementStatus();
    
    if (agreementStatus.agreedRequiredTerms === false) return;
    
    setPreOrderId(orderId);
    
    const { response: existingChargeInfo, cleanup } =
      await chargeApi.getPrePaymentForTossByOrderId({
        orderId: preOrderId,
      });

    let resultOfPostPrePayment;
    if (existingChargeInfo === undefined || existingChargeInfo === null) {
      const { response, cleanup } = await chargeApi.postPrePaymentForToss({
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
            successUrl: `${window.location.origin}/${browswerLanguage}/toss/success`,
            failUrl: `${window.location.origin}/${browswerLanguage}/toss/fail`,
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
      {}
      {}
      {}
      <div className={styles['payment-widget']} id="payment-widget" />
      {}
      <div id="agreement" />
      {}
      <div className={styles['btn-box']}>
        <Button
          className={styles['btn-pay']}
          onClick={e => {
            handlePaymentRequest();
          }}
        >
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
