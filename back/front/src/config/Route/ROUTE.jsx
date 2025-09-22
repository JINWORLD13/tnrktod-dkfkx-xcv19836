import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  ETC_PATH,
  HOME_PATH,
  LOGOUT_PATH,
  MORE_BUSINESS_INFO_PATH,
  MYPAGE_CHART_PATH,
  MYPAGE_MAIN_PATH,
  MYPAGE_SUBJECTCHART_PATH,
  MYPAGE_QUESTION_TOPIC_CHART_PATH,
  MORE_TERMS_OF_SERVICE_PATH,
  MYPAGE_THEMECHART_CAREER_PATH,
  MYPAGE_THEMECHART_DECISION_MAKING_PATH,
  MYPAGE_THEMECHART_FINANCE_PATH,
  MYPAGE_THEMECHART_INNER_FEELING_PATH,
  MYPAGE_THEMECHART_LOVE_PATH,
  MYPAGE_THEMECHART_OCCUPATION_PATH,
  MYPAGE_THEMECHART_PATH,
  MYPAGE_THEMECHART_RELATIONSHIP_PATH,
  MYPAGE_TOTALCHART_PATH,
  MYPAGE_USERINFO_CHANGE_PATH,
  MYPAGE_USERINFO_WITHDRAW_PATH,
  TAROT_CARDTABLE_PATH,
  TAROT_PRINCIPLE_PATH,
  MYPAGE_READINGINFO_PATH,
  MYPAGE_REFUND_PATH,
  TAROT_EXPLANATION_PATH,
  TAROT_LEARNING_PATH,
} from './UrlPaths.jsx';
import App from '../../App.jsx';
import Home from '../../page/Home/Home.jsx';
import TarotCardPrincipleForm from '../../page/TarotCardForm/TarotCardPrincipleForm.jsx';
import MyPageForm from '../../page/MyPage/MyPageForm.jsx';
import TossSuccessPage from '../../page/Charge/TossSuccessPage.jsx';
import TossFailPage from '../../page/Charge/TossFailPage.jsx';
import ETCForm from '../../page/MyPage/ETCForm.jsx';
import ErrorPage from '../../page/ErrorPage/ErrorPage.jsx';
import UserVoucherRefundPage from '../../page/MyPage/UserVoucherRefundPage.jsx';
import TarotExplanationForm from '../../page/TarotCardForm/TarotExplanationForm.jsx';
import TarotSectionForm from '../../page/MyPage/TarotSectionForm.jsx';
import { useEffect, useState } from 'react';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import MyPagePage from '../../page/MyPage/MyPagePage.jsx';
import SpreadModal from '../../Modal/SpreadModal/SpreadModal.jsx';
export const LanguageRedirect = () => {
  const browserLanguage = useLanguageChange();
  return <Navigate to={`/${browserLanguage}`} replace />;
};
export const LanguageAwareApp = () => {
  const browserLanguage = useLanguageChange(); 
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const { lang: currentLang } = useParams(); 
  useEffect(() => {
    if (
      location.pathname.match(
        /\.(xml|txt|json|ico|jpg|jpeg|png|gif|webp|svg|ttf|woff|woff2|eot|bin|gltf|html|css|js)$/
      )
    )
      return;
    let newPath;
    const search = location.search; 
    if (['en', 'ko', 'ja'].includes(location.pathname.slice(1, 3))) {
      if (browserLanguage && browserLanguage !== currentLang.slice(0, 2)) {
        newPath = `/${browserLanguage}${location.pathname.replace(
          /^\/[^/]+/,
          ''
        )}${search}`;
      } else {
        newPath = `${location.pathname}${search}`;
      }
    } else {
      newPath = `/${browserLanguage}${location.pathname}${search}`;
    }
    navigate(newPath, { replace: true });
  }, [browserLanguage, currentLang, location.pathname, location.search]);
  return <App />;
};
export const router = createBrowserRouter([
  {
    path: '/',
    element: <LanguageRedirect />,
  },
  {
    path: '/:lang',
    element: <LanguageAwareApp />,
    errorElement: <ErrorPage />, 
    children: [
      {
        index: true, 
        element: <Home />,
      },
      {
        path: TAROT_PRINCIPLE_PATH,
        element: <TarotCardPrincipleForm />,
      },
      {
        path: LOGOUT_PATH,
        element: null,
      },
      { path: 'toss/success', element: <TossSuccessPage /> },
      { path: 'toss/fail', element: <TossFailPage /> },
      {
        path: MYPAGE_REFUND_PATH,
        element: <UserVoucherRefundPage />,
      },
      {
        path: MYPAGE_MAIN_PATH,
        element: <MyPageForm />,
        children: [
          {
            path: MYPAGE_READINGINFO_PATH,
            element: <MyPageForm />,
          },
          {
            path: MYPAGE_CHART_PATH,
            element: <MyPageForm />,
            children: [
              {
                path: MYPAGE_TOTALCHART_PATH,
                element: <MyPageForm />,
              },
              {
                path: MYPAGE_SUBJECTCHART_PATH,
                element: <MyPageForm />,
              },
              {
                path: MYPAGE_QUESTION_TOPIC_CHART_PATH,
                element: <MyPageForm />,
              },
            ],
          },
          {
            path: MYPAGE_USERINFO_WITHDRAW_PATH,
            element: <MyPageForm />,
          },
        ],
      },
      {
        path: ETC_PATH,
        element: <ETCForm />,
        children: [
          {
            path: TAROT_EXPLANATION_PATH,
            element: <ETCForm />,
          },
          {
            path: TAROT_LEARNING_PATH,
            element: <ETCForm />,
          },
          {
            path: MORE_BUSINESS_INFO_PATH,
            element: <ETCForm />,
          },
        ],
      },
    ],
  },
]);
