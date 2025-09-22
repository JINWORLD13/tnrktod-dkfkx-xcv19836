import React, { Suspense, useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';
import SEOMetaTags from './components/Helmet/SEOMetaTags.jsx';
import { Capacitor } from '@capacitor/core';
import LoadingForm from './Components/Loading/Loading.jsx';
import AutoSEO from './Components/AutoSEO/AutoSeo.jsx';
const isNative = Capacitor.isNativePlatform();
function App() {
  const [isVoucherModeOnForApp, setIsVoucherModeOnForApp] = useState(() => {
    if (isNative) return false; 
    if (!isNative) return true;
  });
  const [whichTarotForApp, setWhichTarotForApp] = useState(2);
  const [isAdsWatchedForApp, setAdsWatchedForApp] = useState(false);
  const [answerFormForApp, setAnswerFormForApp] = useState(false);
  return (
    <>
      {}
      <AutoSEO>
        <div>
          <Navbar
            setAnswerFormForApp={setAnswerFormForApp}
            setAdsWatchedForApp={setAdsWatchedForApp}
          />
          <Suspense fallback={<LoadingForm />}>
            <Outlet
              context={{
                setWhichTarotForApp,
                setIsVoucherModeOnForApp,
                setAdsWatchedForApp,
                setAnswerFormForApp,
              }}
            />
          </Suspense>
          <Footer
            whichTarotForApp={whichTarotForApp}
            isVoucherModeOnForApp={isVoucherModeOnForApp}
            isAdsWatchedForApp={isAdsWatchedForApp}
            answerFormForApp={answerFormForApp}
          />
        </div>
      </AutoSEO>
    </>
  );
}
export default App;
