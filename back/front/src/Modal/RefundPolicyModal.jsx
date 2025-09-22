import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/scss/_RefundPolicyModal.module.scss';
import useLanguageChange from '../hooks/useEffect/useLanguageChange.jsx';
import { useTranslation } from 'react-i18next';
import CancelButton from '../UI/CancelButton.jsx';
import { renderAnswerAsLines } from '../function/renderAnswerAsLines.jsx';
const RefundPolicyModal = ({ ...props }) => {
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
  const closeRefundPolicyModal = () => {
    if (
      props?.updateRefundPolicyOpen !== undefined &&
      props?.updateRefundPolicyOpen !== null
    )
      props?.updateRefundPolicyOpen(false);
  };
  const manualForKorean = `*\n
    1. 환불 가능 상황\n
    - 이용권 구매 후 청약철회 기간(1년) 이내에만 환불 요청이 가능합니다. 단, 예외적으로 (퀵)계좌이체로 구매한 이용권은 구매일로부터 180일 이내, 휴대폰 결제의 경우 구매한 당월까지만 환불이 가능합니다.\n
    - 구매 시 결제 금액을 기준으로 총 환불 요청 금액이 5,000원 이상인 경우에만 환불이 가능합니다.\n
    - 구글 플레이 스토어에서 다운로드한 앱으로 이용권을 구매한 경우(인앱 결제 이용), 예외적으로 구글 플레이 스토어의 환불 정책을 따릅니다.\n*
    2. 환불 범위 및 수수료\n
      - 미사용 이용권 : 구매 당시 결제 금액의 70%를 환불합니다 (수수료 30% 차감).\n
      - 환불 금액은 10원 단위 이상부터 지급합니다.\n*
    3. 환불 신청 방법\n
      - '마이페이지 > 회원정보 > 환불'에서 직접 환불 신청이 가능합니다.\n*
    4. 처리기한\n
      - 환불 신청 접수 후 기본적으로 영업일 기준 3일 이내에 처리되나, 특별한 사유로 인해 추가 시간이 소요될 수 있습니다.\n*
    5. 기타 사항\n
      - 본 약관은 운영 정책에 따라 사전 고지 없이 변경될 수 있습니다.\n
      - 부정 행위 적발 시 적절한 법적 조치를 받을 수 있습니다.\n`;
  const manualForJapanese = `*\n
    1. 払い戻し可能な状況\n
      - 購入後のクーリングオフ期間(180日)内でのみ、払い戻しを請求することができます。\n
      - 購入時の支払い金額を基準として、払い戻し請求の総額が3米ドル以上でなければなりません。\n
      - Google Playストアからダウンロードしたアプリでバウチャーを購入した場合、例外的にGoogle Playストアの払い戻しポリシーに従います。\n*
    2. 払い戻しの範囲および手数料\n
      - 未使用のバウチャー：購入時の支払い金額の70%を払い戻します（手数料30%差し引き）。\n
      - 払い戻し金額はUSDの場合、小数点以下第二位まで可能です。\n*
    3. 払い戻し申請方法\n
      - 'マイページ > 会員情報 > 払い戻し'から直接払い戻しを申請することができます。\n*
    4. 処理期限\n
      - 払い戻し申請受付後、原則として営業日基準3日以内に処理されますが、特別な事由により追加の時間がかかる場合があります。\n*
    5. その他\n
      - 本規約は運営方針により事前通知なしに変更される場合があります。\n
      - 不正行為が発覚した場合、適切な法的措置を受ける可能性があります。\n`;
  const manualForEnglish = `*\n
    1. Refund Eligibility\n
      - Refunds can only be requested within the cooling-off period (180 days) after purchase.\n
      - The total refund request amount must be at least 3 USD based on the payment amount at the time of purchase.\n
      - For vouchers purchased through apps downloaded from the Google Play Store (using in-app purchases), refunds will be processed according to the Google Play Store's refund policy as an exception.\n*
    2. Refund Scope and Fees\n
      - Unused vouchers: 70% of the purchase amount will be refunded (30% fee deducted).\n
      - For USD, refund amounts are calculated to the second decimal place (cents).\n*
    3. Refund Request Method\n
      - You can directly request a refund from 'My Page > User Information > Refund'.\n*
    4. Processing Time\n
      - Refund requests are typically processed within 3 business days of receipt, but additional time may be required due to special circumstances.\n*
    5. Other Matters\n
      - These terms and conditions may be changed without prior notice according to operational policies.\n
      - Appropriate legal action may be taken if fraudulent activities are detected.\n
  `;
  let manual;
  switch (browserLanguage) {
    case 'ko':
      manual = manualForKorean;
      break;
    case 'en':
      manual = manualForEnglish;
      break;
    case 'ja':
      manual = manualForJapanese;
      break;
  }
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
            <h3>{t(`refund_policy_modal.refund_policy-title`)}</h3>
            {renderAnswerAsLines(manual)}
          </div>
          <footer className={styles['button-box']}>
            <CancelButton
              className={styles['button']}
              onClick={(e=null) => {
                closeRefundPolicyModal();
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
export default RefundPolicyModal;
