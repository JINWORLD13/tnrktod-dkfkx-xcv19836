import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/scss/_PriceInfoModal.module.scss';
import useLanguageChange from '../hooks/useEffect/useLanguageChange.jsx';
import { useTranslation } from 'react-i18next';
import CancelButton from '../UI/CancelButton.jsx';
import { spreadPriceObjForVoucher } from '../data/spreadList/spreadPrice.jsx';
const PriceInfoModal = ({ ...props }) => {
  const browserLanguage = useLanguageChange();
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);
  const scrollAmount = 50;
  const handleScroll = event => {
    event.preventDefault();
    const delta = event.deltaY;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop +=
        delta > 0 ? scrollAmount : -scrollAmount;
    }
  };
  const closePriceInfoModal = () => {
    if (
      props?.updatePriceInfoModalOpen !== undefined &&
      props?.updatePriceInfoModalOpen !== null
    )
      props?.updatePriceInfoModalOpen(false);
  };
  return (
    <div>
      <div className={styles['backdrop']} onClick={props?.onConfirm} />
      <div className={styles['modal']}>
        <div
          className={`${
            browserLanguage === 'ja'
              ? styles['modal-content-japanese']
              : styles['modal-content']
          }`}
        >
          <div
            className={styles['content']}
            ref={scrollContainerRef}
            onWheel={e => {
              handleScroll(e);
            }}
          >
            {props?.voucherBox.map((elem, i) => {
              if (elem.count === 7) return;
              if (elem.count === 8) return;
              if (elem.count === 9) return;
              if (elem.count === 11) return;
              if (elem.count === 13) return;
              return (
                <>
                  {browserLanguage === 'ja' && (
                    <>
                      <div className={styles['price-list-item-japanese']}>
                        <div className={styles['voucher-title']}>
                          <div>{'カード' + elem.count + '枚券'}</div>
                          <div className={styles['sparkle']}>
                            &#9733;
                            {spreadPriceObjForVoucher[elem.count][
                              'salePercentageForUSD'
                            ] + '% Off'}
                            &#9733;
                          </div>
                        </div>
                        <div className={styles['voucher-main']}>
                          <div className={styles['voucher-logo']}>
                            <span>{elem.name}</span>
                          </div>
                          <div className={styles['voucher-price']}>
                            <span>
                              <span>
                                {
                                  spreadPriceObjForVoucher[elem.count]
                                    ?.listPriceForUSD
                                }
                              </span>
                              <span>{' USD' + ' / '}</span>
                              <span>
                                {spreadPriceObjForVoucher[elem.count]
                                  ?.originalPriceForUSD + ' USD'}
                              </span>
                            </span>{' '}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {browserLanguage === 'ko' && (
                    <>
                      <div className={styles['price-list-item']}>
                        <div className={styles['voucher-title']}>
                          <div>{'카드' + elem.count + '장권'}</div>
                          <div className={styles['sparkle']}>
                            &#9733;
                            {spreadPriceObjForVoucher[elem.count][
                              'salePercentage'
                            ] + '% Off'}
                            &#9733;
                          </div>
                        </div>
                        <div className={styles['voucher-main']}>
                          <div className={styles['voucher-logo']}>
                            <span>{elem.name}</span>
                          </div>
                          <div className={styles['voucher-price']}>
                            <span>
                              <span>
                                {
                                  spreadPriceObjForVoucher[elem.count]
                                    ?.listPrice
                                }
                              </span>
                              <span>{' 원' + ' / '}</span>
                              <span>
                                {spreadPriceObjForVoucher[elem.count]
                                  ?.originalPrice + ' 원'}
                              </span>
                            </span>{' '}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {browserLanguage === 'en' && (
                    <>
                      <div className={styles['price-list-item']}>
                        <div className={styles['voucher-title']}>
                          {i === 0 ? (
                            <div>
                              {elem.count + ' ' + 'Card' + ' ' + 'Voucher'}
                            </div>
                          ) : (
                            <div>
                              {elem.count + ' ' + 'Cards' + ' ' + 'Voucher'}
                            </div>
                          )}
                          <div className={styles['sparkle']}>
                            &#9733;
                            {spreadPriceObjForVoucher[elem.count][
                              'salePercentageForUSD'
                            ] + '% Off'}
                            &#9733;
                          </div>
                        </div>
                        <div className={styles['voucher-main']}>
                          <div className={styles['voucher-logo']}>
                            <span>{elem.name}</span>
                          </div>
                          <div className={styles['voucher-price']}>
                            <span>
                              <span>
                                {
                                  spreadPriceObjForVoucher[elem.count]
                                    ?.listPriceForUSD
                                }
                              </span>
                              <span>{' USD' + ' / '}</span>
                              <span>
                                {spreadPriceObjForVoucher[elem.count]
                                  ?.originalPriceForUSD + ' USD'}
                              </span>
                            </span>{' '}
                          </div>
                        </div>
                      </div>
                      {}
                    </>
                  )}
                </>
              );
            })}
          </div>
          <footer className={styles['button-box']}>
            <CancelButton
              className={styles['button']}
              onClick={(e=null) => {
                closePriceInfoModal();
              }}
            >
              {t(`button.close`)}
            </CancelButton>
          </footer>
        </div>
        {}
      </div>
    </div>
  );
};
export default PriceInfoModal;
