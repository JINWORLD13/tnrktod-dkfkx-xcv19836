import React, { useState, useEffect } from 'react';
import styles from '../../styles/scss/_RefundVoucherMenuForm.module.scss';
import { hasAccessToken } from '../../utils/tokenCookie.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
const RefundVoucherMenuForm = ({
  isClickedForFoldingMenu,
  isClickedForVoucherMenu,
  setClickedForVoucherMenu,
  ...props
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  const handleClickForVoucherMenu = voucher => {
    setClickedForVoucherMenu(voucher);
  };
  return (
    <>
      {isClickedForFoldingMenu === false && (
        <>
          {browserLanguage !== 'ja' && (
            <div className={styles['menu']}>
              <li>
                <ul>
                  <div
                    className={
                      isClickedForVoucherMenu === 1
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(1);
                    }}
                  >
                    <p>I</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 2
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(2);
                    }}
                  >
                    <p>II</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 3
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(3);
                    }}
                  >
                    <p>III</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 4
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(4);
                    }}
                  >
                    <p>IV</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 5
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(5);
                    }}
                  >
                    <p>V</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 6
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(6);
                    }}
                  >
                    <p>VI</p>
                  </div>
                </ul>
                <ul>
                  <div
                    className={
                      isClickedForVoucherMenu === 7
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(7);
                    }}
                  >
                    <p>VII</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 8
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(8);
                    }}
                  >
                    <p>VIII</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 9
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(9);
                    }}
                  >
                    <p>IX</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 10
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(10);
                    }}
                  >
                    <p>X</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 11
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(11);
                    }}
                  >
                    <p>XI</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 13
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(13);
                    }}
                  >
                    <p>XIII</p>
                  </div>
                </ul>
              </li>
            </div>
          )}
          {browserLanguage === 'ja' && (
            <div className={styles['menu-japanese']}>
              <li>
                <ul>
                  <div
                    className={
                      isClickedForVoucherMenu === 1
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(1);
                    }}
                  >
                    <p>I</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 2
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(2);
                    }}
                  >
                    <p>II</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 3
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(3);
                    }}
                  >
                    <p>III</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 4
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(4);
                    }}
                  >
                    <p>IV</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 5
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(5);
                    }}
                  >
                    <p>V</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 6
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(6);
                    }}
                  >
                    <p>VI</p>
                  </div>
                </ul>
                <ul>
                  <div
                    className={
                      isClickedForVoucherMenu === 7
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(7);
                    }}
                  >
                    <p>VII</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 8
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(8);
                    }}
                  >
                    <p>VIII</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 9
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(9);
                    }}
                  >
                    <p>IX</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 10
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(10);
                    }}
                  >
                    <p>X</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 11
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(11);
                    }}
                  >
                    <p>XI</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 13
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(13);
                    }}
                  >
                    <p>XIII</p>
                  </div>
                </ul>
              </li>
            </div>
          )}
        </>
      )}
      {isClickedForFoldingMenu === true && (
        <>
          {browserLanguage !== 'ja' && (
            <div className={styles['menu-folded']}>
              <li>
                <ul>
                  <div
                    className={
                      isClickedForVoucherMenu === 1
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(1);
                    }}
                  >
                    <p>I</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 2
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(2);
                    }}
                  >
                    <p>II</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 3
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(3);
                    }}
                  >
                    <p>III</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 4
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(4);
                    }}
                  >
                    <p>IV</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 5
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(5);
                    }}
                  >
                    <p>V</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 6
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(6);
                    }}
                  >
                    <p>VI</p>
                  </div>
                </ul>
                <ul>
                  <div
                    className={
                      isClickedForVoucherMenu === 7
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(7);
                    }}
                  >
                    <p>VII</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 8
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(8);
                    }}
                  >
                    <p>VIII</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 9
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(9);
                    }}
                  >
                    <p>IX</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 10
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(10);
                    }}
                  >
                    <p>X</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 11
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(11);
                    }}
                  >
                    <p>XI</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 13
                        ? `${styles['menu-item-clicked']}`
                        : `${styles['menu-item']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(13);
                    }}
                  >
                    <p>XIII</p>
                  </div>
                </ul>
              </li>
            </div>
          )}
          {browserLanguage === 'ja' && (
            <div className={styles['menu-folded-japanese']}>
              <li>
                <ul>
                  <div
                    className={
                      isClickedForVoucherMenu === 1
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(1);
                    }}
                  >
                    <p>I</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 2
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(2);
                    }}
                  >
                    <p>II</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 3
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(3);
                    }}
                  >
                    <p>III</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 4
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(4);
                    }}
                  >
                    <p>IV</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 5
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(5);
                    }}
                  >
                    <p>V</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 6
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(6);
                    }}
                  >
                    <p>VI</p>
                  </div>
                </ul>
                <ul>
                  <div
                    className={
                      isClickedForVoucherMenu === 7
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(7);
                    }}
                  >
                    <p>VII</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 8
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(8);
                    }}
                  >
                    <p>VIII</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 9
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(9);
                    }}
                  >
                    <p>IX</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 10
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(10);
                    }}
                  >
                    <p>X</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 11
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(11);
                    }}
                  >
                    <p>XI</p>
                  </div>
                  <div
                    className={
                      isClickedForVoucherMenu === 13
                        ? `${styles['menu-item-japanese-clicked']}`
                        : `${styles['menu-item-japanese']}`
                    }
                    onClick={e => {
                      e.stopPropagation();
                      handleClickForVoucherMenu(13);
                    }}
                  >
                    <p>XIII</p>
                  </div>
                </ul>
              </li>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default RefundVoucherMenuForm;
