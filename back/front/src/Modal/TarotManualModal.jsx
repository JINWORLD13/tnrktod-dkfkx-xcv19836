import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/scss/_TarotManualModal.module.scss';
import useLanguageChange from '../hooks/useEffect/useLanguageChange.jsx';
import { useTranslation } from 'react-i18next';
import Button from '../UI/Button.jsx';
import CancelButton from '../UI/CancelButton.jsx';
import { renderAnswerAsLines } from '../function/renderAnswerAsLines.jsx';
const TarotManualModal = ({ ...props }) => {
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
  const closeTarotManualModal = () => {
    if (
      props?.updateTarotManualModalOpen !== undefined &&
      props?.updateTarotManualModalOpen !== null
    )
      props?.updateTarotManualModalOpen(false);
  };
  const manual = generateManual(browserLanguage);
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
            <h3>{t(`manual_modal.tarot-manual-title`)}</h3>
            {renderAnswerAsLines(manual)}
          </div>
          <footer className={styles['button-box']}>
            <CancelButton
              className={styles['button']}
              onClick={(e = null) => {
                closeTarotManualModal();
              }}
            >
              {t(`button.close`)}
            </CancelButton>
          </footer>
        </div>
      </div>
    </div>
  );
};
export const tarotManualData = {
  ko: [
    '보통모드, 심층모드, 그리고 진지모드 타로 질문 입력창에서 <strong>질문의 주제</strong> 혹은 <strong>질문의 대상</strong>란에 정보를 입력하면 마이페이지에서  질문 주제 혹은 질문의 대상별 <strong>상담 통계 서비스</strong>를 이용하실 수 있으십니다.',
    '질문 입력시, 상세한 답변을 위해 필요한 질문란에 내용을 입력해주세요. 구체적으로 표현하고 입력할수록 정확하고 자세한 답이 나옵니다. 단, 사실에 기반한 내용만 입력해주세요. 추측이나 가정인 경우 이를 명확히 해주세요.',
    '타로는 <strong>사람의 마음</strong>과 <strong>그에 따른 운세</strong>를 읽습니다. 즉, 구체적 사실이나 지적 정보(예: 새로운 연인의 존재, 특정 위치, 정보의 인지 여부 등)가 아닌, <strong>감정과 직관, 내면의 상태와 같은 추상적이고 정서적인 영역(예: A의 B에 대한 마음, 관계의 향후 방향성, 진정성 등)</strong>을 해석하여 결과를 제시합니다. 다만 생각(지적영역)이 마음(감정영역)에서 비롯되는 경우가 있으므로, 진실성(진정성)과 같이 감정과 밀접한 지적 정보도 타로를 통해 물어볼 수 있습니다. 단, 타로는 <strong>평균 70% 정도의 정확도</strong>를 보이므로 전적으로 신뢰할 필요는 없으며, <strong>사람의 마음은 언제든 변할 수 있고 그에 따라 운세도 변할 수 있다</strong>는 점을 유념하시기 바랍니다.',
    '<strong>타로 스프레드</strong>는 카드를 배열하는 방식을 말하며, 각각의 스프레드는 특정한 목적이나 질문에 적합하도록 설계되어 있습니다. 반드시 자신이 원하는 <strong>질문과 부합되는 스프레드</strong>를 골라야만 보다 정확한 답을 얻을 수 있습니다.',
    "타로 리딩은 질문하시는 분과 (상대방이 있는 경우) 그 상대방의 상황을 모두 고려하여 진행됩니다. 같은 카드라도 각자의 상황에 따라 해석이 달라질 수 있기 때문에, 정확한 답변을 위해서는 <strong>구체적인 정보가 필요</strong>합니다. 타로카드는 상징적 의미와 질문의 구체적 내용을 연결하여 해석하므로, <strong>가능한 한 객관적 사실에 기반</strong>하여 질문해 주시기 바랍니다. 특정 인물의 관점에서 보는 상황을 말씀하실 때는, 그것이 그 인물의 입장에서 보는 것임을 밝혀주시고, 확실하지 않은 내용은 추측임을 함께 명시해주시기 바랍니다. 추측을 사실처럼 단정 짓는 것은 피해주세요. 단순히 상대방의 감정이 궁금하실 때는 '어떤 마음인지'만 여쭤보시면 됩니다.",
    '<strong>서로에 대한 마음을 확인하는 경우, 서로 알고 있는 사이</strong>라는 가정하에 해석을 하게 설정되어 있어 모르는 인물을 기입하여도 타로카드 결과 및 답변은 무의미합니다.',
    '<strong>질문은</strong> 한번에 여러개 물어봐도 되지만 되도록 여러개가 아닌 <strong>하나</strong>를 기입해야 구체적으로 답변이 가능합니다. <strong>같은 질문에서 상세적으로 물어보기 위해 관련된 하위 카테고리 질문을 덧붙여도 됩니다</strong>.',
    '보통, 심층, 진지 모드에 따라 타로 해석 결과의 퀄리티(질)가 달라집니다.\n- <strong>보통 타로</strong> : 종합해석만 제공. 정확도 보통. 속마음 관련 질문 시 겉마음 위주로 해석. 답변 소요 시간 평균 5초 이내.\n- <strong>심층 타로</strong> : 종합해석 및 개별해석 제공. 정확도 상. 속마음 관련 질문 시 보통 타로보다 깊은 속마음 위주로 해석. 답변 소요 시간 평균 20초 이내.\n- <strong>진지 타로</strong> : 종합해석 및 개별해석 제공. 심층타로보다 글자수 약 1.5배 이상. 정확도 최상. 속마음 관련 질문 시 심층 타로보다 더 깊은 속마음 위주로 해석 및 속마음을 나레이션으로도 표현. 개별카드에 추가적으로 해석시 사용된 키워드 표시. 답변 소요 시간 평균 1분 20초 이내.',
    '생략 가능한 입력란들에 기입할 내용이 애매할 경우 <strong>생략 가능</strong>하며, 적어도 질문 입력란에는 기입해야 하고 모든 정보를 입력해도 됩니다.',
    '단어는 <strong>특수 그룹 및 모임 내에서 쓰이는 특수 단어가 아닌 최대한 보편적인 단어</strong>야 합니다.',
    '답변에 예 혹은 아니오가 나오거나 아무리 가능성이 높다하더라도 <strong>가능성</strong>일 뿐, 확정적인 답은 아닙니다.',
    '지시 대명사(나, 그녀, 그 등) 같은 것들은 가급적 지양해 인물을 <strong>명시적</strong>으로 제대로 <strong>표기</strong>하면 더 정확한 결과가 나옵니다.',
    '되도록이면, 남친과 같이 <strong>줄임말 및 은어보다는</strong> 남자친구와 같이 <strong>표준어</strong>를 구사하면 더 정확한 결과가 나올 수 있습니다.',
    '<strong>비속어나 매우 선정적인 단어</strong>를 사용하게 되면 필터되어 답변이 무의미 해집니다.',
    '카드가 애매하게 나오는 경우 해석도 애매하게 되므로, <strong>재질문</strong>하시기 권장드립니다.',
    '타로결과에서 시스템 오류로 해석이 애매하게 나오거나 질문에 대한 답이 나오지 않는다면 재질문하시기 권장드립니다.'
  ],
  en: [
    'By entering information in the <strong>question topic</strong> or <strong>question target</strong> fields in the Normal Mode, Deep Mode, and Serious Mode tarot question input windows, you can use the <strong>consultation statistics service</strong> by question topic or question target on My Page.',
    'When entering questions, please fill in the necessary question fields for detailed answers. The more specifically and concretely you express and input, the more accurate and detailed answers you will receive. However, please only enter content based on facts. If it is speculation or assumption, please clarify this clearly.',
    "Tarot reads <strong>a person's heart and the fortune that results from it</strong>. In other words, rather than concrete facts or intellectual information (e.g., existence of a new lover, specific locations, awareness of certain information), it interprets <strong>abstract and emotional realms such as feelings, intuition, and inner states (e.g., A's feelings towards B, future direction of relationships, sincerity)</strong> to present results. However, since thoughts (intellectual realm) can sometimes originate from the heart (emotional realm), intellectual information closely tied to emotions, such as truthfulness(sincerity), can also be inquired about through tarot. Please note that tarot shows <strong>approximately 70% accuracy</strong> on average, so it need not be entirely relied upon, and keep in mind that <strong>people's hearts can change at any time, and accordingly their fortune can also change</strong>.",
    'A <strong>tarot spread</strong> refers to the way cards are arranged, and each spread is designed to suit specific purposes or questions. To obtain more accurate answers, you must choose a <strong>spread that matches your question</strong>.',
    "Tarot reading considers the situation of both the querent and (if applicable) the person they are asking about. Since the same card can be interpreted differently depending on each person's circumstances, <strong>specific information is needed</strong> for accurate readings. As tarot cards are interpreted by connecting their symbolic meanings with the specific details of your question, please <strong>base your questions on objective facts</strong> whenever possible. When describing a situation from someone's perspective, please indicate that it is from his/her point of view, and clearly mark any uncertainties as assumptions. Please avoid stating speculations as facts. If you're simply curious about someone's feelings, you can just ask 'how they feel.'",
    '<strong>When checking mutual feelings, readings are set based on the assumption that the parties know each other</strong>; therefore, readings about unknown individuals will be meaningless.',
    "While you <strong>can ask</strong> multiple questions at once, it's better to ask <strong>one</strong> question at a time for more specific answers. <strong>You may add sub-category questions related to the same topic for more detailed insights</strong>.",
    'The quality of the tarot interpretation results varies depending on the mode - normal, deep, or serious.\n- <strong>Normal Tarot</strong>: Only overall interpretation. Focuses on interpreting surface-level emotions. Average accuracy. Average response time is within 5 seconds.\n- <strong>Deep Tarot</strong>: Overall interpretation and individual interpretation. Focuses on interpreting deeper emotions compared to Normal Tarot. High accuracy. Average response time is within 20 seconds.\n- <strong>Serious Tarot</strong>: Overall interpretation and individual interpretation. About 1.5 times more characters than Deep Tarot. Focuses on interpreting even deeper emotions compared to Deep Tarot, expressing inner thoughts through narration. Additionally, displays key interpretative keywords used for each individual card. Highest accuracy. Average response time is within 1 minute and 20 seconds.',
    'If the content to be filled in the optional input fields is ambiguous, it can be <strong>omitted</strong>, but at least the question input field must be filled in. You can also enter all the information.',
    'Please use <strong>common, universally understood words rather than specialized terms used within specific groups or communities</strong>.',
    'Even if the answer contains "yes" or "no," or no matter how high the likelihood may be, it is only a <strong>possibility</strong> and not a definitive answer.',
    'Avoid demonstrative pronouns such as "I", "she", "it", etc., and <strong>explicitly</strong> and correctly <strong>indicate</strong> the person for more accurate results.',
    'If possible, using <strong>standard language</strong> such as "boy friend" instead of <strong>abbreviations</strong> and <strong>slang</strong> like "bf" may result in more accurate results.',
    'Using <strong>vulgar</strong> or <strong>very sensational</strong> words will be filtered and the answer will become meaningless.',
    'If the cards are ambiguous, the interpretation will also be ambiguous, so it is recommended to <strong>re-ask</strong> the question.',
    'If the interpretation is ambiguous due to a system error in the tarot results or if there is no answer to the question, it is recommended to re-ask the question.',
  ],
  ja: [
    '通常モード、深層モード、そして真剣モードのタロット質問入力欄で<strong>質問の主題</strong>または<strong>質問の対象</strong>欄に情報を入力すると、マイページで質問主題または質問の対象別<strong>相談統計サービス</strong>をご利用いただけます。',
    '質問入力時、詳細な回答のために必要な質問欄に内容を入力してください。具体的に表現して入力するほど、正確で詳しい答えが得られます。ただし、事実に基づく内容のみを入力してください。推測や仮定の場合は、これを明確にしてください。',
    'タロットは<strong>人の心とそれに伴う運勢</strong>を読みます。つまり、具体的な事実や知的情報（例：新しい恋人の存在、特定の場所、情報の認識の有無など）ではなく、<strong>感情と直感、内面の状態といった抽象的で情緒的な領域（例：AのBに対する気持ち、関係の今後の方向性、真摯さなど）</strong>を解釈して結果を提示します。ただし、思考（知的領域）が心（感情領域）から生じる場合があるため、真実性のように感情と密接な知的情報もタロットで尋ねることができます。なお、タロットは<strong>平均70%程度の正確性</strong>を示すため、全面的に信頼する必要はなく、<strong>人の心はいつでも変わり得て、それに伴い運勢も変わり得ること</strong>にご留意ください。',
    '<strong>タロットスプレッド</strong>とは、カードを配置する方法を指し、それぞれのスプレッドは特定の目的や質問に適するよう設計されています。より正確な答えを得るためには、必ず自分が望む<strong>質問に合致するスプレッド</strong>を選ぶ必要があります。',
    'タロットリーディングは、質問される方と（相手がいる場合は）その相手の状況を考慮して進めていきます。同じカードでも、それぞれの状況によって解釈が異なる可能性があるため、正確な答えには<strong>具体的な情報が必要</strong>となります。タロットカードは象徴的な意味と質問の具体的な内容を結びつけて解釈するため、<strong>できるだけ客観的な事実に基づいて</strong>質問してください。特定の人物の視点から見た状況を話される場合は、それがその人物の立場からの見方であることを明らかにし、確実でない内容は推測であることを併せて明示してください。推測を事実のように断定することは避けてください。単に相手の気持ちが知りたい場合は、「どんな気持ちなのか」だけをお尋ねください。',
    '<strong>お互いの気持ちを確認する場合、お互いを知っている間柄</strong>という前提で解釈を行うよう設定されているため、知らない人物を記入しても、タロットカードの結果および回答は無意味となります。',
    '<strong>質問は</strong>一度に複数行っても構いませんが、できるだけ複数ではなく<strong>一つ</strong>を記入することで、具体的な回答が可能となります。<strong>同じ質問についてより詳しく尋ねるため、関連する下位カテゴリーの質問を追加することもできます</strong>。',
    'タロット解釈の結果の質は、通常、深層、真剣のモードによって異なります。\n- <strong>通常のタロット</strong>: 総合的な解釈のみ。正確度は普通。表面的な気持ちを中心に解釈。平均回答時間は5秒以内。\n-<strong> 深層タロット</strong>: 総合解釈と個別解釈あり。正確度は高い。普通のタロットよりも深い内面の気持ちを中心に解釈。回答までの平均時間は20秒以内。\n-<strong> 真剣タロット</strong>: 総合解釈と個別解釈あり。深層タロットより文字数が約1.5倍以上。正確度は最高。深層タロットよりもさらに深い内面の気持ちを中心に解釈し、心の声をナレーション形式でも表現します。また、個々のカードの解釈には、使用された重要なキーワードも追加表示します。平均回答時間は20秒以内。',
    '省略可能な入力欄に記入する内容があいまいな場合は<strong>省略可能</strong>ですが、少なくとも質問入力欄には記入する必要があります。すべての情報を入力することもできます。',
    '言葉は<strong>特別なグループや集まりの中で使用される特殊な用語ではなく、できるだけ一般的な言葉</strong>である必要があります。',
    '回答に「はい」または「いいえ」が出たり、どんなに可能性が高いとしても<strong>可能性</strong>に過ぎず、確定的な答えではありません。',
    '「私」、「彼女」、「それ」などの指示代名詞は避け、人物を<strong>明示的に</strong>正しく<strong>表記</strong>することでより正確な結果が得られます。',
    'できるだけ、「彼ピ」のような<strong>略語やスラングではなく</strong>、「彼氏」のような<strong>標準語</strong>を使用することで、より正確な結果が得られる可能性があります。',
    '<strong>卑語</strong>や<strong>非常に扇情的な単語</strong>を使用すると、フィルターにかかり、回答が無意味になります。',
    'カードがあいまいな場合、解釈もあいまいになるため、<strong>再質問</strong>をお勧めします。',
    'タロット結果でシステムエラーにより解釈があいまいになったり、質問に対する答えが出なかったりする場合は、再質問をお勧めします。',
  ],
};
export const generateManual = language => {
  const manualItems = tarotManualData[language] || tarotManualData.ko;
  return manualItems
    .map((content, index) => `\n*\n  ${index + 1}. ${content}`)
    .join('');
};
export default TarotManualModal;
