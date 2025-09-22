import React, { useEffect, useState } from 'react';
import styles from '../../../styles/scss/_ChargeModal.module.scss';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange.jsx';
import { useTranslation } from 'react-i18next';
import Button from '../../../UI/Button.jsx';
import CancelButton from '../../../UI/CancelButton.jsx';
import { chargeApi } from '../../../api/chargeApi.jsx';
import TossCheckoutPageForWidget from '../../../Page/Charge/TossCheckoutPageForWidget.jsx';
import RefundPolicyModal from '../../RefundPolicyModal.jsx';
import { spreadPriceObjForVoucher } from '../../../data/spreadList/spreadPrice.jsx';
import PriceInfoModal from '../../PriceInfoModal.jsx';
import TossCheckoutPageForPayPalWidget from '../../../Page/Charge/TossCheckoutPageForPayPalWidget.jsx';
import { voucherBox } from '../../../data/voucherBox/voucherBox.jsx';
import Card from '../../../UI/Card.jsx';
const ChargeModal = ({
  isRefundPolicyOpen,
  updateRefundPolicyOpen,
  isPriceInfoModalOpen,
  updatePriceInfoModalOpen,
  setBlinkModalForChargingKRWOpen,
  setBlinkModalForChargingUSDOpen,
  userInfoFromMyPage,
  setUnavailableVoucher,
  requiredVoucherInfo,
  ...props
}) => {
  const browserLanguage = useLanguageChange();
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState(userInfoFromMyPage || {});
  const [requiredVoucherName, serRequiredVoucherName] = useState(prev => {
    if (requiredVoucherInfo?.name === 1) return 'I';
    if (requiredVoucherInfo?.name === 2) return 'II';
    if (requiredVoucherInfo?.name === 3) return 'III';
    if (requiredVoucherInfo?.name === 4) return 'IV';
    if (requiredVoucherInfo?.name === 5) return 'V';
    if (requiredVoucherInfo?.name === 6) return 'VI';
    if (requiredVoucherInfo?.name === 7) return 'VII';
    if (requiredVoucherInfo?.name === 8) return 'VIII';
    if (requiredVoucherInfo?.name === 9) return 'IX';
    if (requiredVoucherInfo?.name === 10) return 'X';
    if (requiredVoucherInfo?.name === 11) return 'XI';
    if (requiredVoucherInfo?.name === 13) return 'XIII';
  });
  const [isConfirmClicked, setConfirmClicked] = useState(false);
  const [isChargeClicked, setChargeClicked] = useState(false);
  const [voucherAmount, setVoucherAmount] = useState({
    'one-card': 0,
    'two-cards': 0,
    'three-cards': 0,
    'four-cards': 0,
    'five-cards': 0,
    'six-cards': 0,
    'seven-cards': 0,
    'eight-cards': 0,
    'nine-cards': 0,
    'ten-cards': 0,
    'eleven-cards': 0,
    'thirteen-cards': 0,
  });
  const [price, setPrice] = useState({
    'one-card': 0,
    'two-cards': 0,
    'three-cards': 0,
    'four-cards': 0,
    'five-cards': 0,
    'six-cards': 0,
    'seven-cards': 0,
    'eight-cards': 0,
    'nine-cards': 0,
    'ten-cards': 0,
    'eleven-cards': 0,
    'thirteen-cards': 0,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceForPayPal, setPriceForPayPal] = useState(0);
  const [card, setCard] = useState('');
  useEffect(() => {
    setUserInfo(userInfo || {});
  }, []);
  const calculatePrice = async () => {
    setPrice(prev => {
      let newPrice;
      if (browserLanguage === 'ko') {
        newPrice = {
          'one-card':
            voucherAmount['one-card'] *
            spreadPriceObjForVoucher[1]['listPrice'],
          'two-cards':
            voucherAmount['two-cards'] *
            spreadPriceObjForVoucher[2]['listPrice'],
          'three-cards':
            voucherAmount['three-cards'] *
            spreadPriceObjForVoucher[3]['listPrice'],
          'four-cards':
            voucherAmount['four-cards'] *
            spreadPriceObjForVoucher[4]['listPrice'],
          'five-cards':
            voucherAmount['five-cards'] *
            spreadPriceObjForVoucher[5]['listPrice'],
          'six-cards':
            voucherAmount['six-cards'] *
            spreadPriceObjForVoucher[6]['listPrice'],
          'seven-cards':
            voucherAmount['seven-cards'] *
            spreadPriceObjForVoucher[7]['listPrice'],
          'eight-cards':
            voucherAmount['eight-cards'] *
            spreadPriceObjForVoucher[8]['listPrice'],
          'nine-cards':
            voucherAmount['nine-cards'] *
            spreadPriceObjForVoucher[9]['listPrice'],
          'ten-cards':
            voucherAmount['ten-cards'] *
            spreadPriceObjForVoucher[10]['listPrice'],
          'eleven-cards':
            voucherAmount['eleven-cards'] *
            spreadPriceObjForVoucher[11]['listPrice'],
          'thirteen-cards':
            voucherAmount['thirteen-cards'] *
            spreadPriceObjForVoucher[13]['listPrice'],
        };
        const totalPriceWithNewPrices =
          newPrice['one-card'] +
          newPrice['two-cards'] +
          newPrice['three-cards'] +
          newPrice['four-cards'] +
          newPrice['five-cards'] +
          newPrice['six-cards'] +
          newPrice['seven-cards'] +
          newPrice['eight-cards'] +
          newPrice['nine-cards'] +
          newPrice['ten-cards'] +
          newPrice['eleven-cards'] +
          newPrice['thirteen-cards'];
        setTotalPrice(totalPriceWithNewPrices);
      } else {
        newPrice = {
          'one-card':
            voucherAmount['one-card'] *
            spreadPriceObjForVoucher[1]['listPriceForUSD'],
          'two-cards':
            voucherAmount['two-cards'] *
            spreadPriceObjForVoucher[2]['listPriceForUSD'],
          'three-cards':
            voucherAmount['three-cards'] *
            spreadPriceObjForVoucher[3]['listPriceForUSD'],
          'four-cards':
            voucherAmount['four-cards'] *
            spreadPriceObjForVoucher[4]['listPriceForUSD'],
          'five-cards':
            voucherAmount['five-cards'] *
            spreadPriceObjForVoucher[5]['listPriceForUSD'],
          'six-cards':
            voucherAmount['six-cards'] *
            spreadPriceObjForVoucher[6]['listPriceForUSD'],
          'seven-cards':
            voucherAmount['seven-cards'] *
            spreadPriceObjForVoucher[7]['listPriceForUSD'],
          'eight-cards':
            voucherAmount['eight-cards'] *
            spreadPriceObjForVoucher[8]['listPriceForUSD'],
          'nine-cards':
            voucherAmount['nine-cards'] *
            spreadPriceObjForVoucher[9]['listPriceForUSD'],
          'ten-cards':
            voucherAmount['ten-cards'] *
            spreadPriceObjForVoucher[10]['listPriceForUSD'],
          'eleven-cards':
            voucherAmount['eleven-cards'] *
            spreadPriceObjForVoucher[11]['listPriceForUSD'],
          'thirteen-cards':
            voucherAmount['thirteen-cards'] *
            spreadPriceObjForVoucher[13]['listPriceForUSD'],
        };
        setPriceForPayPal({
          1: newPrice['one-card'],
          2: newPrice['two-cards'],
          3: newPrice['three-cards'],
          4: newPrice['four-cards'],
          5: newPrice['five-cards'],
          6: newPrice['six-cards'],
          7: newPrice['seven-cards'],
          8: newPrice['eight-cards'],
          9: newPrice['nine-cards'],
          10: newPrice['ten-cards'],
          11: newPrice['eleven-cards'],
          13: newPrice['thirteen-cards'],
        });
        const totalPriceWithNewPrices =
          newPrice['one-card'] +
          newPrice['two-cards'] +
          newPrice['three-cards'] +
          newPrice['four-cards'] +
          newPrice['five-cards'] +
          newPrice['six-cards'] +
          newPrice['seven-cards'] +
          newPrice['eight-cards'] +
          newPrice['nine-cards'] +
          newPrice['ten-cards'] +
          newPrice['eleven-cards'] +
          newPrice['thirteen-cards'];
        setTotalPrice(Math.round(totalPriceWithNewPrices * 100) / 100);
      }
      return newPrice;
    });
  };
  useEffect(() => {
    calculatePrice();
  }, [voucherAmount, browserLanguage]);
  let currencyCode;
  let countryCode;
  if (browserLanguage === 'en') {
    currencyCode = 'USD';
    countryCode = 'US';
  }
  if (browserLanguage === 'ko') {
    currencyCode = 'KRW';
    countryCode = 'KR';
  }
  if (browserLanguage === 'ja') {
    currencyCode = 'USD';
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
  const openPriceInfoModal = () => {
    updatePriceInfoModalOpen(true);
  };
  const openChargePage = () => {
    setConfirmClicked(true);
  };
  const deletePrePaymentByPaymentKey = async () => {
    await chargeApi.deletePrePaymentForTossByPaymentKey({
      paymentKey: 'not yet',
    });
  };
  const fetchedVoucherBox = voucherBox(voucherAmount, price);
  return (
    <>
      <div
        className={`${styles['backdrop']} ${
          isRefundPolicyOpen ? styles['no-scroll'] : ''
        } `}
      />
      {isConfirmClicked === true &&
        isChargeClicked === false &&
        isRefundPolicyOpen === false &&
        isPriceInfoModalOpen === true && (
          <PriceInfoModal
            updatePriceInfoModalOpen={updatePriceInfoModalOpen}
            voucherBox={fetchedVoucherBox}
          />
        )}
      {isConfirmClicked === false &&
        isChargeClicked === false &&
        isPriceInfoModalOpen === false &&
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
              totalPrice={totalPrice}
              userInfo={userInfo}
              voucherBox={fetchedVoucherBox}
              currencyCode={currencyCode}
              countryCode={countryCode}
            />
          ) : (
            <TossCheckoutPageForPayPalWidget
              setChargeClicked={setChargeClicked}
              totalPrice={totalPrice}
              userInfo={userInfo}
              voucherBox={fetchedVoucherBox}
              currencyCode={currencyCode}
              countryCode={countryCode}
              priceForPayPal={priceForPayPal}
            />
          )}
        </div>
      )}
      {isConfirmClicked === true &&
        isChargeClicked === false &&
        isPriceInfoModalOpen === false && (
          <Card className={styles['purchase-modal']}>
            <header className={styles['charge-content']}>
              <TossVoucherPurchase
                voucherBox={fetchedVoucherBox}
                voucherAmount={voucherAmount}
                setVoucherAmount={setVoucherAmount}
                totalPrice={totalPrice}
                setUnavailableVoucher={setUnavailableVoucher}
              />
            </header>
            <footer className={styles['purchase-button-box']}>
              <TossVoucherPurchaseButton
                voucherBox={fetchedVoucherBox}
                deletePrePaymentByPaymentKey={deletePrePaymentByPaymentKey}
                setChargeClicked={setChargeClicked}
                setCard={setCard}
                closeChargeModal={closeChargeModal}
                openPriceInfoModal={openPriceInfoModal}
                totalPrice={totalPrice}
                setBlinkModalForChargingKRWOpen={
                  setBlinkModalForChargingKRWOpen
                }
                setBlinkModalForChargingUSDOpen={
                  setBlinkModalForChargingUSDOpen
                }
              />
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
            {requiredVoucherInfo && (
              <p>{`${t(
                `voucher.required-voucher`
              )}  : ${requiredVoucherName}${t(`unit.kind-of-voucher`)} x ${
                requiredVoucherInfo?.requiredAmount -
                requiredVoucherInfo?.remainingAmount
              }${t(`unit.ea`)}`}</p>
            )}
            {requiredVoucherInfo && (
              <p>{`${t(`voucher.remaining-voucher`)} : ${
                requiredVoucherInfo?.remainingAmount
              }${t(`unit.ea`)}`}</p>
            )}
          </div>
          {}
          <footer className={styles['purchase-button-box']}>
            <Button
              className={styles['purchase-button']}
              onClick={() => {
                openRefundPolicyModal();
              }}
            >
              {t(`button.refund-policy`)}
            </Button>
            <Button
              className={styles['purchase-button']}
              onClick={() => {
                openChargePage();
              }}
            >
              {t(`button.confirm`)}
            </Button>
            <CancelButton
              className={styles['purchase-button']}
              onClick={(e = null) => {
                closeChargeModal();
              }}
            >
              {t(`button.close`)}
            </CancelButton>
          </footer>
        </Card>
      )}
    </>
  );
};
export default ChargeModal;
const TossVoucherPurchase = ({
  voucherBox,
  voucherAmount,
  setVoucherAmount,
  totalPrice,
  setUnavailableVoucher,
  ...props
}) => {
  const browserLanguage = useLanguageChange();
  return (
    <>
      <div className={styles['empty']}></div>
      <div className={styles['empty']}></div>
      {browserLanguage === 'en' && (
        <>
          <div className={styles['voucher-box']}>
            <div>
              <div className={styles['flex-grow2']} />
              <div>
                {voucherBox?.splice(0, 6)?.map((elem, i) => {
                  return (
                    <div className={styles['voucher']}>
                      <div>
                        {elem?.name} X {elem?.amount} EA = {elem?.price}USD{' '}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles['flex-grow']} />
              <div>
                {voucherBox?.map((elem, i) => {
                  return (
                    <div className={styles['voucher']}>
                      <div>
                        {elem?.name} X {elem?.amount} EA = {elem?.price}USD{' '}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles['flex-grow2']} />
            </div>
            <div className={styles['voucher-total-price']}>
              {`TOTAL : ${totalPrice}`} USD
            </div>
          </div>
        </>
      )}
      {browserLanguage === 'ko' && (
        <>
          <div className={styles['voucher-box']}>
            <div>
              <div className={styles['flex-grow2']} />
              <div>
                {voucherBox?.splice(0, 6)?.map((elem, i) => {
                  return (
                    <div className={styles['voucher']}>
                      <div>
                        {elem?.name} X {elem?.amount}장 = {elem?.price}원{' '}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles['flex-grow']} />
              <div>
                {voucherBox?.map((elem, i) => {
                  return (
                    <div className={styles['voucher']}>
                      <div>
                        {elem?.name} X {elem?.amount}장 = {elem?.price}원{' '}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles['flex-grow2']} />
            </div>
            <div className={styles['voucher-total-price']}>
              {`합 계 : ${totalPrice}`} 원
            </div>
          </div>
        </>
      )}
      {browserLanguage === 'ja' && (
        <>
          <div className={styles['voucher-box-japanese']}>
            <div>
              <div className={styles['flex-grow2']} />
              <div>
                {voucherBox?.splice(0, 6)?.map((elem, i) => {
                  return (
                    <div className={styles['voucher-japanese']}>
                      <div>
                        {elem?.name} X {elem?.amount}枚 = {elem?.price}USD{' '}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles['flex-grow']} />
              <div>
                {voucherBox?.map((elem, i) => {
                  return (
                    <div className={styles['voucher-japanese']}>
                      <div>
                        {elem?.name} X {elem?.amount}枚 = {elem?.price}USD{' '}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles['flex-grow2']} />
            </div>
            <div className={styles['voucher-total-price-japanese']}>
              {`合 計 : USD ${totalPrice}`}
            </div>
          </div>
        </>
      )}
      <div className={styles['empty']}></div>
      {browserLanguage === 'ja' ? (
        <div className={styles['voucher-button-box-japanese']}>
          <div>
            <div>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    return { ...prev, 'one-card': prev['one-card'] + 1 };
                  });
                }}
              >
                <span className={styles['one-card']}>+ I</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    return { ...prev, 'two-cards': prev['two-cards'] + 1 };
                  });
                }}
              >
                <span className={styles['two-cards']}>+ II</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    return { ...prev, 'three-cards': prev['three-cards'] + 1 };
                  });
                }}
              >
                <span className={styles['three-cards']}>+ III</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    return { ...prev, 'four-cards': prev['four-cards'] + 1 };
                  });
                }}
              >
                <span className={styles['four-cards']}>+ IV</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    return { ...prev, 'five-cards': prev['five-cards'] + 1 };
                  });
                }}
              >
                <span className={styles['five-cards']}>+ V</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    return { ...prev, 'six-cards': prev['six-cards'] + 1 };
                  });
                }}
              >
                <span className={styles['six-cards']}>+ VI</span>
              </Button>
            </div>
            <div>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    if (prev['one-card'] === 0) return { ...prev };
                    return { ...prev, 'one-card': prev['one-card'] - 1 };
                  });
                }}
              >
                <span className={styles['one-card']}>- I</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    if (prev['two-cards'] === 0) return { ...prev };
                    return { ...prev, 'two-cards': prev['two-cards'] - 1 };
                  });
                }}
              >
                <span className={styles['two-cards']}>- II</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    if (prev['three-cards'] === 0) return { ...prev };
                    return { ...prev, 'three-cards': prev['three-cards'] - 1 };
                  });
                }}
              >
                <span className={styles['three-cards']}>- III</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    if (prev['four-cards'] === 0) return { ...prev };
                    return { ...prev, 'four-cards': prev['four-cards'] - 1 };
                  });
                }}
              >
                <span className={styles['four-cards']}>- IV</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    if (prev['five-cards'] === 0) return { ...prev };
                    return { ...prev, 'five-cards': prev['five-cards'] - 1 };
                  });
                }}
              >
                <span className={styles['five-cards']}>- V</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    if (prev['six-cards'] === 0) return { ...prev };
                    return { ...prev, 'six-cards': prev['six-cards'] - 1 };
                  });
                }}
              >
                <span className={styles['six-cards']}>- VI</span>
              </Button>
            </div>
          </div>
          <Button
            className={styles['voucher-button-japanese']}
            onClick={() => {
              setVoucherAmount({
                'one-card': 0,
                'two-cards': 0,
                'three-cards': 0,
                'four-cards': 0,
                'five-cards': 0,
                'six-cards': 0,
                'seven-cards': 0,
                'eight-cards': 0,
                'nine-cards': 0,
                'ten-cards': 0,
                'eleven-cards': 0,
                'thirteen-cards': 0,
              });
            }}
          >
            {'Reset'}
          </Button>
          <div>
            <div>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['seven-cards']}>+ VII</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['eight-cards']}>+ VIII</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['nine-cards']}>+ IX</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    return { ...prev, 'ten-cards': prev['ten-cards'] + 1 };
                  });
                }}
              >
                <span className={styles['ten-cards']}>+ X</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['eleven-cards']}>+ XI</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['thirteen-cards']}>+ XIII</span>
              </Button>
            </div>
            <div>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['seven-cards']}>- VII</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['eight-cards']}>- VIII</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['nine-cards']}>- IX</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    if (prev['ten-cards'] === 0) return { ...prev };
                    return { ...prev, 'ten-cards': prev['ten-cards'] - 1 };
                  });
                }}
              >
                <span className={styles['ten-cards']}>- X</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['eleven-cards']}>- XI</span>
              </Button>
              <Button
                className={styles['voucher-button-japanese']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['thirteen-cards']}>- XIII</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles['voucher-button-box']}>
          <div>
            <div>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    return { ...prev, 'one-card': prev['one-card'] + 1 };
                  });
                }}
              >
                <span className={styles['one-card']}>+ I</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    return { ...prev, 'two-cards': prev['two-cards'] + 1 };
                  });
                }}
              >
                <span className={styles['two-cards']}>+ II</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    return { ...prev, 'three-cards': prev['three-cards'] + 1 };
                  });
                }}
              >
                <span className={styles['three-cards']}>+ III</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    return { ...prev, 'four-cards': prev['four-cards'] + 1 };
                  });
                }}
              >
                <span className={styles['four-cards']}>+ IV</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    return { ...prev, 'five-cards': prev['five-cards'] + 1 };
                  });
                }}
              >
                <span className={styles['five-cards']}>+ V</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    return { ...prev, 'six-cards': prev['six-cards'] + 1 };
                  });
                }}
              >
                <span className={styles['six-cards']}>+ VI</span>
              </Button>
            </div>
            <div>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    if (prev['one-card'] === 0) return { ...prev };
                    return { ...prev, 'one-card': prev['one-card'] - 1 };
                  });
                }}
              >
                <span className={styles['one-card']}>- I</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    if (prev['two-cards'] === 0) return { ...prev };
                    return { ...prev, 'two-cards': prev['two-cards'] - 1 };
                  });
                }}
              >
                <span className={styles['two-cards']}>- II</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    if (prev['three-cards'] === 0) return { ...prev };
                    return { ...prev, 'three-cards': prev['three-cards'] - 1 };
                  });
                }}
              >
                <span className={styles['three-cards']}>- III</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    if (prev['four-cards'] === 0) return { ...prev };
                    return { ...prev, 'four-cards': prev['four-cards'] - 1 };
                  });
                }}
              >
                <span className={styles['four-cards']}>- IV</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    if (prev['five-cards'] === 0) return { ...prev };
                    return { ...prev, 'five-cards': prev['five-cards'] - 1 };
                  });
                }}
              >
                <span className={styles['five-cards']}>- V</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    if (prev['six-cards'] === 0) return { ...prev };
                    return { ...prev, 'six-cards': prev['six-cards'] - 1 };
                  });
                }}
              >
                <span className={styles['six-cards']}>- VI</span>
              </Button>
            </div>
          </div>
          <Button
            className={styles['voucher-button']}
            onClick={() => {
              setVoucherAmount({
                'one-card': 0,
                'two-cards': 0,
                'three-cards': 0,
                'four-cards': 0,
                'five-cards': 0,
                'six-cards': 0,
                'seven-cards': 0,
                'eight-cards': 0,
                'nine-cards': 0,
                'ten-cards': 0,
                'eleven-cards': 0,
                'thirteen-cards': 0,
              });
            }}
          >
            {'Reset'}
          </Button>
          <div>
            <div>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['seven-cards']}>+ VII</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['eight-cards']}>+ VIII</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['nine-cards']}>+ IX</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    return { ...prev, 'ten-cards': prev['ten-cards'] + 1 };
                  });
                }}
              >
                <span className={styles['ten-cards']}>+ X</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['eleven-cards']}>+ XI</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['thirteen-cards']}>+ XIII</span>
              </Button>
            </div>
            <div>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['seven-cards']}>- VII</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['eight-cards']}>- VIII</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['nine-cards']}>- IX</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setVoucherAmount(prev => {
                    if (prev['ten-cards'] === 0) return { ...prev };
                    return { ...prev, 'ten-cards': prev['ten-cards'] - 1 };
                  });
                }}
              >
                <span className={styles['ten-cards']}>- X</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['eleven-cards']}>- XI</span>
              </Button>
              <Button
                className={styles['voucher-button']}
                onClick={() => {
                  setUnavailableVoucher(true);
                  return;
                }}
              >
                <span className={styles['thirteen-cards']}>- XIII</span>
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className={styles['empty-half']}></div>
    </>
  );
};
const TossVoucherPurchaseButton = ({
  voucherBox,
  deletePrePaymentByPaymentKey,
  setChargeClicked,
  setCard,
  closeChargeModal,
  openPriceInfoModal,
  totalPrice,
  setBlinkModalForChargingKRWOpen,
  setBlinkModalForChargingUSDOpen,
  ...props
}) => {
  const browserLanguage = useLanguageChange();
  const { t } = useTranslation();
  const [isButtonClicked, setButtonClicked] = useState(false);
  const purchase = (limitedAmount, currency) => {
    if (isButtonClicked) return;
    setButtonClicked(true);
    try {
      if (totalPrice < limitedAmount) {
        if (currency === 'KRW') setBlinkModalForChargingKRWOpen(true);
        if (currency === 'USD') setBlinkModalForChargingUSDOpen(true);
        return;
      } 
      const timerId = setTimeout(() => {
        setChargeClicked(true);
      }, 1000);
      return () => clearTimeout(timerId); 
    } catch (error) {
      console.error(error);
    } finally {
      setButtonClicked(false);
    }
  };
  return (
    <>
      <Button
        className={styles['purchase-button']}
        onClick={() => {
          openPriceInfoModal();
        }}
      >
        {t(`button.price-info`)}
      </Button>
      {browserLanguage === 'ko' && (
        <Button
          className={styles['purchase-button']}
          onClick={() => {
            purchase(1000, 'KRW');
          }}
        >
          {t(`button.pay`)}
        </Button>
      )}
      {browserLanguage === 'ja' && (
        <>
          <Button
            className={styles['purchase-button']}
            onClick={() => {
              purchase(1, 'USD');
            }}
          >
            {t(`button.pay`)}
          </Button>
          {}
        </>
      )}
      {browserLanguage === 'en' && (
        <>
          <Button
            className={styles['purchase-button']}
            onClick={() => {
              purchase(1, 'USD');
            }}
          >
            {t(`button.pay`)}
          </Button>
          {}
        </>
      )}
      <CancelButton
        className={styles['purchase-button']}
        onClick={(e = null) => {
          closeChargeModal();
        }}
      >
        {t(`button.close`)}
      </CancelButton>
    </>
  );
};
