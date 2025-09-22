import React, { useState, useEffect, memo } from 'react';
import styles from '../../styles/scss/_BusinessInfoForm.module.scss';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
const BusinessInfoForm = memo(({ ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const browserLanguage = useLanguageChange();
  return (
    <div
      className={`${
        browserLanguage === 'ja'
          ? styles['business-info-container-japanese']
          : styles['business-info-container']
      }`}
    >
      <div
        className={`${
          browserLanguage === 'ja'
            ? styles['business-info1-japanese']
            : styles['business-info1']
        }`}
      >
        <div>
          {browserLanguage === 'ko' ? (
            <>
              <div>상호명 : 진월드</div>
              {!isNative && ( 
                <>
                  <div>대표자 : {import.meta.env.VITE_REPRESENTATIVE}</div>
                  <div>사업자 등록번호 : {import.meta.env.VITE_BIZ_REG_NO}</div>
                  <div>
                    통신판매업신고번호 : {import.meta.env.VITE_MAIL_ORDER_NO}
                  </div>
                  <div>사업장 주소 : {import.meta.env.VITE_ADDRESS}</div>
                  <div>전화번호 : {import.meta.env.VITE_PHONE}</div>
                </>
              )}
              <div>이메일 : cosmostarotinfo@gmail.com</div>
              <div>웹사이트: https:
              <div>
                구글플레이스토어(안드로이드):{' '}
                <a
                  href="https:
                  style={{
                    color: isHovered ? 'gold' : 'black',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  다운로드
                </a>
              </div>
            </>
          ) : (
            ''
          )}
          {browserLanguage === 'ja' ? (
            <>
              <div className={styles['business-details-japanese']}>
                会社名: JINWORLD
              </div>
              {!isNative && (
                <>
                  <div className={styles['business-details-japanese']}>
                    代表者: {import.meta.env.VITE_REPRESENTATIVE}
                  </div>
                  <div className={styles['business-details-japanese']}>
                    事業者登録番号: {import.meta.env.VITE_BIZ_REG_NO}
                  </div>
                  <div className={styles['business-details-japanese']}>
                    通信販売業登録番号: {import.meta.env.VITE_MAIL_ORDER_NO}
                  </div>
                  <div className={styles['business-details-japanese']}>
                    事業所住所: {import.meta.env.VITE_ADDRESS}
                  </div>
                  <div className={styles['business-details-japanese']}>
                    電話番号: {import.meta.env.VITE_PHONE}
                  </div>
                </>
              )}
              <div className={styles['business-details-japanese']}>
                電子メール : cosmostarotinfo@gmail.com
              </div>
              <div className={styles['business-details-japanese']}>
                ウェブサイト : https:
              </div>
              <div className={styles['business-details-japanese']}>
                Google Play Store(Android):{' '}
                <a
                  href="https:
                  style={{
                    color: isHovered ? 'gold' : 'black',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  ダウンロード
                </a>
              </div>
            </>
          ) : (
            ''
          )}
          {browserLanguage === 'en' ? (
            <>
              <div>Company Name: JINWORLD</div>
              {!isNative && (
                <>
                  <div>
                    Representative: {import.meta.env.VITE_REPRESENTATIVE}
                  </div>
                  <div>
                    Business Registration Number:{' '}
                    {import.meta.env.VITE_BIZ_REG_NO}
                  </div>
                  <div>
                    Online Sales Business Registration Number:{' '}
                    {import.meta.env.VITE_MAIL_ORDER_NO}
                  </div>
                  <div>Business Address: {import.meta.env.VITE_ADDRESS}</div>
                  <div>Phone Number: {import.meta.env.VITE_PHONE}</div>
                </>
              )}
              <div>Contact : cosmostarotinfo@gmail.com</div>
              <div>Web Site: https:
              <div>
                Google Play Store(Android):{' '}
                <a
                  href="https:
                  style={{
                    color: isHovered ? 'gold' : 'black',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Download
                </a>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
});
export default BusinessInfoForm;
