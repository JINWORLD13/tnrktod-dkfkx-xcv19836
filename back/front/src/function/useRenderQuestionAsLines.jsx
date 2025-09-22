import { useTranslation } from 'react-i18next';
import { formattingDate } from './formattingDate';
import { localizeTimeZone } from './localizeTimeZone';
import { getSpreadTitle } from './getSpreadTitle';
export const useRenderQuestionAsLines = (
  questionInfo,
  spreadInfo,
  language,
  timeOfCounselling
) => {
  const { t } = useTranslation();
  const userTimeZone = localizeTimeZone(language);
  let spreadTitle = getSpreadTitle(spreadInfo, language);
  return (
    <>
      <p>
        <strong>
          {language === 'en'
            ? 'Spread Type : '.slice(0, -2).concat(' : ')
            : null}
          {language === 'ko'
            ? '스프레드 종류 : '.slice(0, -2).concat(' : ')
            : null}
          {language === 'ja'
            ? 'スプレッドの種類 : '.slice(0, -2).concat(' : ')
            : null}
        </strong>
        {spreadInfo['spreadTitle'] === undefined ||
        spreadInfo['spreadTitle'] === null ||
        spreadInfo['spreadTitle'] === ''
          ? t(`question.omitted`)
          : spreadTitle}
      </p>
      <p>
        <strong>
          {timeOfCounselling && language === 'en' ? 'Counselling time : ' : ''}
          {timeOfCounselling && language === 'ko' ? '상담 일시 : ' : ''}
          {timeOfCounselling && language === 'ja' ? '相談日時 : ' : ''}
        </strong>
        {timeOfCounselling &&
          formattingDate(timeOfCounselling, language) + `(${userTimeZone})`}
      </p>
      {}
      <p>
        <strong>
          {language === 'en'
            ? `${'Topic(optional) : '.slice(0, -13).concat(' : ')}`
            : null}
          {language === 'ko'
            ? `${'질문 주제(생략 가능) : '.slice(0, -10).concat(' : ')}`
            : null}
          {language === 'ja'
            ? `${'質問のテーマ(省略可) : '.slice(0, -8).concat(' : ')}`
            : null}
        </strong>
        {language === 'en'
          ? questionInfo['question_topic'] === undefined ||
            questionInfo['question_topic'] === null ||
            questionInfo['question_topic'] === ''
            ? 'Omitted'
            : questionInfo['question_topic']
          : null}
        {language === 'ko'
          ? questionInfo['question_topic'] === undefined ||
            questionInfo['question_topic'] === null ||
            questionInfo['question_topic'] === ''
            ? '생략'
            : questionInfo['question_topic']
          : null}
        {language === 'ja'
          ? questionInfo['question_topic'] === undefined ||
            questionInfo['question_topic'] === null ||
            questionInfo['question_topic'] === ''
            ? '省略'
            : questionInfo['question_topic']
          : null}
      </p>
      <p>
        <strong>
          {language === 'en'
            ? `${'Target of Question(optional) : '.slice(0, -13).concat(' : ')}`
            : null}
          {language === 'ko'
            ? `${'질문의 대상(생략 가능) : '.slice(0, -10).concat(' : ')}`
            : null}
          {language === 'ja'
            ? `${'質問の対象(省略可) ： '.slice(0, -8).concat(' : ')}`
            : null}
        </strong>
        {language === 'en'
          ? questionInfo?.subject === undefined ||
            questionInfo?.subject === null ||
            questionInfo?.subject === ''
            ? 'Omitted'
            : questionInfo?.subject
          : null}
        {language === 'ko'
          ? questionInfo?.subject === undefined ||
            questionInfo?.subject === null ||
            questionInfo?.subject === ''
            ? '생략'
            : questionInfo?.subject
          : null}
        {language === 'ja'
          ? questionInfo?.subject === undefined ||
            questionInfo?.subject === null ||
            questionInfo?.subject === ''
            ? '省略'
            : questionInfo?.subject
          : null}
      </p>
      <p>
        <strong>
          {language === 'en'
            ? `${'Related one to the target(optional) : '
                .slice(0, -13)
                .concat(' : ')}`
            : null}
          {language === 'ko'
            ? `${'대상의 상대(생략 가능) : '.slice(0, -10).concat(' : ')}`
            : null}
          {language === 'ja'
            ? `${'対象の相手(省略可) ： '.slice(0, -8).concat(' : ')}`
            : null}
        </strong>
        {language === 'en'
          ? questionInfo?.object === undefined ||
            questionInfo?.object === null ||
            questionInfo?.object === ''
            ? 'Omitted'
            : questionInfo?.object
          : null}
        {language === 'ko'
          ? questionInfo?.object === undefined ||
            questionInfo?.object === null ||
            questionInfo?.object === ''
            ? '생략'
            : questionInfo?.object
          : null}
        {language === 'ja'
          ? questionInfo?.object === undefined ||
            questionInfo?.object === null ||
            questionInfo?.object === ''
            ? '省略'
            : questionInfo?.object
          : null}
      </p>
      <p>
        <strong>
          {language === 'en'
            ? `${'Relationship(optional) : '.slice(0, -13)}`
            : null}
          {language === 'ko' ? `${'관계(생략 가능)'.slice(0, -7)}` : null}
          {language === 'ja' ? `${'関係(省略可)'.slice(0, -5)}` : null}
        </strong>
      </p>
      <p>
        {language === 'en'
          ? `Target: ${
              questionInfo?.relationship_subject || 'Omitted'
            }\n / \nObject(Related one): ${
              questionInfo?.relationship_object || 'Omitted'
            }`
          : null}
        {language === 'ko'
          ? `질문의 대상: ${
              questionInfo?.relationship_subject || '생략'
            }\n / \n대상의 상대: ${questionInfo?.relationship_object || '생략'}`
          : null}
        {language === 'ja'
          ? `質問の対象: ${
              questionInfo?.relationship_subject || '省略'
            }\n / \n対象の相手: ${questionInfo?.relationship_object || '省略'}`
          : null}
      </p>
      <p>
        <strong>
          {spreadInfo?.spreadListNumber !== 201 &&
          spreadInfo?.spreadListNumber !== 304 &&
          language === 'en'
            ? `${'Statement about the Situation(optional) : '
                .slice(0, -13)
                .concat(' : ')}`
            : null}
          {spreadInfo?.spreadListNumber !== 201 &&
          spreadInfo?.spreadListNumber !== 304 &&
          language === 'ko'
            ? `${'질문 내용의 배경(생략 가능) : '.slice(0, -10).concat(' : ')}`
            : null}
          {spreadInfo?.spreadListNumber !== 201 &&
          spreadInfo?.spreadListNumber !== 304 &&
          language === 'ja'
            ? `${'質問内容の背景(省略可) : '.slice(0, -8).concat(' : ')}`
            : null}
        </strong>
        {spreadInfo?.spreadListNumber !== 201 &&
        spreadInfo?.spreadListNumber !== 304 &&
        language === 'en'
          ? questionInfo?.situation === undefined ||
            questionInfo?.situation === null ||
            questionInfo?.situation === ''
            ? 'Omitted'
            : questionInfo?.situation
          : null}
        {spreadInfo?.spreadListNumber !== 201 &&
        spreadInfo?.spreadListNumber !== 304 &&
        language === 'ko'
          ? questionInfo?.situation === undefined ||
            questionInfo?.situation === null ||
            questionInfo?.situation === ''
            ? '생략'
            : questionInfo?.situation
          : null}
        {spreadInfo?.spreadListNumber !== 201 &&
        spreadInfo?.spreadListNumber !== 304 &&
        language === 'ja'
          ? questionInfo?.situation === undefined ||
            questionInfo?.situation === null ||
            questionInfo?.situation === ''
            ? '省略'
            : questionInfo?.situation
          : null}
      </p>
      <p>
        {spreadInfo?.spreadListNumber === 201 && language === 'en'
          ? `Option 1: ${
              questionInfo?.firstOption || 'Omitted'
            }\n / \nOption 2: ${questionInfo?.secondOption || 'Omitted'}`
          : null}
        {spreadInfo?.spreadListNumber === 201 && language === 'ko'
          ? `선택지1: ${questionInfo?.firstOption || '생략'}\n / \n선택지2: ${
              questionInfo?.secondOption || '생략'
            }`
          : null}
        {spreadInfo?.spreadListNumber === 201 && language === 'ja'
          ? `選択肢1: ${questionInfo?.firstOption || '省略'}\n / \n選択肢2: ${
              questionInfo?.secondOption || '省略'
            }`
          : null}
      </p>
      <p>
        {spreadInfo?.spreadListNumber === 304 && language === 'en'
          ? `Option 1: ${
              questionInfo?.firstOption || 'Omitted'
            }\n / \nOption 2: ${
              questionInfo?.secondOption || 'Omitted'
            }\n / \nOption 3: ${questionInfo?.thirdOption || 'Omitted'}`
          : null}
        {spreadInfo?.spreadListNumber === 304 && language === 'ko'
          ? `선택지1: ${questionInfo?.firstOption || '생략'}\n / \n선택지2: ${
              questionInfo?.secondOption || '생략'
            }\n / \n선택지3: ${questionInfo?.thirdOption || '생략'}`
          : null}
        {spreadInfo?.spreadListNumber === 304 && language === 'ja'
          ? `選択肢1: ${questionInfo?.firstOption || '省略'}\n / \n選択肢2: ${
              questionInfo?.secondOption || '省略'
            }\n / \n選択肢3: ${questionInfo?.thirdOption || '省略'}`
          : null}
      </p>
      <p
        style={{
          color: 'purple',
        }}
      >
        <strong>
          {language === 'en' ? `${'Question : '}` : null}
          {language === 'ko' ? `${'질문 : '}` : null}
          {language === 'ja' ? `${'質問 ： '}` : null}
        </strong>
        {language === 'en'
          ? questionInfo?.question === undefined ||
            questionInfo?.question === null ||
            questionInfo?.question === ''
            ? 'Omitted'
            : questionInfo?.question
          : null}
        {language === 'ko'
          ? questionInfo?.question === undefined ||
            questionInfo?.question === null ||
            questionInfo?.question === ''
            ? '생략'
            : questionInfo?.question
          : null}
        {language === 'ja'
          ? questionInfo?.question === undefined ||
            questionInfo?.question === null ||
            questionInfo?.question === ''
            ? '省略'
            : questionInfo?.question
          : null}
      </p>
    </>
  );
};
