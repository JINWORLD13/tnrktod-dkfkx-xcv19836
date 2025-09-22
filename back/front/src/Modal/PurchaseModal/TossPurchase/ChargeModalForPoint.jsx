import React, { useEffect, useState } from 'react';
import Card from '../../../../UI/Card.jsx';
import styles from '../../styles/scss/_ChargeModal.module.scss';
import useLanguageChange from '../../../../hooks/useEffect/useLanguageChange.jsx';
import { useTranslation } from 'react-i18next';
import Button from '../../../../UI/Button.jsx';
import { chargeApi } from '../../../../api/chargeApi.jsx';
import TossCheckoutPageForWidget from '../../../Charge/TossCheckoutPageForWidget.jsx';
import TossCheckoutPageForForeigners from '../../../Charge/TossCheckoutPageForForeigners.jsx';
import RefundPolicyModal from '../../RefundPolicyModal.jsx';
import useFetchUserData from '../../hooks/useEffect/useFetchUserData.jsx';
import { userApi } from '../../../../api/userApi.jsx';
import { spreadPriceObjForVoucher } from '../../../../data/spreadList/spreadPrice.jsx';
import PriceInfoModal from '../../PriceInfoModal.jsx';
import TossCheckoutPageForPayPalWidget from '../../../Charge/TossCheckoutPageForPayPalWidget.jsx';
const ChargeModal = ({
  isRefundPolicyOpen,
  updateRefundPolicyOpen,
  ...props
}) => {
  const browserLanguage = useLanguageChange();
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState({});
  const [isConfirmClicked, setConfirmClicked] = useState(false);
  const [isChargeClicked, setChargeClicked] = useState(false);
  const [idForCurrency, setIdForCurrency] = useState(0);
  const minimumPointForStripe = 10;
  const [point, setPoint] = useState(minimumPointForStripe);
  const [rate, setRate] = useState({}); 
  const [price, setPrice] = useState(0);
  const [convertedUSD, setConvertedUSD] = useState(0); 
  const [convertedKRW, setConvertedKRW] = useState(0); 
  const [convertedJPY, setConvertedJPY] = useState(0); 
  const [card, setCard] = useState('');
  const getUser = useFetchUserData(userApi, setUserInfo);
  useEffect(() => {
    getUser();
  }, []);
  const fetchGooglePayCurrencyRate = async () => {
    const rateData = await chargeApi.getRate(); 
    setRate(rateData);
    if (browserLanguage === 'en') {
      setIdForCurrency(1);
      const calculatedUSD = point * 0.01;
      setConvertedUSD(calculatedUSD);
      setPrice(convertedUSD); 
    }
    if (browserLanguage === 'ko') {
      setIdForCurrency(2);
      const calculatedKRW = point * 10;
      setConvertedKRW(calculatedKRW);
      setPrice(convertedKRW); 
    }
    if (browserLanguage === 'ja') {
      setIdForCurrency(3);
      const calculatedJPY = point * 1;
      setConvertedJPY(calculatedJPY);
      setPrice(convertedJPY); 
    }
  };
  const fetchTossCurrencyRate = async () => {
    const calculatedKRW = point * 10;
    setConvertedKRW(calculatedKRW);
    setPrice(convertedKRW); 
  };
  useEffect(() => {
    const updatePriceAndPoint = async () => {
      await fetchTossCurrencyRate(); 
    };
    updatePriceAndPoint();
  }, [point, convertedKRW, browserLanguage]);
  const points = {
    reset: 'reset',
    '1p': 1,
    '-1': -1,
    '10p': 10,
    '-1': -10,
    '100p': 100,
    '-1': -100,
    '1000p': 1000,
    '-1': -1000,
  };
  let currencyCode;
  let countryCode;
  if (idForCurrency === 1) {
    currencyCode = 'USD';
    countryCode = 'US';
  }
  if (idForCurrency === 2) {
    currencyCode = 'KRW';
    countryCode = 'KR';
  }
  if (idForCurrency === 3) {
    currencyCode = 'JPY';
    countryCode = 'JP';
  }
  const closeChargeModal = () => {
    if (
      props?.updateChargeModalOpen !== undefined &&
      props?.updateChargeModalOpen !== null
    )
      props?.updateChargeModalOpen(false);
  };
  const openRefundPolicyModal = () => {
    updateRefundPolicyOpen(true);
  };
  const openChargePage = () => {
    setConfirmClicked(true);
  };
  const deletePrePaymentByPaymentKey = async () => {
    await chargeApi.deletePrePaymentForTossByPaymentKey({
      paymentKey: 'not yet',
    });
  };
  useEffect(() => {
    if (isChargeClicked && browserLanguage !== 'ko') {
      closeChargeModal();
    }
  }, [isChargeClicked, browserLanguage, isRefundPolicyOpen]);
  return (
    <>
      <div
        className={`${styles['backdrop']} ${
          isRefundPolicyOpen ? styles['no-scroll'] : ''
        } `}
      />
      {isConfirmClicked === false &&
        isChargeClicked === false &&
        isRefundPolicyOpen === true && (
          <RefundPolicyModal updateRefundPolicyOpen={updateRefundPolicyOpen} />
        )}
      {isChargeClicked && (
        <div
          className={
            browserLanguage === 'ja'
              ? styles['toss-payment-japanese']
              : styles['toss-payment']
          }
        >
          {browserLanguage === 'ko' ? (
            <TossCheckoutPageForWidget
              setChargeClicked={setChargeClicked}
              price={price}
              point={point}
              userInfo={userInfo}
            />
          ) : card === '3C' ? (
            <TossCheckoutPageForForeigners
              setChargeClicked={setChargeClicked}
              price={price}
              point={point}
              userInfo={userInfo}
              card={card}
            />
          ) : (
            <TossCheckoutPageForWidget
              setChargeClicked={setChargeClicked}
              price={price}
              point={point}
              userInfo={userInfo}
            />
          )}
        </div>
      )}
      {isConfirmClicked === true && isChargeClicked === false && (
        <Card className={styles['purchase-modal']}>
          {}
          <header className={styles['charge-content']}>
            <TossPointPurchase
              convertedKRW={convertedKRW}
              convertedJPY={convertedJPY}
              convertedUSD={convertedUSD}
              point={point}
              setPoint={setPoint}
              points={points}
              minimumPointForStripe={minimumPointForStripe}
            />
          </header>
          <footer className={styles['button-box']}>
            <TossPointPurchaseButton
              deletePrePaymentByPaymentKey={deletePrePaymentByPaymentKey}
              setChargeClicked={setChargeClicked}
              setCard={setCard}
              closeChargeModal={closeChargeModal}
            />
            ;
          </footer>
        </Card>
      )}
      {isConfirmClicked === false && isRefundPolicyOpen === false && (
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
          <footer className={styles['button-box']}>
            <Button
              className={styles['button']}
              onClick={() => {
                openRefundPolicyModal();
              }}
            >
              {t(`button.refund-policy`)}
            </Button>
            <Button
              className={styles['button']}
              onClick={() => {
                deletePrePaymentByPaymentKey({ paymentKey: 'not yet' });
                openChargePage();
              }}
            >
              {t(`button.confirm`)}
            </Button>
            <Button
              className={styles['button']}
              onClick={() => {
                deletePrePaymentByPaymentKey({ paymentKey: 'not yet' });
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
export default ChargeModal;
const TossPointPurchase = ({
  convertedKRW,
  convertedJPY,
  convertedUSD,
  point,
  setPoint,
  points,
  minimumPointForStripe,
  ...props
}) => {
  const browserLanguage = useLanguageChange();
  return (
    <>
      <div className={styles['empty']}></div>
      <div className={styles['empty']}></div>
      {browserLanguage === 'en' && (
        <>
          <div className={styles['point']}>CHARGE POINT : {point}P</div>
          <div className={styles['price']}>
            (CHARGE PRICE : {convertedKRW}KRW)
          </div>
          {}
        </>
      )}
      {browserLanguage === 'ko' && (
        <>
          <div className={styles['point']}>충전 포인트 : {point}P</div>
          <div className={styles['price']}>(충전 가격 : {convertedKRW}원)</div>
          {}
        </>
      )}
      {browserLanguage === 'ja' && (
        <>
          <div className={styles['point-japanese']}>
            チャージポイント : {point}P
          </div>
          <div className={styles['price-japanese']}>
            (チャージ料金 : {convertedKRW}ウォン)
          </div>
          {}
        </>
      )}
      <div className={styles['empty']}></div>
      <div className={styles['point-button-box']}>
        <div>
          <Button
            className={styles['point-button']}
            onClick={() => {
              setPoint(prev => {
                if (point === minimumPointForStripe)
                  return minimumPointForStripe;
                if (prev + -1 < minimumPointForStripe)
                  return minimumPointForStripe;
                return prev + -1;
              });
            }}
          >
            {voucherAmount['-1']}
          </Button>
          <Button
            className={styles['point-button']}
            onClick={() => {
              setPoint(prev => {
                if (point === minimumPointForStripe)
                  return minimumPointForStripe;
                if (prev + -1 < minimumPointForStripe)
                  return minimumPointForStripe;
                return prev + -1;
              });
            }}
          >
            {voucherAmount['-1']}
          </Button>
          <Button
            className={styles['point-button']}
            onClick={() => {
              setPoint(prev => {
                if (point === minimumPointForStripe)
                  return minimumPointForStripe;
                if (prev + -1 < minimumPointForStripe)
                  return minimumPointForStripe;
                return prev + -1;
              });
            }}
          >
            {voucherAmount['-1']}
          </Button>
          <Button
            className={styles['point-button']}
            onClick={() => {
              setPoint(prev => {
                if (point === minimumPointForStripe)
                  return minimumPointForStripe;
                if (prev + -1 < minimumPointForStripe)
                  return minimumPointForStripe;
                return prev + -1;
              });
            }}
          >
            {voucherAmount['-1']}
          </Button>
        </div>
        <Button
          className={styles['point-button']}
          onClick={() => {
            setPoint(minimumPointForStripe);
          }}
        >
          {voucherAmount['reset']}
        </Button>
        <div>
          <Button
            className={styles['point-button']}
            onClick={() => {
              setPoint(prev => prev + 1);
            }}
          >
            {voucherAmount['1p']}
          </Button>
          <Button
            className={styles['point-button']}
            onClick={() => {
              setPoint(prev => prev + 10);
            }}
          >
            {voucherAmount['10p']}
          </Button>
          <Button
            className={styles['point-button']}
            onClick={() => {
              setPoint(prev => prev + 10);
            }}
          >
            {voucherAmount['100p']}
          </Button>
          <Button
            className={styles['point-button']}
            onClick={() => {
              setPoint(prev => prev + 10);
            }}
          >
            {voucherAmount['1000p']}
          </Button>
        </div>
      </div>
      <div className={styles['empty']}></div>
    </>
  );
};
const TossPointPurchaseButton = ({
  deletePrePaymentByPaymentKey,
  setChargeClicked,
  setCard,
  closeChargeModal,
  ...props
}) => {
  const browserLanguage = useLanguageChange();
  const { t } = useTranslation();
  return (
    <>
      {browserLanguage === 'ko' && (
        <Button
          onClick={() => {
            deletePrePaymentByPaymentKey({ paymentKey: 'not yet' });
            const timerId = setTimeout(() => {
              setChargeClicked(true);
            }, 1000);
            return () => clearTimeout(timerId); 
          }}
        >
          {t(`button.charge`)}
        </Button>
      )}
      {browserLanguage === 'ja' && (
        <>
          {}
          <Button
            onClick={() => {
              deletePrePaymentByPaymentKey({ paymentKey: 'not yet' });
              const timerId = setTimeout(() => {
                setChargeClicked(true);
              }, 1000);
              return () => clearTimeout(timerId); 
            }}
          >
            {t(`button.paypal`)}
          </Button>
        </>
      )}
      {browserLanguage === 'en' && (
        <>
          {}
          {}
          <Button
            onClick={() => {
              deletePrePaymentByPaymentKey({ paymentKey: 'not yet' });
              const timerId = setTimeout(() => {
                setChargeClicked(true);
              }, 1000);
              return () => clearTimeout(timerId); 
            }}
          >
            {t(`button.paypal`)}
          </Button>
          <Button
            onClick={() => {
              deletePrePaymentByPaymentKey({ paymentKey: 'not yet' });
              setCard('3C');
              const timerId = setTimeout(() => {
                setChargeClicked(true);
              }, 1000);
              return () => clearTimeout(timerId); 
            }}
          >
            {t(`card.union_pay`)}
          </Button>
        </>
      )}
      {}
      {}
      <Button
        className={styles['button']}
        onClick={() => {
          deletePrePaymentByPaymentKey({ paymentKey: 'not yet' });
          closeChargeModal();
        }}
      >
        {t(`button.close`)}
      </Button>
    </>
  );
};
