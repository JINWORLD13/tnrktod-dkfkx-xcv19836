import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/scss/_TarotQuestionInstructionModal.module.scss';
import useLanguageChange from '../Hooks/useEffect/useLanguageChange.jsx';
import { useTranslation } from 'react-i18next';
import Button from '../UI/Button.jsx';
import CancelButton from '../UI/CancelButton.jsx';
import { renderAnswerAsLines } from '../Function/renderAnswerAsLines.jsx';
const TarotQuestionInstructionModal = ({ ...props }) => {
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
      props?.setInstructionOpen !== undefined &&
      props?.setInstructionOpen !== null
    )
      props?.setInstructionOpen(false);
  };
  const manualForKorean = props => {
    if (props?.questionKind === 1) {
      return `\n
      1. 질문의 핵심입니다. 질문의 주제를 넣어주세요. 질문의 주제에 기입하면 마이페이지에서 주제별로 카테고리화 한 타로카드 상담 통계 서비스를 이용하실 수 있습니다.\n*
      예) 그의 마음, 그가 진실을 말하는지, 그녀에 대한 그의 마음 등.\n
      \n*
      ※ 질문자는 당신입니다. 질문자는 질문의 대상(질문에서 궁금한 사람 혹은 물건) 혹은 그 대상의 상대(질문의 대상에게 있어 관련이 있거나 상대가 되는 사람 혹은 물건)도 될 수 있고 이들과는 별개의 존재로 있을 수 있습니다.\n*
      -> 상세 입력 모드 질문 입력란 예시\n
      1) 질문 주제 : 나의 적성\n
      2) 질문의 대상 : 나\n
      3) 대상의 상대 : (생략)\n
      4) 관계 : (생략)(질문의 대상) / (생략)(대상의 상대)\n
      5) 배경 : 나는 진로를 정해야 한다.\n
      6) 질문 : 나의 적성은 뭔가? 나에게 추천되는 직업은?\n
      `;
    } else if (props?.questionKind === 2) {
      return `\n
      1. 질문에서 묻고자 하는 사람 혹은 물건입니다. 자기 자신 또는 누구든 상관 없습니다. 만일, 대상의 상대도 기입하려면 질문의 대상은 그 상대와 최소한의 일면식이 있는 관계여야 합니다. 모르는 사람이 나에게 어떤 마음인지 물어도 답변은 의미가 없습니다. 질문의 대상에 기입하면 마이페이지에서 대상별로 카테고리화 한 타로카드 상담 통계 서비스를 이용하실 수 있습니다.\n*
      예) 그, 그녀, 나, 상사, 선생님, 유명인, 동규(사람 이름), 물건 등.\n
      \n*
      ※ 질문자는 당신입니다. 질문자는 질문의 대상(질문에서 궁금한 사람 혹은 물건) 혹은 그 대상의 상대(질문의 대상에게 있어 관련이 있거나 상대가 되는 사람 혹은 물건)도 될 수 있고 이들과는 별개의 존재로 있을 수 있습니다.\n*
      -> 상세 입력 모드 질문 입력란 예시\n
      1) 질문 주제 : 점원의 의도\n
      2) 질문의 대상 : 그 점원\n
      3) 대상의 상대 : 나\n
      4) 관계 : 음식점 점원(질문의 대상) / 손님(대상의 상대)\n
      5) 배경 : 조금 집중해서 시간 가는 줄 모르고 업무를 보는데 음식점 직원이 와서 물을 따라줬다.\n
      6) 질문 : 그 음식점 직원은 혹시 추가 주문 여부를 묻고 싶어서 물을 리필한건가?\n
      `;
    } else if (props?.questionKind === 3) {
      return `\n
      1. 질문에서 묻고자 하는 사람 혹은 물건의 대상이 되는 혹은 관련이 있는 존재입니다. 자기 자신 또는 누구든 상관 없습니다. 대신, 대상의 상대는 질문의 대상과 최소한의 일면식이 있는 혹은 관련 있는 관계여야 합니다. 어떤 이가 모르는 사람에게 어떤 마음인지 물어도 답변은 의미가 없습니다.\n*
      예) 그, 그녀, 나, 상사, 선생님, 유명인, 소희(사람 이름), 물건 등.\n
      \n*
      ※ 질문자는 당신입니다. 질문자는 질문의 대상(질문에서 궁금한 사람 혹은 물건) 혹은 그 대상의 상대(질문의 대상에게 있어 관련이 있거나 상대가 되는 사람 혹은 물건)도 될 수 있고 이들과는 별개의 존재로 있을 수 있습니다.\n*
      -> 상세 입력 모드 질문 입력란 예시\n
      1) 질문 주제 : 그의 진실성(거짓말 여부)\n
      2) 질문의 대상 : 그\n
      3) 대상의 상대 : 그녀\n
      4) 관계 : 친구(질문의 대상) / 친구(대상의 상대)\n
      5) 배경 : (생략)\n
      6) 질문 : 그녀에게 한 그의 말은 진실성이 얼마나 되나? 거짓말인가?\n
      `;
    } else if (props?.questionKind === 4) {
      return `\n
      1. 질문의 대상과 대상의 상대의 관계입니다. 질문의 대상란에는 대상의 상대에게 있어서 어떤 관계나 어떤 존재인지 기입하면 됩니다. 대상의 상대 또한 질문의 대상에게 있어서 어떤 관계나 어떤 존재인지 기입하면 됩니다.\n*
      예) 남자친구와 여자친구, 선생님과 제자, 상사와 부하직원, 친구와 친구, 지인과 지인, 연예인과 팬, 인플루엔서와 일반 시청자 등.\n
      \n*
      ※ 질문자는 당신입니다. 질문자는 질문의 대상(질문에서 궁금한 사람 혹은 물건) 혹은 그 대상의 상대(질문의 대상에게 있어 관련이 있거나 상대가 되는 사람 혹은 물건)도 될 수 있고 이들과는 별개의 존재로 있을 수 있습니다.\n*
      -> 상세 입력 모드 질문 입력란 예시\n
      1) 질문 주제 : 그의 나에 대한 이성적 관심\n
      2) 질문의 대상 : 그\n
      3) 대상의 상대 : 나\n
      4) 관계 : 같은 회사 직원(질문의 대상) / 같은 회사 직원(대상의 상대)\n
      5) 배경 : 그는 오늘 유난히 나에게 관심을 보인 거 같다.\n
      6) 질문 : 그는 나에 대한 마음이 뭘까? 나에게 이성적 관심이 있는 건가?\n
      `;
    } else if (props?.questionKind === 5) {
      return `\n
      1. 질문의 배경이 되는 상황을 설명해주세요. 질문과 관련된 당사자(질문의 대상), 관계자(대상의 상대), 또는 주변 상황(제 3자 혹은 주변) 등을 자유롭게 기술하시면 됩니다.\n*
      예) 그는 나와 오랫동안 알고 지내온 사이이다. 이번에 ~한 일이 있었다.\n
      \n*
      ※ 질문자는 당신입니다. 질문자는 질문의 대상(질문에서 궁금한 사람 혹은 물건) 혹은 그 대상의 상대(질문의 대상에게 있어 관련이 있거나 상대가 되는 사람 혹은 물건)도 될 수 있고 이들과는 별개의 존재로 있을 수 있습니다.\n*
      -> 상세 입력 모드 질문 입력란 예시\n
      1) 질문 주제 : 김부장님의 마음\n
      2) 질문의 대상 : 김부장님\n
      3) 대상의 상대 : 나\n
      4) 관계 : 상사(질문의 대상) / 부하직원(대상의 상대)\n
      5) 배경 : 오늘 ~한 상황에서 ~한 문제가 발생했다. 부장님의 모습이 불편해하는 거 같았다(내가 보는 시야에서는 그래 보였다).\n
      6) 질문 : 부장님은 혹시 어떤 마음인가? 추가적으로 나에 대한 마음은?\n
      `;
    } else if (props?.questionKind === 6) {
      return `\n
      1. 가장 핵심이 되는 질문란입니다. 되도록 생략하지 말고 자세하고 간결하게 적어주세요.\n*
      예) 나에 대한 그의 마음은?, 나의 오늘 운세는?, 그가 이번 일은 자신의 잘못이라고 생각하나?, 나의 마음은?, 그 사람이 이번 사태에 대해 느끼는 마음은?, 그는 이번 시합에서 이길 수 있을 거라 보나?.\n
      \n*
      ※ 질문자는 당신입니다. 질문자는 질문의 대상(질문에서 궁금한 사람 혹은 물건) 혹은 그 대상의 상대(질문의 대상에게 있어 관련이 있거나 상대가 되는 사람 혹은 물건)도 될 수 있고 이들과는 별개의 존재로 있을 수 있습니다.\n*
      -> 상세 입력 모드 질문 입력란 예시\n
      1) 질문 주제 : 그녀에 대한 그의 마음\n
      2) 질문의 대상 : 그\n
      3) 대상의 상대 : 그녀\n
      4) 관계 : 소개팅한 남자(질문의 대상) / 소개팅한 여자(대상의 상대)\n
      5) 배경 : 오늘 그와 그녀는 소개팅을 가졌다.\n
      6) 질문 : 그녀는 그에게 어떤 마음이냐?\n
      `;
    } else if (props?.questionKind === 7) {
      return `\n
      1. 여러개의 선택지 중 첫번째 선택지를 설정합니다.\n*
      예) (A, B를 고르는 것 중) 선택지1을 A로 설정합니다.(B는 선택지2에 설정하시면 됩니다.)\n
      \n*
      ※ 질문자는 당신입니다. 질문자는 질문의 대상(질문에서 궁금한 사람 혹은 물건) 혹은 그 대상의 상대(질문의 대상에게 있어 관련이 있거나 상대가 되는 사람 혹은 물건)도 될 수 있고 이들과는 별개의 존재로 있을 수 있습니다.\n*
      -> 상세 입력 모드 질문 입력란 예시\n
      1) 질문 주제 : A와 B 중 그의 진심\n
      2) 질문의 대상 : 그\n
      3) 대상의 상대 : (생략)\n
      4) 관계 : 생략(질문의 대상) / 생략(대상의 상대)\n
      5) 선택지1 : A, 선택지2 : B\n
      6) 질문 : 그가 왜 그런 말을 했는지 궁금한데 그는 A와 B 중 어느 의도로 말한걸까?\n
      `;
    } else if (props?.questionKind === 8) {
      return `\n
      1. 여러개의 선택지 중 두번째 선택지를 설정합니다.\n*
      예) (A, B를 고르는 것 중) 선택지2를 B로 설정합니다.(A는 선택지1에 설정하시면 됩니다.)\n
      \n*
      ※ 질문자는 당신입니다. 질문자는 질문의 대상(질문에서 궁금한 사람 혹은 물건) 혹은 그 대상의 상대(질문의 대상에게 있어 관련이 있거나 상대가 되는 사람 혹은 물건)도 될 수 있고 이들과는 별개의 존재로 있을 수 있습니다.\n*
      -> 상세 입력 모드 질문 입력란 예시\n
      1) 질문 주제 : 나의 적성\n
      2) 질문의 대상 : 나\n
      3) 대상의 상대 : (생략)\n
      4) 관계 : 생략(질문의 대상) / 생략(대상의 상대)\n
      5) 선택지1 : A, 선택지2 : B\n
      6) 질문 : 나는 진로를 선택해야 하는데 ~을 위해 A와 B 중 어느걸 고르는게 나을까?\n
      `;
    } else if (props?.questionKind === 9) {
      return `\n
      1. 여러개의 선택지 중 세번째 선택지를 설정합니다.\n*
      예) (A, B, C를 고르는 것 중) 선택지3을 C로 설정합니다.(A는 선택지1에, B는 선택지2에 설정하시면 됩니다.)\n
      \n*
      ※ 질문자는 당신입니다. 질문자는 질문의 대상(질문에서 궁금한 사람 혹은 물건) 혹은 그 대상의 상대(질문의 대상에게 있어 관련이 있거나 상대가 되는 사람 혹은 물건)도 될 수 있고 이들과는 별개의 존재로 있을 수 있습니다.\n*
      -> 상세 입력 모드 질문 입력란 예시\n
      1) 질문 주제 : 나의 미래  \n
      2) 질문의 대상 : 나\n
      3) 대상의 상대 : (생략)\n
      4) 관계 : 생략(질문의 대상) / 생략(대상의 상대)\n
      5) 선택지1 : A, 선택지2 : B, 선택지3 : C\n
      6) 질문 : 나는 미래를 위해 A, B, C 중 어느걸 하는게 나을까?\n
      `;
    }
  };
  const manualForJapanese = props => {
    if (props?.questionKind === 1) {
      return `\n
      1. 質問の核心です。質問のテーマを入力してください。質問のテーマを記入すると、マイページでテーマ別に分類された占いカード相談の統計サービスをご利用いただけます。\n*
      例）彼の気持ち、彼が真実を話しているか、彼女に対する彼の気持ちなど。\n
      \n*
      ※ 質問者はあなたです。質問者は質問の対象（質問で気になる人やもの）または対象の相対（質問の対象に関連があるまたは相対となる人やもの）になることもでき、これらとは別の存在であることもできます。\n*
      -> 詳細入力モード質問入力例\n
      1) テーマ：私の適性\n
      2) 質問の対象：私\n
      3) 対象の相対：（省略）\n
      4) 関係：（省略）(質問の対象) / （省略）(対象の相対)\n
      5) 質問内容の背景：私は進路を決めなければならない。\n
      6) 質問：私の適性は何か？私に推奨される職業は？\n
      `;
    } else if (props?.questionKind === 2) {
      return `\n
      1. 質問で聞きたい人やものです。自分自身または誰でも構いません。対象の相対も記入する場合は、質問の対象はその相対と最低限の面識がある関係でなければなりません。知らない人が私にどんな気持ちかを聞いても回答は意味がありません。質問の対象を記入すると、マイページで対象者別に分類された占いカード相談の統計サービスをご利用いただけます。\n*
      例）彼、彼女、私、上司、先生、有名人、健一（人名）、物など。\n
      \n*
      ※ 質問者はあなたです。質問者は質問の対象（質問で気になる人やもの）または対象の相対（質問の対象に関連があるまたは相対となる人やもの）になることもでき、これらとは別の存在であることもできます。\n*
      -> 詳細入力モード質問入力例\n
      1) テーマ：店員の意図\n
      2) 質問の対象：その店員\n
      3) 対象の相対：私\n
      4) 関係：飲食店店員(質問の対象) / お客様(対象の相対)\n
      5) 質問内容の背景：少し集中して時間を忘れて仕事をしていたら、飲食店の店員が来て水を注いでくれた。\n
      6) 質問：その飲食店の店員は追加注文を聞きたくて水を補充したのか？\n
      `;
    } else if (props?.questionKind === 3) {
      return `\n
      1. 質問で聞きたい人やものの対象となるまたは関連がある存在です。自分自身または誰でも構いません。ただし、対象の相対は質問の対象と最低限の面識があるまたは関連がある関係でなければなりません。ある人が知らない人にどんな気持ちかを聞いても回答は意味がありません。\n*
      例）彼、彼女、私、上司、先生、有名人、美咲（人名）、物など。\n
      \n*
      ※ 質問者はあなたです。質問者は質問の対象（質問で気になる人やもの）または対象の相対（質問の対象に関連があるまたは相対となる人やもの）になることもでき、これらとは別の存在であることもできます。\n*
      -> 詳細入力モード質問入力例\n
      1) テーマ：彼の真実性（嘘かどうか）\n
      2) 質問の対象：彼\n
      3) 対象の相対：彼女\n
      4) 関係：友達(質問の対象) / 友達(対象の相対)\n
      5) 質問内容の背景：（省略）\n
      6) 質問：彼女に言った彼の言葉はどれだけ真実性があるのか？嘘なのか？\n
      `;
    } else if (props?.questionKind === 4) {
      return `\n
      1. 質問の対象と対象の相対の関係です。質問の対象欄には対象の相対にとってどのような関係やどのような存在なのかを記入してください。対象の相対も質問の対象にとってどのような関係やどのような存在なのかを記入してください。\n*
      例）彼氏と彼女、先生と生徒、上司と部下、友達と友達、知人と知人、芸能人とファン、インフルエンサーと一般視聴者など。\n
      \n*
      ※ 質問者はあなたです。質問者は質問の対象（質問で気になる人やもの）または対象の相対（質問の対象に関連があるまたは相対となる人やもの）になることもでき、これらとは別の存在であることもできます。\n*
      -> 詳細入力モード質問入力例\n
      1) テーマ：彼の私に対する恋愛的関心\n
      2) 質問の対象：彼\n
      3) 対象の相対：私\n
      4) 関係：同じ会社の社員(質問の対象) / 同じ会社の社員(対象の相対)\n
      5) 質問内容の背景：彼は今日特に私に関心を示しているようだ。\n
      6) 質問：彼の私に対する気持ちは何だろう？私に恋愛的関心があるのか？\n
      `;
    } else if (props?.questionKind === 5) {
      return `\n
      1. 質問の背景となる状況を説明してください。質問に関連する当事者（質問の対象）、関係者（対象の相対）、または周辺状況（第三者または周辺）などを自由に記述してください。\n*
      例）彼は私と長い間知り合いである。今回～なことがあった。\n
      \n*
      ※ 質問者はあなたです。質問者は質問の対象（質問で気になる人やもの）または対象の相対（質問の対象に関連があるまたは相対となる人やもの）になることもでき、これらとは別の存在であることもできます。\n*
      -> 詳細入力モード質問入力例\n
      1) テーマ：田中部長の気持ち\n
      2) 質問の対象：田中部長\n
      3) 対象の相対：私\n
      4) 関係：上司(質問の対象) / 部下(対象の相対)\n
      5) 質問内容の背景：今日～な状況で～な問題が発生した。部長の様子が不快そうだった（私の視点からはそう見えた）。\n
      6) 質問：部長はどんな気持ちなのか？さらに私に対する気持ちは？\n
      `;
    } else if (props?.questionKind === 6) {
      return `\n
      1. 最も核心となる質問欄です。できるだけ省略せずに詳しく簡潔に書いてください。\n*
      例）私に対する彼の気持ちは？、私の今日の運勢は？、彼は今回の件は自分の過ちだと思っているのか？、私の気持ちは？、その人は今回の事態についてどう感じているのか？、彼は今回の試合で勝てると思うか？\n
      \n*
      ※ 質問者はあなたです。質問者は質問の対象（質問で気になる人やもの）または対象の相対（質問の対象に関連があるまたは相対となる人やもの）になることもでき、これらとは別の存在であることもできます。\n*
      -> 詳細入力モード質問入力例\n
      1) テーマ：彼女に対する彼の気持ち\n
      2) 質問の対象：彼\n
      3) 対象の相対：彼女\n
      4) 関係：お見合いした男性(質問の対象) / お見合いした女性(対象の相対)\n
      5) 質問内容の背景：今日彼と彼女はお見合いに行った。\n
      6) 質問：彼女は彼にとってどんな気持ちなのか？\n
      `;
    } else if (props?.questionKind === 7) {
      return `\n
      1. 複数の選択肢の中から最初の選択肢を設定します。\n*
      例) (AとBの中で)選択肢1をAに設定します。(Bは選択肢2に設定します。)\n
      \n*
      ※質問者はあなたです。質問者は質問の対象(質問で知りたい人物や物)またはその対象の相手(質問の対象にとって関係のある人物や物)である場合もあります。また、これらとは別の存在でいることもできます。\n*
      -> 詳細入力モードの質問入力欄例\n
      1) 質問テーマ : AとBの中で彼の本心\n
      2) 質問の対象 : 彼\n
      3) 対象の相手 : (省略)\n
      4) 関係 : 省略(質問の対象) / 省略(対象の相手)\n
      5) 選択肢1 : A、選択肢2 : B\n
      6) 質問 : 彼がなぜそのようなことを言ったのか気になるけど、彼はAとBの中でどちらの意図で言ったのだろうか？\n
      `;
    } else if (props?.questionKind === 8) {
      return `\n
      1. 複数の選択肢の中から2番目の選択肢を設定します。\n*
      例) (AとBの中で)選択肢2をBに設定します。(Aは選択肢1に設定します。)\n
      \n*
      ※質問者はあなたです。質問者は質問の対象(質問で知りたい人物や物)またはその対象の相手(質問の対象にとって関係のある人物や物)である場合もあります。また、これらとは別の存在でいることもできます。\n*
      -> 詳細入力モードの質問入力欄例\n
      1) 質問テーマ : 自分の適性\n
      2) 質問の対象 : 自分\n
      3) 対象の相手 : (省略)\n
      4) 関係 : 省略(質問の対象) / 省略(対象の相手)\n
      5) 選択肢1 : A、選択肢2 : B\n
      6) 質問 : 進路を選ばなければならないが、AとBの中でどちらを選ぶべきか？\n
      `;
    } else if (props?.questionKind === 9) {
      return `\n
      1. 複数の選択肢の中から3番目の選択肢を設定します。\n*
      例) (A、B、Cの中から)選択肢3をCに設定します。(Aは選択肢1に、Bは選択肢2に設定してください。)\n
      \n*
      ※ 質問者はあなたです。質問者は質問の対象(質問で知りたい人やもの)またはその対象の相手(質問の対象に関連があるか相手となる人やもの)にもなれますし、これらとは別の存在としていることもできます。\n*
      -> 詳細入力モード質問入力例\n
      1) 質問テーマ：私の未来\n
      2) 質問の対象：私\n
      3) 対象の相手：(省略)\n
      4) 関係：省略(質問の対象)/ 省略(対象の相手)\n
      5) 選択肢1 : A、選択肢2 : B、選択肢3 : C\n
      6) 質問 : 私は未来のためにA、B、Cのどれをするのが良いでしょうか?\n
      `;
    }
  };
  const manualForEnglish = props => {
    if (props?.questionKind === 1) {
      return `\n
      1. This is the core of your question. Please enter the topic. When you enter your question topic, you can access statistical tarot consultation services categorized by topic in your My Page.\n*
      Example) His feelings, whether he's telling the truth, his feelings towards her, etc.\n
      \n*
      ※ You are the questioner. You can be the Target (person or object you're curious about), the Related one (person or object related to the Target), or a separate entity.\n*
      -> Detailed Input Mode Example\n
      1) Topic: My aptitude\n
      2) Target: I\n
      3) Related one: (omitted)\n
      4) Relationship: (omitted)(Target) / (omitted)(Related one)\n
      5) Situation: I need to decide on my career path.\n
      6) Question: What is my aptitude? What careers are recommended for me?\n
      `;
    } else if (props?.questionKind === 2) {
      return `\n
      1. This is the person or object you want to ask about. It can be yourself or anyone else. If you want to include a Related one, the Target must have at least a minimal acquaintance with them. There's no meaning in asking about the feelings of someone who doesn't know you. When you enter your question target, you can access statistical tarot consultation services categorized by target in your My Page.\n*
      Example) He, she, me, boss, teacher, celebrity, Michael(person's name), object, etc.\n
      \n*
      ※ You are the questioner. You can be the Target (person or object you're curious about), the Related one (person or object related to the Target), or a separate entity.\n*
      -> Detailed Input Mode Example\n
      1) Topic: Server's intention\n
      2) Target: That server\n
      3) Related one: Me\n
      4) Relationship: Restaurant server(Target) / Customer(Related one)\n
      5) Situation: While I was focused on work, losing track of time, the restaurant employee came and refilled my water.\n
      6) Question: Did the restaurant employee refill my water because they wanted to ask about additional orders?\n
      `;
    } else if (props?.questionKind === 3) {
      return `\n
      1. This is the person or object related to the Target you're asking about. It can be yourself or anyone else. However, the Related one must have at least a minimal acquaintance or connection with the Target. There's no meaning in asking about feelings between people who don't know each other.\n*
      Example) Him, her, me, boss, teacher, celebrity, Jane(person's name), object, etc.\n
      \n*
      ※ You are the questioner. You can be the Target (person or object you're curious about), the Related one (person or object related to the Target), or a separate entity.\n*
      -> Detailed Input Mode Example\n
      1) Topic: His truthfulness (whether he's lying)\n
      2) Target: He\n
      3) Related one: Her\n
      4) Relationship: Friend(Target) / Friend(Related one)\n
      5) Situation: (omitted)\n
      6) Question: How truthful was what he said to her? Was it a lie?\n
      `;
    } else if (props?.questionKind === 4) {
      return `\n
      1. This describes the relationship between the Target and Related one. For the Target field, enter what relationship or role the Target has to the Related one. Similarly, for the Related one field, enter what relationship or role the Related one has to the Target.\n*
      Example) Boyfriend and girlfriend, teacher and student, boss and employee, friend and friend, acquaintance and acquaintance, celebrity and fan, influencer and general viewer, etc.\n
      \n*
      ※ You are the questioner. You can be the Target (person or object you're curious about), the Related one (person or object related to the Target), or a separate entity.\n*
      -> Detailed Input Mode Example\n
      1) Topic: His romantic interest in me\n
      2) Target: He\n
      3) Related one: Me\n
      4) Relationship: Coworker(Target) / Coworker(Related one)\n
      5) Situation: He seemed particularly interested in me today.\n
      6) Question: What are his feelings towards me? Does he have romantic interest in me?\n
      `;
    } else if (props?.questionKind === 5) {
      return `\n
      1. Please explain the background situation of your question. You can freely describe the involved one (Target), related one (Related one), or surrounding circumstances (third parties or environment).\n*
      Example) He and I have known each other for a long time. This time, ~happened.\n
      \n*
      ※ You are the questioner. You can be the Target (person or object you're curious about), the Related one (person or object related to the Target), or a separate entity.\n*
      -> Detailed Input Mode Example\n
      1) Topic: Michael's feelings\n
      2) Target: Michael\n
      3) Related one: Me\n
      4) Relationship: Boss(Target) / Subordinate(Related one)\n
      5) Situation: Today in the situation where ~, problem that ~ occurred. The Michael seemed uncomfortable (from my perspective).\n
      6) Question: What might be the Michael's feelings? Additionally, what is his feelings towards me?\n
      `;
    } else if (props?.questionKind === 6) {
      return `\n
      1. This is the most crucial question field. Please write it in detail and concisely without omitting information.\n*
      Example) What are his feelings towards me?, What's my fortune today?, Does he think this incident was his fault?, What are my feelings?, How does that person feel about this situation?, Do you think he can win this match?\n
      \n*
      ※ You are the questioner. You can be the Target (person or object you're curious about), the Related one (person or object related to the Target), or a separate entity.\n*
      -> Detailed Input Mode Example\n
      1) Topic: His feelings towards her\n
      2) Target: He\n
      3) Related one: Her\n
      4) Relationship: Blind date man(Target) / Blind date woman(Related one)\n
      5) Situation: Today he and she went on a blind date.\n
      6) Question: What are his feelings towards her?\n
      `;
    } else if (props?.questionKind === 7) {
      return `\n
      1. Set the first option from multiple choices.\n*
      Example: (Choose option 1 from A and B) Set A as option 1. (Set B as option 2.)\n
      \n*
      ※ The questioner is you. The questioner can be the subject of the question (the person or thing you are curious about) or the counterpart of the subject (someone or something related to the subject). The questioner can also exist as a separate entity from these.\n*
      -> Example of question input fields in detail mode\n
      1) Question topic: His true intentions between A and B\n
      2) Subject of the question: Him\n
      3) Counterpart of the subject: (Omitted)\n
      4) Relationship: Omitted (subject) / Omitted (counterpart)\n
      5) Option 1: A, Option 2: B\n
      6) Question: I wonder why he said that, but which intention did he mean when he said it, A or B?\n
      `;
    } else if (props?.questionKind === 8) {
      return `\n
      1. Set the second option from multiple choices.\n*
      Example: (Choose option 2 from A and B) Set B as option 2. (Set A as option 1.)\n
      \n*
      ※ The questioner is you. The questioner can be the subject of the question (the person or thing you are curious about) or the counterpart of the subject (someone or something related to the subject). The questioner can also exist as a separate entity from these.\n*
      -> Example of question input fields in detail mode\n
      1) Question topic: My aptitude\n
      2) Subject of the question: Myself\n
      3) Counterpart of the subject: (Omitted)\n
      4) Relationship: Omitted (subject) / Omitted (counterpart)\n
      5) Option 1: A, Option 2: B\n
      6) Question: I need to choose a career path, but which one should I choose between A and B?\n
      `;
    } else if (props?.questionKind === 9) {
      return `\n
      1. Set the third option among multiple choices.\n*
      Example) (When choosing from A, B, C) set option 3 as C. (Set A as option 1 and B as option 2.)\n
      \n*
      ※ You are the questioner. The questioner can be the subject of the question (the person or thing you're curious about) or their counterpart (person or thing related to or corresponding to the subject), or can exist as a separate entity from these.\n*
      -> Detailed Input Mode Question Entry Example\n
      1) Question Topic: My Future\n
      2) Subject of Question: Me\n
      3) Subject's Counterpart: (Omitted)\n
      4) Relationship: Omitted(Question Subject) / Omitted(Subject's Counterpart)\n
      5) Option 1: A, Option 2: B, Option 3: C\n
      6) Question: Which among A, B, C should I do for my future?\n
      `;
    }
  };
  let manual;
  switch (browserLanguage) {
    case 'ko':
      manual = manualForKorean(props);
      break;
    case 'en':
      manual = manualForEnglish(props);
      break;
    case 'ja':
      manual = manualForJapanese(props);
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
            <h3>{t(`manual_modal.tarot-question-instruction-title`)}</h3>
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
        {}
      </div>
    </div>
  );
};
export default TarotQuestionInstructionModal;
