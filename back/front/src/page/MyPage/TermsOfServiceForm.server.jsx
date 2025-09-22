import React from 'react';
import { headers } from 'next/headers';
import styles from '../../styles/scss/_TermsOfServiceForm.module.scss';
const TermsOfServiceForm = () => {
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language') || 'en';
  const browserLanguage = acceptLanguage.split(',')[0].split('-')[0];
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
          {browserLanguage === 'ko' && (
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
              <div>
                1. 회사는 서비스 제공을 위해 이용자에게 다음 각 호의 정보를
                요구할 수 있습니다.
              </div>{' '}
              <div>가. 이름, 연락처, 이메일 등 기본 인적사항</div>{' '}
              <div>나. 서비스 이용 과정에서 생성되는 정보</div>{' '}
              <div>
                2. 이용자는 모든 정보를 진실하게 제공하여야 합니다. 허위 정보
                제공으로 인한 불이익은 이용자 본인이 부담합니다.
              </div>{' '}
              <div>
                3. 콘텐츠 정보는 사용자가 삭제 버튼을 누르면 즉시 파기되며, 삭제
                버튼을 누르지 않았더라도 이용 시점을 기준으로 3개월이 지난
                시점에 자동으로 파기됩니다.
              </div>{' '}
              <div>
                4. 컨텐츠 이용권은 최대 1년까지 사용 가능하며, 1년 이후
                소멸됩니다.
              </div>{' '}
              {'*'}
              <div>제6조 (개인정보 보호)</div>{' '}
              <div>
                1. 회사는 관련 법령에 따라 이용자의 개인정보를 안전하게
                보호합니다.
              </div>{' '}
              <div>
                2. 회사는 개인정보 수집 시 수집목적, 항목, 보유기간 등을
                고지하고 동의를 받습니다.
              </div>{' '}
              <div>
                3. 이용자는 개인정보 열람, 정정, 삭제를 요청할 수 있습니다.
              </div>{' '}
              {'*'}
              <div>제7조 (서비스 이용 시 준수사항)</div>{' '}
              <div>
                1. 이용자는 서비스 이용 시 관련 법령과 본 약관을 준수하여야
                합니다.
              </div>{' '}
              <div>2. 이용자는 다음 각 호의 행위를 해서는 안 됩니다.</div>{' '}
              <div>가. 타인의 개인정보, 사생활 침해 행위</div>{' '}
              <div>나. 서비스 운영을 방해하는 행위</div>{' '}
              <div>다. 기타 법령에 위반되는 행위</div> {'*'}
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
              {}
              <div>
                2. 이용권 환불은 다음과 같은 조건에 따라 처리됩니다.
                <div>
                  가. 구매 시 결제한 금액의 70%가 부분 환불 처리됩니다.
                </div>{' '}
                <div>나. 환불금액은 십원단위 이상부터 지급됩니다.</div>{' '}
                <div>
                  다. 환불을 요청할 경우, 구매 시 결제 금액을 기준으로 총 환불
                  요청 금액이 5,000원 이상이어야 합니다.
                </div>{' '}
                <div>
                  라. 구매 후 청약철회 기간(1년) 이내에서만 환불 요청이
                  가능합니다. 단, 예외적으로 (퀵)계좌이체로 구매한 이용권은
                  구매일로부터 180일 이내, 휴대폰 결제의 경우 구매한 당월까지만
                  환불이 가능합니다.
                </div>{' '}
                <div>
                  마. 구글 플레이 스토어에서 다운로드한 앱으로 이용권을 구매한
                  경우(인앱 결제 이용), 예외적으로 구글 플레이 스토어의 환불
                  정책을 따릅니다.
                </div>{' '}
              </div>{' '}
              <div>
                {
                  "3. 구체적인 환불절차와 기준은 회사 운영정책(환불정책)에 따르니 '마이페이지 > 회원정보 > 이용권구매 > 환불정책'에 이동하시어 환불정책 참조바랍니다."
                }
              </div>{' '}
              <div>
                {
                  '4. 구매 및 환불 과정에서 부정행위가 발견될 경우, 회사는 해당 이용자에게 금전적 배상을 요구할 수 있으며, 2회의 서면 경고를 제공할 수 있습니다. 경고 후에도 부정행위가 지속되는 경우, 회사는 해당 이용자의 서비스 이용을 제한하거나 계정을 정지할 수 있습니다. 또한, 회사는 부정행위로 인한 손해에 대해 추가적인 금전적 배상을 청구하거나 법적 조치를 취할 권리를 보유합니다.'
                }
              </div>{' '}
              <div>
                {
                  '5. 참고로, 이용권 사용 시 웹사이트에서 구매한 이용권을 먼저 사용하고, 그 다음 구글 플레이 스토어 앱에서 구매한 이용권을 사용하게 됩니다.'
                }
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
                1. 회사는 서비스 이용과 관련하여 이용자에게 발생한 모든 손해에
                대해 책임을 부담하지 않습니다. 다만, 환불 관련 사항은 이용약관
                제9조에 따라 처리합니다.
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
              {'*'}
              <div>부칙</div>{' '}
              <div>이 약관은 2024년 3월 31일부터 시행됩니다.</div>
            </>
          )}
          {browserLanguage === 'ja' && (
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
                第5条（サービスの利用及び情報提供）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1.
                当社は、本サービスの提供のため、利用者に次の各号の情報を要求することができます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                ア．氏名、連絡先、メールアドレスなどの基本的な個人情報
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                イ．本サービスの利用過程で生成される情報
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2.
                利用者は、すべての情報を真実に基づいて提供しなければなりません。虚偽の情報提供による不利益は、利用者本人が負担するものとします。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                3.
                コンテンツ情報は、利用者が削除ボタンを押すと即時に破棄され、削除ボタンを押さなかった場合でも、利用時点を基準に3ヶ月が経過した日に自動的に破棄されます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                4.
                コンテンツ利用券は、最大1年間まで使用可能であり、1年経過後は消滅します。
              </div>{' '}
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                第6条（個人情報の保護）
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                1. 当社は、関連法令に従い、利用者の個人情報を安全に保護します。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                2.
                当社は、個人情報の収集時に収集目的、項目、保有期間などを告知し、同意を得ます。
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                3.
                利用者は、個人情報の閲覧、訂正、削除を要求することができます。
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
                ア．他人の個人情報、プライバシーを侵害する行為
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                イ．本サービスの運営を妨害する行為
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                ウ．その他法令に違反する行為
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
              {}
              <div className={styles['terms-of-service-details-japanese']}>
                2. 利用券の返金は、次の条件に従って処理されます。
                <div>
                  ア. 購入時に支払った金額の70%が部分的に払い戻し処理されます。
                </div>{' '}
                <div>
                  イ． 払い戻し金額はUSDの場合、小数点以下第二位まで可能です。
                </div>{' '}
                <div>
                  ウ.
                  購入時の支払い金額を基準として、払い戻し請求の総額が3米ドル以上でなければなりません。
                </div>{' '}
                <div>
                  エ.
                  購入後のクーリングオフ期間(180日)内でのみ、払い戻しを請求することができます。
                </div>{' '}
                <div>
                  オ. Google Play
                  ストアからダウンロードしたアプリで利用券を購入した場合、
                  例外的に Google Play ストアの払い戻しポリシーに従います。
                </div>
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                {`3.
                具体的な返金手続き及び基準は、当社の運営方針（返金ポリシー）に従いますので、「マイページ
                > 情報 > 購入 >
                ポリシー」に移動して返金ポリシーを参照してください。`}
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                {`4. 購入および返金過程において不正行為が発見された場合、会社は当該利用者に対して金銭的賠償を要求することができ、2回の書面警告を提供することができます。警告後も不正行為が継続する場合、会社は当該利用者のサービス利用を制限したり、アカウントを停止したりすることができます。さらに、会社は不正行為による損害について追加的な金銭的賠償を請求したり、法的措置を講じたりする権利を有します。`}
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                {`5. ご参考に、利用券使用時には、ウェブサイトで購入した利用券を先に使用し、その後、Google Playストアのアプリで購入した利用券を使用することになります。`}
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
                当社は、本サービスの利用に関連して利用者に生じたすべての損害について責任を負いません。ただし、返金に関する事項は、利用規約第9条に従って処理します。
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
              {'*'}
              <div className={styles['terms-of-service-details-japanese']}>
                付則
              </div>{' '}
              <div className={styles['terms-of-service-details-japanese']}>
                本規約は、2024年3月31日から施行されます。
              </div>
            </>
          )}
          {browserLanguage === 'en' && (
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
                content usage rights set by the Company or watch advertisements.
              </div>{' '}
              <div>
                2. The specific amount and payment method of the fees will be
                announced through the Service.
              </div>{' '}
              {'*'}
              <div>Article 5 (Service Use and Information Provision)</div>{' '}
              <div>
                1. The Company may require the following information from users
                to provide the Service:
              </div>{' '}
              <div>
                A. Basic personal information such as name, contact information,
                and email address
              </div>{' '}
              <div>B. Information generated during the use of the Service</div>{' '}
              <div>
                2. Users must provide all information truthfully. Any
                disadvantages caused by providing false information shall be
                borne by the user.
              </div>{' '}
              <div>
                3. Content information is immediately destroyed when the user
                clicks the delete button. Even if the delete button is not
                clicked, it is automatically destroyed on the date after 3
                months have elapsed from the creation date.
              </div>{' '}
              <div>
                4. Content usage rights can be used for up to 1 year and will
                expire after 1 year.
              </div>{' '}
              {'*'}
              <div>Article 6 (Protection of Personal Information)</div>{' '}
              <div>
                1. The Company shall safely protect users' personal information
                in accordance with relevant laws and regulations.
              </div>{' '}
              <div>
                2. The Company shall notify and obtain consent regarding the
                purpose, items, and retention period of personal information
                collection.
              </div>{' '}
              <div>
                3. Users may request access, correction, or deletion of personal
                information.
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
              {}
              <div>
                2. Refunds for vouchers are processed according to the following
                conditions.
                <div>
                  A. 70% of the amount paid at the time of purchase will be
                  partially refunded.
                </div>{' '}
                <div>
                  {' '}
                  B. The refund amount is calculated to the second decimal place
                  (cents) for USD.
                </div>{' '}
                <div>
                  C. The total amount requested for a refund must be at least 3
                  USD based on the payment amount at the time of purchase.
                </div>{' '}
                <div>
                  D. Refund requests can only be made within the cooling-off
                  period(180 days) after the purchase.
                </div>{' '}
                <div>
                  E. For vouchers purchased through apps downloaded from the
                  Google Play Store (using in-app purchases), refunds will be
                  processed according to the Google Play Store's refund policy
                  as an exception.
                </div>
              </div>{' '}
              <div>
                {`3. Specific refund procedures and standards follow the Company's
                operational policy (refund policy), so please refer to the
                refund policy by going to "My Page > User > Purchase > Policy".`}
              </div>{' '}
              <div>
                {`4. In the event that fraudulent activities are detected during the purchase and refund process, the company may demand monetary compensation from the user in question and may provide two written warnings. If the fraudulent activities persist after these warnings, the company reserves the right to restrict the user's access to the service or suspend their account. Furthermore, the company reserves the right to claim additional monetary compensation for damages caused by the fraudulent activities or to take legal action.`}
              </div>{' '}
              <div>
                {`5. For your information, when using vouchers, those purchased on the website will be used first, followed by those purchased through the Google Play Store app.`}
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
                users in connection with the use of the Service. However,
                matters related to refunds shall be processed in accordance with
                Article 9 of the Terms and Conditions.
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
              {'*'}
              <div>Addendum</div>{' '}
              <div>
                These terms and conditions shall take effect from March 31,
                2024.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default TermsOfServiceForm;
