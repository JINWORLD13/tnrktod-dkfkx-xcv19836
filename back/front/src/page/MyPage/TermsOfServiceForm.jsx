import React, { useState, useEffect, memo } from 'react';
import styles from '../../styles/scss/_TermsOfServiceForm.module.scss';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { Capacitor } from '@capacitor/core';
import { useTranslation } from 'react-i18next';
const isNative = Capacitor.isNativePlatform();
const TermsOfServiceForm = memo(({ ...props }) => {
  const browserLanguage = useLanguageChange();
  const { t } = useTranslation();
  return (
    <div
      className={`${
        browserLanguage === 'ja'
          ? styles['terms-of-service-container-japanese']
          : styles['terms-of-service-container']
      }`}
    >
      <div
        className={`${
          browserLanguage === 'ja'
            ? styles['terms-of-service1-japanese']
            : styles['terms-of-service1']
        }`}
      >
        <div>
          {browserLanguage === 'ko' ? (
            <>
              <div>제1조 (목적)</div>{' '}
              <div>
                이 약관은 진월드(이하 "회사")가 제공하는 타로 서비스(이하
                "서비스")의 이용조건 및 절차에 관한 사항을 규정함을 목적으로
                합니다.
              </div>{' '}
              {'*'}
              <div>제2조 (용어의 정의)</div>{' '}
              <div>
                1. "서비스"란 회사가 운영하는 타로카드 예측 서비스를 의미합니다.
              </div>{' '}
              <div>
                2. "이용자"란 본 약관에 동의하고 서비스를 이용하는 개인 또는
                법인을 말합니다.
              </div>{' '}
              {'*'}
              <div>제3조 (서비스 이용계약의 체결)</div>{' '}
              <div>1. 이용계약은 이용자가 회원가입을 신청하면 체결됩니다.</div>{' '}
              {'*'}
              <div>제4조 (서비스 이용 요금)</div>{' '}
              <div>
                1. 서비스 이용에 대해서는 회사가 정한 컨텐츠 이용권에 대한
                요금을 납부하거나 광고 시청을 하여야 합니다.
              </div>{' '}
              <div>
                2. 요금의 구체적인 금액 및 납부방법은 서비스 내 안내를 통해
                공지합니다.
              </div>{' '}
              {'*'}
              <div>제5조 (서비스 이용 및 정보제공)</div>{' '}
              <div>1. 수집하는 정보의 범위</div>{' '}
              <div>
                회사는 서비스 제공을 위해 이용자에게 다음 각 호의 정보를 요구할
                수 있습니다:
              </div>{' '}
              <div>&nbsp;가. 이름, 이메일 등 기본 인적사항</div>{' '}
              <div>&nbsp;나. 서비스 이용 과정에서 생성되는 정보</div>{' '}
              <div>&nbsp;다. 모바일 앱 사용 시 기기 정보</div>{' '}
              <div>2. 정보 제공 의무</div>{' '}
              <div>
                이용자는 모든 정보를 진실하게 제공하여야 합니다. 허위 정보
                제공으로 인한 불이익은 이용자 본인이 부담합니다.
              </div>{' '}
              <div>3. 정보 수집 방법</div>{' '}
              <div>회사는 다음과 같은 방법으로 정보를 수집합니다:</div>{' '}
              <div>&nbsp;가. 회원가입 시 웹 폼을 통한 직접 수집</div>{' '}
              <div>
                &nbsp;나. 서비스 이용 과정에서 자동으로 생성되는 정보 수집
              </div>{' '}
              <div>&nbsp;다. 모바일 앱 사용 시 기기 정보 자동 수집</div>{' '}
              <div>4. 백그라운드 데이터 수집</div>{' '}
              <div>
                회사는 서비스 개선을 위해 백그라운드에서 다음의 데이터를 수집할
                수 있습니다:
              </div>{' '}
              <div>&nbsp;가. 앱 사용 통계</div> <div>&nbsp;나. 오류 보고서</div>{' '}
              <div>&nbsp;다. 기기 성능 데이터</div> <div>5. 정보의 보관</div>{' '}
              <div>회사는 수집한 정보를 다음과 같은 기간 동안 보관합니다:</div>{' '}
              <div>
                &nbsp;가. 회원 정보 (이름, 연락처, 이메일 등): 회원 탈퇴 시까지
              </div>{' '}
              <div>
                &nbsp;나. 콘텐츠 정보: 이용자 삭제 시 즉시 파기 또는 이용
                시점으로부터 3개월 후 자동 파기
              </div>{' '}
              <div>
                &nbsp;다. 컨텐츠 이용권: 구매일로부터 최대 1년간 보관 후 소멸
              </div>{' '}
              <div>6. 정보의 파기</div>{' '}
              <div>
                보존 기간이 경과한 정보는 다음과 같은 방법으로 파기됩니다:
              </div>{' '}
              <div>
                &nbsp;가. 전자적 파일: 복구 및 재생이 불가능한 방법으로 안전하게
                삭제
              </div>{' '}
              <div>&nbsp;나. 기록물, 인쇄물, 서면: 분쇄하거나 소각</div>{' '}
              <div>7. 제3자 제공 정보</div>{' '}
              <div>회사가 사용하는 제3자 SDK의 정보 처리:</div>{' '}
              <div>&nbsp;가. Google AdMob / Google AdSense</div>{' '}
              <div>
                &nbsp;&nbsp;- 수집정보: 광고 식별자, 기기 정보, 사용 통계
              </div>{' '}
              <div>
                &nbsp;&nbsp;- 이용목적: 맞춤형 광고 제공, 광고 성과 측정
              </div>{' '}
              <div>
                &nbsp;&nbsp;- 보관기간: 광고 식별자 재설정 또는 비활성화 시까지
              </div>{' '}
              <div>8. 정보 수집 안내</div>{' '}
              <div>회사는 정보 수집에 대해 다음과 같이 안내합니다:</div>{' '}
              <div>&nbsp;가. 앱 최초 실행 시 데이터 수집 안내 표시</div>{' '}
              <div>
                &nbsp;나. 새로운 유형의 데이터 수집 시 별도 팝업 알림 제공
              </div>{' '}
              <div>9. 제3자 SDK 처리방침</div>{' '}
              <div>
                각 SDK의 데이터 수집 및 처리는 해당 서비스의 개인정보처리방침을
                따릅니다.
              </div>{' '}
              {'*'}
              <div>제6조 (개인정보 보호)</div> <div>1. 기본 원칙</div>{' '}
              <div>
                &nbsp;가. 회사는 관련 법령에 따라 이용자의 개인정보를 안전하게
                보호합니다.
              </div>{' '}
              <div>
                &nbsp;나. 회사는 개인정보 수집 시 수집목적, 항목, 보유기간 등을
                고지하고 동의를 받습니다.
              </div>{' '}
              <div>
                다. 이용자는 개인정보 열람, 정정, 삭제를 요청할 수 있습니다.
              </div>{' '}
              <div>2. 이용자의 권리</div>{' '}
              <div>이용자는 다음과 같은 권리를 가집니다:</div>{' '}
              <div>&nbsp;가. 개인정보 접근권</div>{' '}
              <div>&nbsp;나. 개인정보 정정 및 삭제 요청권</div>{' '}
              <div>&nbsp;다. 개인정보 처리 제한 요청권</div>{' '}
              <div>&nbsp;라. 개인정보 이동권</div>{' '}
              <div>
                &nbsp;마. 특정 목적의 개인정보 처리 중단 요청권 (예: 마케팅
                목적의 개인정보 사용 거부)
              </div>{' '}
              <div>3. 국제법 준수</div>{' '}
              <div>
                &nbsp;가. 회사는 유럽 일반 개인정보보호법(GDPR) 및 캘리포니아
                소비자 개인정보보호법(CCPA)을 포함한 국내외 개인정보보호 법령을
                준수합니다.
              </div>{' '}
              <div>
                &nbsp;나. EU 거주자와 캘리포니아 주민은 해당 법령에 따른
                추가적인 권리를 가집니다.
              </div>{' '}
              <div>4. 개인정보의 파기</div>{' '}
              <div>
                &nbsp;가. 보존 기간이 경과한 개인정보는 지체 없이 파기됩니다.
              </div>{' '}
              <div>&nbsp;나. 파기 방법:</div>{' '}
              <div>
                &nbsp;&nbsp;- 전자적 파일: 복구 및 재생이 불가능한 방법으로
                안전하게 삭제
              </div>{' '}
              <div>&nbsp;&nbsp;- 기록물, 인쇄물, 문서: 파쇄 또는 소각</div>{' '}
              {'*'}
              <div>제7조 (서비스 이용 시 준수사항)</div>{' '}
              <div>
                1. 이용자는 서비스 이용 시 관련 법령과 본 약관을 준수하여야
                합니다.
              </div>{' '}
              <div>2. 이용자는 다음 각 호의 행위를 해서는 안 됩니다.</div>{' '}
              <div>&nbsp;가. 타인의 개인정보, 사생활 침해 행위</div>{' '}
              <div>&nbsp;나. 서비스 운영을 방해하는 행위</div>{' '}
              <div>&nbsp;다. 기타 법령에 위반되는 행위</div> {'*'}
              <div>제8조 (지식재산권)</div>{' '}
              <div>
                1. 서비스에 대한 저작권 및 지식재산권은 회사에 귀속됩니다.
              </div>{' '}
              <div>
                2. 이용자는 회사의 사전 서면 승낙 없이 타로 해석 결과를 제외하고
                서비스를 복제, 전송, 수정할 수 없습니다.
              </div>{' '}
              {'*'}
              <div>제9조 (구매 및 환불)</div>{' '}
              <div>
                1. 이용자는 서비스 내에서 유료 상품을 구매할 수 있습니다.
              </div>{' '}
              <div>2. 이용권 환불은 다음과 같은 조건에 따라 처리됩니다.</div>{' '}
              <div>
                &nbsp;가. 구매 시 결제한 금액의 70%가 부분 환불 처리됩니다.
              </div>{' '}
              <div>&nbsp;나. 환불금액은 십원단위 이상부터 지급됩니다.</div>{' '}
              <div>
                &nbsp;다. 환불을 요청할 경우, 구매 시 결제 금액을 기준으로 총
                환불 요청 금액이 5,000원 이상이어야 합니다.
              </div>{' '}
              <div>
                &nbsp;라. 구매 후 청약철회 기간(1년) 이내에서만 환불 요청이
                가능합니다. 단, 예외적으로 (퀵)계좌이체로 구매한 이용권은
                구매일로부터 180일 이내, 휴대폰 결제의 경우 구매한 당월까지만
                환불이 가능합니다.
              </div>{' '}
              <div>
                &nbsp;마. 구글 플레이 스토어에서 다운로드한 앱으로 이용권을
                구매한 경우(인앱 결제 이용), 예외적으로 구글 플레이 스토어의
                환불 정책을 따릅니다.
              </div>{' '}
              <div>
                {
                  "3. 구체적인 환불절차와 기준은 회사 운영정책(환불정책)에 따르니 '마이페이지 > 회원정보 > 이용권구매 > 환불정책'에 이동하시어 환불정책 참조바랍니다."
                }
              </div>{' '}
              <div>
                4. 구매 및 환불 과정에서 부정행위가 발견될 경우, 회사는 해당
                이용자에게 금전적 배상을 요구할 수 있으며, 2회의 서면 경고를
                제공할 수 있습니다. 경고 후에도 부정행위가 지속되는 경우, 회사는
                해당 이용자의 서비스 이용을 제한하거나 계정을 정지할 수
                있습니다. 또한, 회사는 부정행위로 인한 손해에 대해 추가적인
                금전적 배상을 청구하거나 법적 조치를 취할 권리를 보유합니다.
              </div>{' '}
              <div>
                5. 참고로, 이용권 사용 시 웹사이트에서 구매한 이용권을 먼저
                사용하고, 그 다음 구글 플레이 스토어 앱에서 구매한 이용권을
                사용하게 됩니다.
              </div>{' '}
              {'*'}
              <div>제10조 (서비스 중단 및 변경)</div>{' '}
              <div>
                1. 회사는 서비스 개선 등 필요한 경우 서비스를 중단하거나 변경할
                수 있습니다.
              </div>{' '}
              <div>
                2. 회사는 사전에 이를 이용자에게 공지하되, 부득이한 경우 사후에
                공지할 수 있습니다.
              </div>{' '}
              {'*'}
              <div>제11조 (손해배상 및 면책사항)</div>{' '}
              <div>
                1. 회사는 서비스 및 컨텐츠 이용과 관련하여 이용자에게 발생한
                모든 손해에 대해 책임을 부담하지 않습니다. 다만, 환불 관련
                사항은 이용약관 제9조에 따라 처리합니다.
              </div>{' '}
              <div>
                2. 이용자가 이 약관의 규정을 위반함으로 인해 회사에 손해가
                발생하게 되는 경우, 이용자는 회사에 대해 그 손해를 배상하여야
                합니다.
              </div>{' '}
              <div>
                3. 천재지변, 전쟁, 테러 등 불가항력적인 사유로 서비스 제공이
                불가능한 경우 회사는 책임을 지지 않습니다.
              </div>{' '}
              {'*'}
              <div>제12조 (분쟁해결)</div>{' '}
              <div>
                1. 이 약관의 해석 및 적용에 관한 분쟁이 발생할 경우 회사와
                이용자는 상호 협의로 해결하되, 이에 이르지 못할 경우 관련 법령
                및 상관례에 따릅니다.
              </div>{' '}
              <div>
                2. 회사와 이용자 사이에 제기된 모든 소송은 회사 본사 소재지 관할
                법원을 관할 법원으로 합니다.
              </div>{' '}
              {'*'}
              <div>제13조 (약관 변경)</div>{' '}
              <div>1. 회사는 필요한 경우 이 약관을 변경할 수 있습니다.</div>{' '}
              <div>
                2. 약관이 변경되는 경우 회사는 적용일자 및 변경사유를 명시하여
                그 변경 내용을 공지합니다.
              </div>{' '}
              <div>
                3. 변경된 약관에 동의하지 않는 이용자는 서비스 이용을 중단하고
                탈퇴할 수 있습니다.
              </div>{' '}
              <div>
                4. 회사는 (이용)약관이 변경될 경우, 변경 내용을 웹사이트
                공지사항, 개별 이메일, 또는 앱 스토어의 출시 노트를 통해
                사용자에게 알립니다. 앱의 주요 기능 변경이나 중요한 업데이트
                사항도 같은 방식으로 공지될 수 있습니다.
              </div>{' '}
              {'*'}
              <div>제14조 (광고 서비스)</div>{' '}
              <div>
                1. 회사는 Google AdMob / Google AdSense를 사용하여 광고를 제공할
                수 있습니다.
              </div>{' '}
              <div>
                2. 광고 목적으로 수집되는 정보에는 기기 정보(모델명, OS 버전
                등), 위치 정보, 앱 사용 패턴, 광고 상호작용 데이터 등이 포함될
                수 있습니다.
              </div>{' '}
              <div>
                3. 이용자는 기기 설정을 통해 맞춤형 광고를 거부할 수 있습니다.
              </div>{' '}
              <div>&nbsp;{`가. Android: 설정 > Google > 광고`}</div>{' '}
              <div>&nbsp;{`나. iOS: 설정 > 개인정보 보호 > 추적`}</div>
              <div>
                4. 광고 식별자는 사용자가 재설정하거나 맞춤형 광고를 비활성화할
                때까지 보관됩니다.
              </div>{' '}
              {'*'}
              <div>제14조의1 (광고 콘텐츠)</div>{' '}
              <div>
                1. 광고 콘텐츠는 Google AdMob / Google AdSense의 정책을 따르며,
                회사는 개별 광고 내용을 직접 통제할 수 없습니다.
              </div>{' '}
              <div>
                2. 부적절한 광고 발견 시 Google AdMob / Google AdSense을 통해
                신고할 수 있습니다.
              </div>{' '}
              <div>
                3. 보상형 광고 시청은 선택적이며, 시청 완료 시 명시된 보상이
                즉시 지급됩니다.
              </div>{' '}
              {'*'}
              <div>제15조 (사용자 식별 수단)</div>{' '}
              {isNative ? (
                <>
                  <div>
                    1. 회사는 모바일 앱에서 광고 제공 및 사용자 식별을 위해 광고
                    식별자를 사용합니다.
                  </div>{' '}
                  <div>
                    2. 이용자는 기기 설정을 통해 광고 식별자 사용을 제한할 수
                    있습니다.
                  </div>{' '}
                </>
              ) : (
                <>
                  <div>
                    1. 회사는 서비스 제공 및 광고 목적으로 쿠키를 사용할 수
                    있습니다.
                  </div>{' '}
                  <div>
                    2. 이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수
                    있습니다.
                  </div>{' '}
                </>
              )}
              {'*'}
              <div>제16조 (제3자 정보 공유)</div>{' '}
              <div>
                1. 회사는 Google Admob / Google AdSense와 이용자 정보를 공유할
                수 있습니다.
              </div>{' '}
              <div>&nbsp;가. 기기 정보</div>{' '}
              <div>&nbsp;나. 대략적 위치 정보</div>{' '}
              <div>&nbsp;다. 광고 식별자(AAID/IDFA)</div>{' '}
              <div>
                2. 공유되는 정보는 광고 ID, 기기 정보 등이며, 광고 제공 목적으로
                사용됩니다.
              </div>{' '}
              <div>&nbsp;가. 맞춤형 광고 제공</div>{' '}
              <div> &nbsp;나. 광고 성과 측정</div>{' '}
              <div>&nbsp;다. 부정 광고 방지</div> {'*'}
              <div>제17조 (국제 데이터 전송)</div>{' '}
              <div>
                1. 이용자의 개인정보는 국외에 위치한 서버에 저장되거나 국외
                업체에 전송될 수 있습니다.
              </div>{' '}
              <div>
                2. 회사는 국제 전송 시 개인정보 보호를 위한 적절한 조치를
                취합니다.
              </div>{' '}
              <div>
                3. EU 지역 거주자의 개인정보 국외 이전 시에는 GDPR이 규정하는
                표준계약조항(Standard Contractual Clauses) 등 적절한 안전조치를
                적용합니다.
              </div>{' '}
              <div>
                4. 캘리포니아 주민의 개인정보는 CCPA의 규정에 따라 처리되며,
                관련 권리 행사 방법은 개인정보처리방침에서 확인할 수 있습니다.
              </div>{' '}
              {'*'}
              <div>제18조 (아동의 개인정보 보호)</div>{' '}
              <div>1. 본 서비스는 3세 이상 사용자가 이용할 수 있습니다.</div>{' '}
              <div>2. 아동 보호를 위해 다음 사항을 준수합니다:</div>{' '}
              <div>
                &nbsp;가. 유해하거나 부적절한 콘텐츠를 제공하지 않습니다.
              </div>{' '}
              <div>&nbsp;나. 필수적인 최소한의 정보만을 수집합니다.</div>{' '}
              <div>&nbsp;다. 안전한 서비스 이용 환경을 제공합니다.</div>{' '}
              <div>3. 보호자 관리:</div>{' '}
              <div>
                &nbsp;가. 만 13세 미만 아동의 경우 보호자의 관리감독이
                권장됩니다.
              </div>{' '}
              <div>
                &nbsp;나. 보호자는 언제든지 자녀의 이용 내역 확인 및 관리가
                가능합니다.
              </div>{' '}
              {'*'}
              <div>제19조 (개인정보 보호책임자)</div>{' '}
              <div>1. 개인정보 보호책임자: 김진영</div>{' '}
              <div>2. 연락처: cosmostarotinfo@gmail.com</div> {'*'}
              <div>제20조 (보안 조치)</div>{' '}
              <div>
                <div>
                  1. 회사는 이용자의 개인정보 보호를 위해 다음과 같은 보안
                  조치를 취하고 있습니다:
                </div>{' '}
                <div>&nbsp;가. 개인정보의 암호화</div>{' '}
                <div>&nbsp;나. 해킹 등에 대비한 기술적 대책</div>{' '}
                <div>&nbsp;다. 개인정보에 대한 접근 제한</div>{' '}
              </div>{' '}
              {'*'}
              <div>부칙</div>{' '}
              <div>이 약관은 2024년 9월 14일부터 시행됩니다.</div>
            </>
          ) : (
            ''
          )}
          {browserLanguage === 'ja' ? (
            <>
              <div className={styles['terms-of-service-details-japanese']}>
                第1条（目的）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                本規約は、ジンワールド（以下「当社」という。）が提供するタロットサービス（以下「本サービス」という。）の利用条件及び手続きに関する事項を定めることを目的とします。
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第2条（用語の定義）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1.「本サービス」とは、当社が運営するタロットカード予測サービスをいいます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2.「利用者」とは、本規約に同意し、本サービスを利用する個人又は法人をいいます。
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第3条（サービス利用契約の締結）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1.
                利用契約は、利用者が会員登録を申請した時点で成立するものとします。
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第4条（サービス利用料金）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1.
                本サービスの利用にあたっては、当社が定めたコンテンツ利用券に対する料金を支払うか、広告を視聴しなければなりません。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2.
                料金の具体的な金額及び支払方法は、本サービス内の案内を通じて告知します。
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第5条（サービス利用及び情報提供）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1. 収集する情報の範囲
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                当社は、サービス提供のため、利用者に次の各号の情報を要求することができます:
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ア．氏名、メールアドレスなどの基本的な個人情報
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;イ．サービス利用過程で生成される情報
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ウ．モバイルアプリ使用時の端末情報
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2. 情報提供の義務
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                利用者は、すべての情報を真実に基づいて提供しなければなりません。虚偽の情報提供による不利益は、利用者本人が負担するものとします。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                3. 情報収集の方法
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                当社は、次の方法で情報を収集します：
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ア．会員登録時のウェブフォームを通じた直接収集
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;イ．サービス利用過程で自動的に生成される情報の収集
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ウ．モバイルアプリ使用時の端末情報の自動収集
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                4. バックグラウンドデータの収集
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                当社は、サービス改善のため、バックグラウンドで次のデータを収集することがあります：
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ア．アプリ使用統計
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;イ．エラー報告
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ウ．端末性能データ
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                5. 情報の保管
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                当社は、収集した情報を次の期間保管します：
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ア．会員情報（氏名、連絡先、メールアドレスなど）：会員退会まで
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;イ．コンテンツ情報：利用者が削除した時点で即時破棄、または利用時点から3ヶ月後に自動破棄
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ウ．コンテンツ利用券：購入日から最大1年間保管後、消滅
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                6. 情報の破棄
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                保存期間が経過した情報は、次の方法で破棄されます：
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ア．電子ファイル：復元および再生が不可能な方法で安全に削除
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;イ．記録物、印刷物、書面：裁断または焼却
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                7. 第三者提供情報
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                当社が使用する第三者SDKの情報処理：
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ア．Google AdMob / Google AdSense
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;&nbsp;- 収集情報：広告識別子、端末情報、使用統計
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;&nbsp;-
                利用目的：パーソナライズド広告の提供、広告効果の測定
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;&nbsp;- 保管期間：広告識別子のリセットまたは無効化まで
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                8. 情報収集の案内
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                当社は、情報収集について次のように案内します：
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ア．アプリの初回起動時にデータ収集の案内を表示
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;イ．新しい種類のデータ収集時に別途ポップアップで通知
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                9. 第三者SDKの処理方針
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                各SDKのデータ収集および処理は、該当サービスのプライバシーポリシーに従います。
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第6条（個人情報の保護）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1. 基本原則
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ア．当社は、関連法令に従い、利用者の個人情報を安全に保護します。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;イ．当社は、個人情報の収集時に収集目的、項目、保有期間などを告知し、同意を得ます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ウ．利用者は、個人情報の閲覧、訂正、削除を要求することができます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2. 利用者の権利
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                利用者は以下の権利を有します：
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ア．個人情報へのアクセス権
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;イ．個人情報の訂正及び削除要求権
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ウ．個人情報処理の制限要求権
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;エ．個人情報の移動権
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;オ．特定目的の個人情報処理中断要求権（例：マーケティング目的の個人情報使用拒否）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                3. 国際法の遵守
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ア．当社は、欧州一般データ保護規則（GDPR）及びカリフォルニア州消費者プライバシー法（CCPA）を含む国内外の個人情報保護法令を遵守します。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;イ．EU居住者及びカリフォルニア州住民は、それぞれの法令に基づく追加的な権利を有します。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                4. 個人情報の破棄
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ア．保存期間が経過した個人情報は、遅滞なく破棄されます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;イ．破棄方法：
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;&nbsp;-
                電子ファイル：復元および再生が不可能な方法で安全に削除
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;&nbsp;- 記録物、印刷物、文書：裁断または焼却
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第7条（サービス利用時の遵守事項）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1.
                利用者は、本サービスの利用時に関連法令と本規約を遵守しなければなりません。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2. 利用者は、次の各号の行為を行ってはなりません。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ア．他人の個人情報、プライバシーを侵害する行為
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;イ．本サービスの運営を妨害する行為
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ウ．その他法令に違反する行為
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第8条（知的財産権）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1. 本サービスに関する著作権及び知的財産権は、当社に帰属します。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2.
                利用者は、当社の事前の書面による承諾なしに、タロット解釈結果を除き、本サービスを複製、送信、修正することはできません。
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第9条（購入及び返金）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1. 利用者は、本サービス内で有料商品を購入することができます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2. 利用券の返金は、次の条件に従って処理されます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                ア. 購入時に支払った金額の70%が部分的に払い戻し処理されます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;イ．
                払い戻し金額はUSDの場合、小数点以下第二位まで可能です。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ウ.
                購入時の支払い金額を基準として、払い戻し請求の総額が3米ドル以上でなければなりません。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;エ.
                購入後のクーリングオフ期間(180日)内でのみ、払い戻しを請求することができます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;オ. Google
                Playストアからダウンロードしたアプリで利用券を購入した場合、例外的に
                Google Play ストアの払い戻しポリシーに従います。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                {`3.
                具体的な返金手続き及び基準は、当社の運営方針（返金ポリシー）に従いますので、「マイページ
                > 情報 > 購入 >
                ポリシー」に移動して返金ポリシーを参照してください。`}
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                4.
                購入および返金過程において不正行為が発見された場合、会社は当該利用者に対して金銭的賠償を要求することができ、2回の書面警告を提供することができます。警告後も不正行為が継続する場合、会社は当該利用者のサービス利用を制限したり、アカウントを停止したりすることができます。さらに、会社は不正行為による損害について追加的な金銭的賠償を請求したり、法的措置を講じたりする権利を有します。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                5.
                ご参考に、利用券使用時には、ウェブサイトで購入した利用券を先に使用し、その後、Google
                Playストアのアプリで購入した利用券を使用することになります。
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第10条（サービスの中断及び変更）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1.
                当社は、本サービスの改善などのために必要な場合、本サービスを中断又は変更することができます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2.
                当社は、事前にこれを利用者に告知するものとしますが、やむを得ない場合は事後に告知することができます。
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第11条（損害賠償及び免責事項）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1.
                当社は、本サービス及びコンテンツの利用に関連して利用者に生じたすべての損害について責任を負いません。ただし、返金に関する事項は、利用規約第9条に従って処理します。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2.
                利用者が本規約の規定に違反したことにより、当社に損害が発生した場合、利用者は当社に対してその損害を賠償しなければなりません。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                3.
                天災、戦争、テロなどの不可抗力によりサービスの提供が不可能な場合、当社は責任を負いません。
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第12条（紛争解決）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1.
                本規約の解釈及び適用に関する紛争が発生した場合、当社と利用者は相互に協議して解決するものとしますが、これに至らない場合は、関連法令及び商慣習に従います。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2.
                当社と利用者の間で提起されたすべての訴訟は、当社本社所在地の管轄裁判所を専属的合意管轄裁判所とします。
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第13条（規約の変更）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1. 当社は、必要な場合、本規約を変更することができます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2.
                規約が変更される場合、当社は適用日及び変更理由を明示して、その変更内容を告知します。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                3.
                変更された規約に同意しない利用者は、本サービスの利用を中止し、退会することができます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                4.
                会社は、(利用)規約に変更がある場合、ウェブサイトのお知らせ、個別のメール、またはアプリストアのリリースノートを通じて、変更内容をユーザーにお知らせします。アプリの主要機能の変更や重要な更新事項についても、同様の方法で通知される場合があります。
              </div>{' '}
              {''}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第14条 (広告サービス)
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1. 会社はGoogle AdMob / Google
                AdSenseを使用して広告を提供することができます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2.
                広告目的で収集される情報には、デバイス情報（機種名、OSバージョンなど）、位置情報、アプリ使用パターン、広告インタラクションデータなどが含まれる場合があります。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                3.
                利用者は端末の設定によってパーソナライズド広告を拒否することができます。
              </div>{' '}
              <div
                className={styles['terms-of-service-details-japanese']}
              >{`ア. Android: 設定 > Google > 広告`}</div>{' '}
              <div
                className={styles['terms-of-service-details-japanese']}
              >{`イ. iOS: 設定 > プライバシー > トラッキング`}</div>{' '}
              {'*'}
              <div>第14条の1 (広告コンテンツ)</div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1. 広告コンテンツはGoogle AdMob / Google
                AdSenseのポリシーに従い、当社は個別の広告内容を直接制御することはできません。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2. 不適切な広告を発見した場合、Google AdMob / Google
                AdSenseを通じて報告することができます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                3.
                報酬型広告の視聴は任意であり、視聴完了時に明示された報酬が即時に支給されます。
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第15条（ユーザー識別手段）
              </div>{' '}
              {isNative ? (
                <>
                  <div className={styles['terms-of-service-details-japanese']}>
                    1.
                    当社はモバイルアプリでの広告提供及びユーザー識別のために広告識別子を使用します。
                  </div>{' '}
                  <div className={styles['terms-of-service-details-japanese']}>
                    2.
                    ユーザーは端末設定により広告識別子の使用を制限することができます。
                  </div>{' '}
                </>
              ) : (
                <>
                  <div className={styles['terms-of-service-details-japanese']}>
                    1.
                    当社は、サービス提供および広告目的でクッキーを使用することがあります。
                  </div>{' '}
                  <div className={styles['terms-of-service-details-japanese']}>
                    2.
                    利用者は、ブラウザの設定を通じてクッキーの保存を拒否することができます。
                  </div>{' '}
                </>
              )}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第16条（第三者への情報提供）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1. 当社は、Google AdMob / Google
                AdSenseと利用者情報を共有する場合があります。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ア．アプリ使用統計. 端末情報
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;イ．エラー報告. おおよその位置情報
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                &nbsp;ウ. 広告識別子(AAID/IDFA)
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2.
                共有される情報は広告ID、デバイス情報などであり、広告提供目的で使用されます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                ア. パーソナライズド広告の提供
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                イ. 広告効果の測定
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                ウ. 不正広告の防止
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第17条（国際データ転送）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1.
                利用者の個人情報は、国外に位置するサーバーに保存されたり、国外の企業に転送されたりする場合があります。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2.
                当社は、国際転送時に個人情報保護のための適切な措置を講じます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                3.
                EU居住者の個人情報を国際転送する場合、GDPRが規定する標準契約条項（Standard
                Contractual Clauses）などの適切な保護措置を適用します。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                4.
                カリフォルニア州居住者の個人情報は、CCPA規制に従って処理され、関連する権利行使の方法はプライバシーポリシーでご確認いただけます。
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第18条（児童の個人情報保護）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1. 本サービスは3歳以上のユーザーが利用できます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2. 児童保護のため、以下の事項を遵守します：
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                ア. 有害または不適切なコンテンツを提供しません。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                イ. 必要最小限の情報のみを収集します。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                ウ. 安全なサービス利用環境を提供します。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                3. 保護者による管理：
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                ア. 13歳未満の児童の場合、保護者による管理監督を推奨します。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                イ.
                保護者はいつでも子供の利用履歴を確認・管理することができます。
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第19条（個人情報保護責任者）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1. 個人情報保護責任者：キム ジニョン
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2. 連絡先：cosmostarotinfo@gmail.com
              </div>{' '}
              {''}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第20条（セキュリティ対策）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                当社は、利用者の個人情報を保護するために以下のセキュリティ対策を講じています：
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1. 個人情報の暗号化
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2. ハッキング等に対する技術的対策
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                3. 個人情報へのアクセス制限
              </div>{' '}
              {''}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                付則
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                本規約は、2024年9月14日から施行されます。
              </div>
            </>
          ) : (
            ''
          )}
          {browserLanguage === 'en' ? (
            <>
              <div>Article 1 (Purpose)</div>{' '}
              <div>
                These terms and conditions aim to stipulate the conditions and
                procedures for the use of the tarot service (hereinafter
                referred to as the "Service") provided by Jinworld (hereinafter
                referred to as the "Company").
              </div>{' '}
              {'*'}
              <div>Article 2 (Definition of Terms)</div>{' '}
              <div>
                1. "Service" refers to the tarot card prediction service
                operated by the Company.
              </div>{' '}
              <div>
                2. "User" refers to an individual or legal entity that agrees to
                these terms and conditions and uses the Service.
              </div>{' '}
              {'*'}
              <div>Article 3 (Conclusion of Service Use Agreement)</div>{' '}
              <div>
                1. The service use agreement is concluded when the user applies
                for membership registration.
              </div>{' '}
              {'*'}
              <div>Article 4 (Service Usage Fees)</div>{' '}
              <div>
                1. To use the Service, users must either pay the fee for the
                voucher set by the Company or watch advertisements.
              </div>{' '}
              <div>
                2. The specific amount and payment method of the fees will be
                announced through the Service.
              </div>{' '}
              {'*'}
              <div>Article 5 (Service Use and Information Provision)</div>{' '}
              <div>1. Scope of Collected Information</div>{' '}
              <div>
                The Company may request the following types of information from
                users for service provision:
              </div>{' '}
              <div>
                &nbsp;a. Basic personal information such as name and email
              </div>{' '}
              <div>&nbsp;b. Information generated during service use</div>{' '}
              <div>&nbsp;c. Device information when using mobile app</div>{' '}
              <div>2. Information Provision Obligation</div>{' '}
              <div>
                Users must provide all information truthfully. Users shall bear
                any disadvantages resulting from providing false information.
              </div>{' '}
              <div>3. Information Collection Methods</div>{' '}
              <div>
                The Company collects information through the following methods:
              </div>{' '}
              <div>
                &nbsp;a. Direct collection through web forms during membership
                registration
              </div>{' '}
              <div>
                &nbsp;b. Automatic collection of information generated during
                service use
              </div>{' '}
              <div>
                &nbsp;c. Automatic collection of device information when using
                mobile app
              </div>{' '}
              <div>4. Background Data Collection</div>{' '}
              <div>
                The Company may collect the following data in the background for
                service improvement:
              </div>{' '}
              <div>&nbsp;a. App usage statistics</div>{' '}
              <div>&nbsp;b. Error reports</div>{' '}
              <div>&nbsp;c. Device performance data</div>{' '}
              <div>5. Information Storage</div>{' '}
              <div>
                The Company stores collected information for the following
                periods:
              </div>{' '}
              <div>
                &nbsp;a. Member information (name, contact, email, etc.): Until
                membership withdrawal
              </div>{' '}
              <div>
                &nbsp;b. Content information: Immediate deletion upon user
                request or automatic deletion after 3 months from use
              </div>{' '}
              <div>
                &nbsp;c. Content usage rights: Maximum 1 year from purchase
                date, then expires
              </div>{' '}
              <div>6. Information Disposal</div>{' '}
              <div>
                Information past its retention period is disposed of as follows:
              </div>{' '}
              <div>
                &nbsp;a. Electronic files: Securely deleted in a manner
                preventing recovery and reproduction
              </div>{' '}
              <div>
                &nbsp;b. Records, printouts, documents: Shredded or incinerated
              </div>{' '}
              <div>7. Third-Party Information Provision</div>{' '}
              <div>
                Information processing by third-party SDK used by the Company:
              </div>{' '}
              <div>&nbsp;a. Google AdMob / Google AdSense</div>{' '}
              <div>
                &nbsp;&nbsp;- Collected information: Ad identifier, device
                information, usage statistics
              </div>{' '}
              <div>
                &nbsp;&nbsp;- Purpose: Personalized ad delivery, ad performance
                measurement
              </div>{' '}
              <div>
                &nbsp;&nbsp;- Storage period: Until ad identifier reset or
                deactivation
              </div>{' '}
              <div>8. Information Collection Notice</div>{' '}
              <div>
                The Company provides notice of information collection as
                follows:
              </div>{' '}
              <div>
                &nbsp;a. Display data collection notice at first app launch
              </div>{' '}
              <div>
                &nbsp;b. Provide separate popup notification for new types of
                data collection
              </div>{' '}
              <div>9. Third-Party SDK Processing Policy</div>{' '}
              <div>
                Data collection and processing by each SDK follows the privacy
                policy of the respective service.
              </div>{' '}
              {'*'}
              <div>Article 6 (Protection of Personal Information)</div>{' '}
              <div>1. Basic Principles</div>{' '}
              <div>
                &nbsp;a. The Company safely protects users' personal information
                in accordance with relevant laws and regulations.
              </div>{' '}
              <div>
                &nbsp;b. The Company notifies and obtains consent regarding the
                purpose, items, and retention period of personal information
                collection.
              </div>{' '}
              <div>
                &nbsp;c. Users may request access to, correction of, or deletion
                of their personal information.
              </div>{' '}
              <div>2. User Rights</div>{' '}
              <div>Users have the following rights:</div>{' '}
              <div>&nbsp;a. Right to access personal information</div>{' '}
              <div>
                &nbsp;b. Right to request correction and deletion of personal
                information
              </div>{' '}
              <div>
                &nbsp;c. Right to request restriction of personal information
                processing
              </div>{' '}
              <div>&nbsp;d. Right to data portability</div>{' '}
              <div>
                &nbsp;e. Right to request cessation of personal information
                processing for specific purposes (e.g., refusing the use of
                personal information for marketing purposes)
              </div>{' '}
              <div>3. International Law Compliance</div>{' '}
              <div>
                &nbsp;a. The Company complies with domestic and international
                privacy laws, including the European General Data Protection
                Regulation (GDPR) and the California Consumer Privacy Act
                (CCPA).
              </div>{' '}
              <div>
                &nbsp;b. EU residents and California residents have additional
                rights under their respective regulations.
              </div>{' '}
              <div>4. Disposal of Personal Information</div>{' '}
              <div>
                &nbsp;a. Personal information past its retention period will be
                disposed of without delay.
              </div>{' '}
              <div>&nbsp;b. Disposal methods:</div>{' '}
              <div>
                &nbsp;&nbsp;- Electronic files: Securely deleted in a manner
                preventing recovery and reproduction
              </div>{' '}
              <div>
                &nbsp;&nbsp;- Records, printouts, documents: Shredded or
                incinerated
              </div>{' '}
              {'*'}
              <div>Article 7 (Compliance with Service Use)</div>{' '}
              <div>
                1. Users must comply with relevant laws and these terms and
                conditions when using the Service.
              </div>{' '}
              <div>2. Users shall not engage in any of the following acts:</div>{' '}
              <div>
                A. Infringement of others' personal information or privacy
              </div>{' '}
              <div>B. Interfering with the operation of the Service</div>{' '}
              <div>C. Other acts that violate laws and regulations</div> {'*'}
              <div>Article 8 (Intellectual Property Rights)</div>{' '}
              <div>
                1. Copyrights and intellectual property rights related to the
                Service belong to the Company.
              </div>{' '}
              <div>
                2. Users may not reproduce, transmit, or modify the Service
                without the Company's prior written consent, except for tarot
                interpretation results.
              </div>{' '}
              {'*'}
              <div>Article 9 (Purchase and Refund)</div>{' '}
              <div>1. Users may purchase paid products within the Service.</div>{' '}
              <div>
                2. Refunds for vouchers are processed according to the following
                conditions:
              </div>{' '}
              <div>
                A. 70% of the amount paid at the time of purchase will be
                partially refunded.
              </div>{' '}
              <div>
                B. The refund amount is calculated to the second decimal place
                (cents) for USD.
              </div>{' '}
              <div>
                C. The total amount requested for a refund must be at least 3
                USD based on the payment amount at the time of purchase.
              </div>{' '}
              <div>
                D. Refund requests can only be made within the cooling-off
                period (180 days) after the purchase.
              </div>{' '}
              <div>
                E. For vouchers purchased through apps downloaded from the
                Google Play Store (using in-app purchases), refunds will be
                processed according to the Google Play Store's refund policy as
                an exception.
              </div>{' '}
              <div>
                {`3. Specific refund procedures and standards follow the Company's
                operational policy (refund policy), so please refer to the
                refund policy by going to "My Page > User > Purchase > Policy".`}
              </div>{' '}
              <div>
                4. In the event that fraudulent activities are detected during
                the purchase and refund process, the company may demand monetary
                compensation from the user in question and may provide two
                written warnings. If the fraudulent activities persist after
                these warnings, the company reserves the right to restrict the
                user's access to the service or suspend their account.
                Furthermore, the company reserves the right to claim additional
                monetary compensation for damages caused by the fraudulent
                activities or to take legal action.
              </div>{' '}
              <div>
                5. For your information, when using vouchers, those purchased on
                the website will be used first, followed by those purchased
                through the Google Play Store app.
              </div>{' '}
              {'*'}
              <div>Article 10 (Service Interruption and Change)</div>{' '}
              <div>
                1. The Company may suspend or change the Service when necessary
                for service improvements or other reasons.
              </div>{' '}
              <div>
                2. The Company shall notify users in advance, but in unavoidable
                cases, notification may be made after the fact.
              </div>{' '}
              {'*'}
              <div>
                Article 11 (Compensation for Damages and Disclaimer)
              </div>{' '}
              <div>
                1. The Company shall not be liable for any damages incurred by
                users in connection with the use of the Service and its content.
                However, matters related to refunds shall be processed in
                accordance with Article 9 of the Terms and Conditions.
              </div>{' '}
              <div>
                2. If the Company suffers damages due to the user's violation of
                these terms and conditions, the user shall compensate the
                Company for such damages.
              </div>{' '}
              <div>
                3. The Company shall not be liable if the provision of the
                Service is impossible due to force majeure events such as
                natural disasters, war, or terrorism.
              </div>{' '}
              {'*'}
              <div>Article 12 (Dispute Resolution)</div>{' '}
              <div>
                1. If a dispute arises regarding the interpretation and
                application of these terms and conditions, the Company and the
                user shall resolve it through mutual consultation. If an
                agreement cannot be reached, it shall be resolved in accordance
                with relevant laws and commercial practices.
              </div>{' '}
              <div>
                2. All lawsuits filed between the Company and users shall be
                subject to the exclusive jurisdiction of the court having
                jurisdiction over the location of the Company's headquarters.
              </div>{' '}
              {'*'}
              <div>Article 13 (Amendment of Terms and Conditions)</div>{' '}
              <div>
                1. The Company may amend these terms and conditions when
                necessary.
              </div>{' '}
              <div>
                2. In the event of an amendment to the terms and conditions, the
                Company shall specify the effective date and reason for the
                change and announce the changes.
              </div>{' '}
              <div>
                3. Users who do not agree to the amended terms and conditions
                may discontinue the use of the Service and withdraw their
                membership.
              </div>{' '}
              <div>
                4. In the event of changes to the Terms of Service, the company
                will notify users of the changes through website announcements,
                individual emails, or app store release notes. Major feature
                changes or important updates to the app may also be announced in
                the same manner.
              </div>{' '}
              {'*'}
              <div>Article 14 (Advertising Services)</div>{' '}
              <div>
                1. The Company may provide advertisements using Google AdMob /
                Google AdSense.
              </div>{' '}
              <div>
                2. Information collected for advertising purposes may include
                device information (model name, OS version, etc.), location
                information, app usage patterns, and ad interaction data.
              </div>{' '}
              <div>
                3. Users can opt out of personalized advertising through their
                device settings.
              </div>{' '}
              <div>&nbsp;{`a. Android: Settings > Google > Ads`}</div>{' '}
              <div>&nbsp;{`b. iOS: Settings > Privacy > Tracking`}</div> {'*'}
              <div>Article 14-1 (Advertisement Content)</div>{' '}
              <div>
                1. Advertisement content follows Google AdMob / Google AdSense's
                policies, and the company cannot directly control individual
                advertisement content.
              </div>{' '}
              <div>
                2. Inappropriate advertisements can be reported through Google
                AdMob / Google AdSense.
              </div>{' '}
              <div>
                3. Rewarded ad viewing is optional, and specified rewards are
                immediately provided upon completion of viewing.
              </div>{' '}
              {'*'}
              <div>Article 15 (User Identification Methods)</div>{' '}
              {isNative ? (
                <>
                  <div>
                    1. The company uses advertising identifiers for ad delivery
                    and user identification in mobile applications.
                  </div>{' '}
                  <div>
                    2. Users can restrict the use of advertising identifiers
                    through device settings.
                  </div>{' '}
                </>
              ) : (
                <>
                  <div>
                    1. The Company may use cookies for service provision and
                    advertising purposes.
                  </div>{' '}
                  <div>
                    2. Users can refuse to store cookies through their browser
                    settings.
                  </div>{' '}
                </>
              )}
              {'*'}
              <div>Article 16 (Third-Party Information Sharing)</div>{' '}
              <div>
                1. The Company may share user information with Google AdMob /
                Google AdSense.
              </div>{' '}
              <div>&nbsp;a. Device Information</div>{' '}
              <div>&nbsp;b. Approximate Location Data</div>{' '}
              <div>&nbsp;c. Advertising Identifier (AAID/IDFA)</div>{' '}
              <div>
                2. Shared information includes advertising IDs and device
                information, which are used for advertising purposes.
              </div>{' '}
              <div>&nbsp;a. Personalized Ad Delivery</div>{' '}
              <div>&nbsp;b. Ad Performance Measurement</div>{' '}
              <div>&nbsp;c. Ad Fraud Prevention</div> {'*'}
              <div>Article 17 (International Data Transfer)</div>{' '}
              <div>
                1. Users' personal information may be stored on servers located
                outside the country or transferred to overseas companies.
              </div>{' '}
              <div>
                2. The Company takes appropriate measures to protect personal
                information during international transfers.
              </div>{' '}
              <div>
                3. When transferring personal information of EU residents
                internationally, appropriate safeguards such as Standard
                Contractual Clauses as stipulated by GDPR will be applied.
              </div>{' '}
              <div>
                4. Personal information of California residents is processed in
                accordance with CCPA regulations, and methods for exercising
                related rights can be found in the Privacy Policy.
              </div>{' '}
              {'*'}
              <div>
                Article 18 (Protection of Children's Personal Information)
              </div>{' '}
              <div>1. This service is available to users aged 3 and above.</div>{' '}
              <div>
                2. We comply with the following measures to protect children:
              </div>{' '}
              <div>
                &nbsp;a. We do not provide harmful or inappropriate content.
              </div>{' '}
              <div>
                &nbsp;b. We collect only the minimum necessary information.
              </div>{' '}
              <div>&nbsp;c. We provide a safe service environment.</div>{' '}
              <div>3. Parental Control:</div>{' '}
              <div>
                &nbsp;a. Parental supervision is recommended for children under
                13 years of age.
              </div>{' '}
              <div>
                &nbsp;b. Parents can check and manage their children's usage
                history at any time.
              </div>{' '}
              {'*'}
              <div>
                Article 19 (Personal Information Protection Officer)
              </div>{' '}
              <div>
                1. Personal Information Protection Officer: KIM JIN YOUNG
              </div>{' '}
              <div>2. Contact: cosmostarotinfo@gmail.com</div> {'*'}
              <div>Article 20 (Security Measures)</div>{' '}
              <div>
                The Company implements the following security measures to
                protect users' personal information:
              </div>{' '}
              <div>1. Encryption of personal information</div>{' '}
              <div>2. Technical measures against hacking and other threats</div>{' '}
              <div>3. Access control to personal information</div> {'*'}
              <div>Addendum</div>{' '}
              <div>
                These terms and conditions shall take effect from September
                14th, 2024.
              </div>
            </>
          ) : (
            ''
          )}
          <div
            style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
            aria-hidden="true"
          >
            <section>
              <h2>{t('page.etc.sections.title')}</h2>
              <ul>
                <li>{t('page.etc.sections.terms')}</li>
              </ul>
            </section>
            <section>
                <h2>{t('page.etc.features.title')}</h2>
              <div>
                <h3>{t('page.etc.features.termsService.title')}</h3>
                <p>{t('page.etc.features.termsService.description')}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
});
export default TermsOfServiceForm;
