import React, { Suspense, useEffect, useRef, useState } from 'react';
import styles from '../../styles/scss/_TarotCardLearningForm.module.scss';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { renderAnswerAsLines } from '../../function/renderAnswerAsLines.jsx';
import { useTranslation } from 'react-i18next';
import LoadingForm from '../../Components/Loading/Loading.jsx';
const TarotLearningForm = () => {
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
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  let text;
  if (browserLanguage === 'ko') {
    text = `1. 질문 이해하기:\n* 질문의 본질을 정확히 파악합니다. 예: "전 남자친구A는 현재 나를 얼마나 떠올리고 있나?"\n* 질문의 주요 요소를 분석합니다: '전 남자친구', '현재', '얼마나 떠올리고 있나' 등이 중요한 키워드입니다.\n\n2. 스프레드 구성 이해하기:\n* 사용된 스프레드의 각 위치가 어떤 의미를 갖는지 파악합니다.\n* 예를 들어, 4장 스프레드를 가정할 경우:\n  - 1번 카드: 현재 상황 또는 전반적인 에너지\n  - 2번 카드: 영향을 미치는 요인 또는 도전\n  - 3번 카드: 내면의 감정 또는 동기\n  - 4번 카드: 결과 또는 향후 발전 방향\n\n3. 개별 카드 해석:\n* 각 카드의 전통적 의미, 상징, 이미지, 숫자, 원소 등을 분석합니다.\n  - 예: 나이트 오브 소드\n  - 상징: 행동, 충동, 사고의 빠른 움직임\n  - 원소: 공기(생각, 통신)\n  - 이미지: 빠르게 달리는 기사\n* 이를 종합하여 '빈번하고 강렬한 생각'으로 해석할 수 있습니다.\n\n4. 카드와 포지션 연결:\n* 각 카드의 의미를 스프레드 포지션의 의미와 결합합니다.\n* 예: 나이트 오브 소드가 1번 위치에 있다면, 현재 남자친구A가 질문자를 떠올리는 전반적인 에너지가 빈번하고 강렬함을 나타낼 수 있습니다.\n\n5. 카드 간 관계 분석:\n* 카드들 사이의 연관성, 대비, 흐름을 살펴봅니다.\n* 예: 나이트 오브 소드(빠른 생각)와 투 오브 펜타클(균형)의 조합은 빈번한 생각과 일상의 균형 사이의 긴장을 나타낼 수 있습니다.\n\n6. 질문과의 연결:\n* 각 카드와 전체 스프레드를 질문에 직접 연관 짓습니다.\n* "얼마나 떠올리고 있나?"라는 질문에 대해:\n  - 나이트 오브 소드: 빈번하게\n  - 투 오브 펜타클: 일상 속에서 주기적으로\n  - 킹 오브 컵: 깊은 감정을 동반하여\n  - 식스 오브 소드: 과거를 회상하면서도 변화를 추구하며\n\n7. 직관적 해석 추가:\n* 카드의 이미지, 색상, 전체적인 분위기에서 받는 인상을 더합니다.\n* 예: 킹 오브 컵의 평온한 이미지는 남자친구A의 감정이 안정되어 가고 있음을 암시할 수 있습니다.\n\n8. 종합 해석:\n* 모든 요소를 종합하여 전체적인 그림을 그립니다.\n* 이 경우, 남자친구A가 질문자를 자주, 깊이 있게 떠올리지만, 그 생각이 복잡하고 변화하고 있다는 결론을 도출할 수 있습니다.\n\n9. 맥락 고려:\n* 질문자의 상황, 관계 역사 등 알려진 맥락을 고려하여 해석을 조정합니다.\n* '전 남자친구'라는 점은 과거 깊은 관계가 있었음을 시사하므로, 이를 해석에 반영합니다.\n\n10. 해석의 제시:\n * 종합 해석을 먼저 제시한 후, 각 카드별 상세 해석을 제공합니다.\n * 해석이 절대적 진실이 아닌 가능성임을 명시합니다.\n\n이러한 과정을 거쳐 타로카드 해석이 이루어집니다. 이는 논리적 분석과 직관적 통찰의 결합으로, 각 리더의 경험과 지식에 따라 다양한 해석이 가능할 수 있습니다. 타로 해석은 고정된 규칙보다는 유연한 가이드라인을 따르며, 상황과 맥락에 따라 적절히 조정될 수 있습니다.`;
  } else if (browserLanguage === 'ja') {
    text = `\n1. 質問を理解する:\n* 質問の本質を正確に把握します。例：「元彼氏Aは現在、私のことをどれくらい思い出しているか？」\n* 質問の主要な要素を分析します：'元彼氏'、'現在'、'どれくらい思い出しているか'などが重要なキーワードです。\n\n2. スプレッドの構成を理解する:\n* 使用されているスプレッドの各位置がどのような意味を持つか把握します。\n* 例えば、4枚スプレッドを仮定する場合：\n  - 1番カード：現在の状況または全体的なエネルギー\n  - 2番カード：影響を与える要因または課題\n  - 3番カード：内面の感情または動機\n  - 4番カード：結果または今後の展開\n\n3. 個別のカード解釈:\n* 各カードの伝統的な意味、象徴、イメージ、数字、元素などを分析します。\n  - 例：ナイト・の・ソード\n  - 象徴：行動、衝動、思考の速い動き\n  - 元素：空気（思考、通信）\n  - イメージ：速く走る騎士\n* これらを総合して'頻繁で強烈な思考'と解釈できます。\n\n4. カードとポジションの連携:\n* 各カードの意味をスプレッドのポジションの意味と結びつけます。\n* 例：ナイト・の・ソードが1番の位置にある場合、現在、元彼氏Aが質問者を思い出す全体的なエネルギーが頻繁で強烈であることを示す可能性があります。\n\n5. カード間の関係分析:\n* カード間の関連性、対比、流れを見ます。\n* 例：ナイト・の・ソード（速い思考）とペンタクル・の・ツー（バランス）の組み合わせは、頻繁な思考と日常生活のバランスの間の緊張を示す可能性があります。\n\n6. 質問との関連付け:\n* 各カードと全体のスプレッドを質問に直接関連付けます。\n* 「どれくらい思い出しているか？」という質問に対して：\n  - ナイト・の・ソード：頻繁に\n  - ペンタクル・の・ツー：日常の中で定期的に\n  - キング・の・カップ：深い感情を伴って\n  - ソード・の・シックス：過去を振り返りながらも変化を求めて\n\n7. 直感的解釈の追加:\n* カードのイメージ、色、全体的な雰囲気から受ける印象を加えます。\n* 例：キング・の・カップの穏やかなイメージは、元彼氏Aの感情が安定してきていることを示唆する可能性があります。\n\n8. 総合解釈:\n* すべての要素を総合して全体的な絵を描きます。\n* この場合、元彼氏Aが質問者のことを頻繁に、深く思い出しているが、その思考が複雑で変化していると結論づけることができます。\n\n9. 文脈の考慮:\n* 質問者の状況、関係の歴史など、既知の文脈を考慮して解釈を調整します。\n* '元彼氏'という点は過去に深い関係があったことを示唆するため、これを解釈に反映させます。\n\n10. 解釈の提示:\n * まず総合的な解釈を提示し、その後各カードの詳細な解釈を提供します。\n * 解釈が絶対的な真実ではなく、可能性であることを明示します。\n\nこのようなプロセスを経てタロットカードの解釈が行われます。これは論理的分析と直感的洞察の組み合わせであり、各リーダーの経験と知識に応じて様々な解釈が可能です。タロット解釈は固定されたルールよりも柔軟なガイドラインに従い、状況と文脈に応じて適切に調整できます。`;
  } else if (browserLanguage === 'en') {
    text = `1. Understanding the Question:\n* Accurately grasp the essence of the question. Example: "How much is my ex-boyfriend A thinking about me currently?"\n* Analyze the key elements of the question: 'ex-boyfriend', 'currently', 'how much thinking' are important keywords.\n\n2. Understanding the Spread Layout:\n* Identify the meaning of each position in the used spread.\n* For example, assuming a 4-card spread:\n  - Card 1: Current situation or overall energy\n  - Card 2: Influencing factors or challenges\n  - Card 3: Inner feelings or motivations\n  - Card 4: Outcome or future developments\n\n3. Individual Card Interpretation:\n* Analyze each card's traditional meaning, symbols, images, numbers, elements, etc.\n  - Example: Knight of Swords\n  - Symbol: Action, impulse, rapid movement of thoughts\n  - Element: Air (thoughts, communication)\n  - Image: Fast-riding knight\n* This can be interpreted as 'frequent and intense thoughts'.\n\n4. Connecting Cards with Positions:\n* Combine the meaning of each card with the meaning of its spread position.\n* Example: If the Knight of Swords is in position 1, it might indicate that the overall energy of ex-boyfriend A thinking about the querent is frequent and intense.\n\n5. Analyzing Relationships Between Cards:\n* Look at the connections, contrasts, and flow between the cards.\n* Example: The combination of Knight of Swords (quick thoughts) and Two of Pentacles (balance) might indicate tension between frequent thoughts and maintaining daily balance.\n\n6. Connecting to the Question:\n* Directly relate each card and the entire spread to the question.\n* For the question "How much is she thinking about me?":\n  - Knight of Swords: Frequently\n  - Two of Pentacles: Periodically in daily life\n  - King of Cups: With deep emotions\n  - Six of Swords: Reminiscing about the past while seeking change\n\n7. Adding Intuitive Interpretation:\n* Add impressions from the card's image, colors, and overall atmosphere.\n* Example: The serene image of the King of Cups might suggest that ex-boyfriend A's emotions are becoming more stable.\n\n8. Comprehensive Interpretation:\n* Synthesize all elements to create an overall picture.\n* In this case, we might conclude that ex-boyfriend A thinks about the querent frequently and deeply, but these thoughts are complex and changing.\n\n9. Considering Context:\n* Adjust the interpretation considering the querent's situation, relationship history, and other known contexts.\n* The fact that she's an 'ex-boyfriend' suggests a past deep relationship, which should be reflected in the interpretation.\n\n10. Presenting the Interpretation:\n * First present the comprehensive interpretation, then provide detailed interpretations for each card.\n * Clarify that the interpretation is a possibility, not an absolute truth.\n\nThis process forms the basis of tarot card interpretation. It combines logical analysis with intuitive insight, allowing for various interpretations based on each reader's experience and knowledge. Tarot interpretation follows flexible guidelines rather than fixed rules and can be adjusted appropriately according to the situation and context.`;
  }
  return (
    <>
      <Suspense fallback={<LoadingForm />}>
        <div className={styles['container']}>
          <div className={styles['box']}>
            <div
              className={`${
                browserLanguage === 'ja'
                  ? styles['content-japanese']
                  : styles['content']
              }`}
              ref={scrollContainerRef}
              onWheel={e => {
                handleScroll(e);
              }}
            >
              <h2>{t(`content.learning_tarot_content`)}</h2>
              {text}
            </div>
          </div>
          <div
            style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
            aria-hidden="true"
          >
            <section>
              <h2>{t('page.etc.sections.title')}</h2>
              <ul>
                <li>{t('page.etc.sections.learnTarot')}</li>
              </ul>
            </section>
            <section>
              <h2>{t('page.etc.features.title')}</h2>
              <div>
                <h3>{t('page.etc.features.learnTarot.title')}</h3>
                <p>{t('page.etc.features.learnTarot.description')}</p>
              </div>
            </section>
            <section>
              <h2>{t('page.etc.educational.title')}</h2>
              <p>{t('page.etc.educational.description')}</p>
            </section>
          </div>
        </div>
      </Suspense>
    </>
  );
};
export default TarotLearningForm;
