import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from '../../styles/scss/_SuccessPage.module.scss';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { chargeApi } from '../../api/chargeApi.jsx';
import Button from '../../UI/Button.jsx';
import { useTranslation } from 'react-i18next';
export default function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const browserLanguage = useLanguageChange();
  const [vouchers, setVouchers] = useState(null); 
  const [method, setMethod] = useState(''); 
  const [currency, setCurrency] = useState(''); 
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState(0);
  const { t } = useTranslation();
  const moveToHome = () => {
    window.location.href = `${window.location.origin}/${browserLanguage}`;
  };
  const moveToMyPage = () => {
    window.location.href = `${window.location.origin}/${browserLanguage}/mypage`;
  };
  const requestData = {
    paymentType: searchParams.get('paymentType'),
    orderId: searchParams.get('orderId'),
    amount: searchParams.get('amount'),
    paymentKey: searchParams.get('paymentKey'),
  };
  async function confirm() {
    const { response, cleanup: cleanupForPostPay } =
      await chargeApi.postPaymentForToss({
        ...requestData,
      });
    const ok = response?.status >= 200 && response?.status < 300;
    if (!ok) {
      navigate(
        `/fail?message=${response?.data?.message}&code=${response?.data?.code}`
      );
      return;
    }
    let cleanupForGetPre;
    const getOrderInfo = async () => {
      const { response, cleanup: cleanup } =
        await chargeApi.getPrePaymentForTossByOrderId({
          orderId: requestData?.orderId,
        });
      cleanupForGetPre = cleanup;
      const result = response;
      const success_orderName = result?.orderName
        ?.split('\n')
        ?.join(', ');
      setVouchers(success_orderName);
      setMethod(result?.data?.method);
      setCurrency(result?.data?.currency);
      setOrderId(result?.data?.orderId);
      setAmount(result?.data?.amount);
    };
    await getOrderInfo(); 
    if (method === '가상계좌') return;
    if (vouchers === undefined)
      navigate(
        `/fail?message=${response?.data?.message}&code=${response?.data?.code}`
      );
    const { response: responseForPutPre, cleanup: cleanupForPutPre } =
      await chargeApi.putPrePaymentForToss({
        orderId: requestData?.orderId,
        paymentKey: requestData?.paymentKey,
      });
    return () => {
      cleanupForPostPay();
      if (cleanupForGetPre) cleanupForGetPre();
      cleanupForPutPre();
    };
  }
  useEffect(() => {
    confirm();
  }, [vouchers, searchParams, browserLanguage]); 
  return (
    <div className={styles['container']}>
      {browserLanguage === 'ja' ? (
        <div className={styles['payment-container-japanese']}>
          <div className={styles['payment-box-japanese']}>
            <div className={styles['content-japanese']}>
              <h2
                className={
                  browserLanguage === 'ja'
                    ? styles['japanese-potta-font']
                    : styles['korean-dongle-font']
                }
              >
                {method === '가상계좌'
                  ? t(`order.order_pending`)
                  : t(`order.order_success`)}
              </h2>
              <p>{`${t(`order.order_number`)}: ${
                searchParams.get('orderId') || orderId
              }`}</p>
              <p>{`${t(`order.order_vouchers`)}: ${vouchers}`}</p>
              <p>{`${t(`order.order_amount`)}: ${
                currency === 'USD' ? 'USD' : '￦'
              } ${
                Number(searchParams.get('amount')).toLocaleString() || amount
              } ${
                browserLanguage === 'ko' && method === '가상계좌'
                  ? '(入金待ち中)'
                  : ''
              }`}</p>
            </div>
            <div className={styles['btn-box']}>
              <Button
                className={styles['home-btn-japanese']}
                onClick={moveToHome}
              >
                {t(`button.home`)}
              </Button>
              <Button
                className={styles['mypage-btn-japanese']}
                onClick={moveToMyPage}
              >
                {t(`button.mypage`)}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles['payment-container']}>
          <div className={styles['payment-box']}>
            <div className={styles['content']}>
              <h2
                className={
                  browserLanguage === 'ja'
                    ? styles['japanese-potta-font']
                    : styles['korean-dongle-font']
                }
              >
                {method === '가상계좌'
                  ? t(`order.order_pending`)
                  : t(`order.order_success`)}
              </h2>
              <p>{`${t(`order.order_number`)}: ${searchParams.get(
                'orderId'
              )}`}</p>
              <p>{`${t(`order.order_vouchers`)}: ${vouchers}`}</p>
              <p>{`${t(`order.order_amount`)}: ${
                currency === 'USD' ? 'USD' : '￦'
              } ${Number(searchParams.get('amount')).toLocaleString()} ${
                browserLanguage === 'ko' && method === '가상계좌'
                  ? '(입금대기중)'
                  : browserLanguage === 'en' && method === '가상계좌'
                  ? '(Pending deposit)'
                  : ''
              }`}</p>
            </div>
            <div className={styles['btn-box']}>
              <Button className={styles['home-btn']} onClick={moveToHome}>
                {t(`button.home`)}
              </Button>
              <Button className={styles['mypage-btn']} onClick={moveToMyPage}>
                {t(`button.mypage`)}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
