import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from '../../styles/scss/_Navbar.module.scss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../../src/locales/i18n.js';
import { hasAccessToken } from '../../utils/tokenCookie.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllTarotCards } from '../../data/reduxStore/tarotCardStore.jsx';
import {
  ETC_PATH,
  HOME_PATH,
  MYPAGE_MAIN_PATH,
  TAROT_CARDTABLE_PATH,
  TAROT_PRINCIPLE_PATH,
} from '../../config/Route/UrlPaths.jsx';
import {
  setIsAnswered,
  setIsWaiting,
  setIsDoneAnimationOfBackground,
  setIsReadyToShowDurumagi,
} from '../../data/reduxStore/booleanStore.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import useWindowSizeState from '../../hooks/useState/useWindowSizeState.jsx';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';
import {
  hasAccessTokenForPreference,
  removeAccessTokensForPreference,
  removeRefreshTokensForPreference,
  setAccessTokenForPreference,
  setRefreshTokenForPreference,
} from '../../utils/tokenPreference.jsx';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
const isNative = Capacitor.isNativePlatform();
const Navbar = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const isWaitingForRedux = useSelector(state => state.booleanStore.isWaiting);
  const isAnsweredForRedux = useSelector(
    state => state.booleanStore.isAnswered
  );
  const { t } = useTranslation();
  const [isToken, setIsToken] = useState(false);
  const location = useLocation();
  const { lang: currentLang } = useParams(); 
  useEffect(() => {
    const checkToken = async () => {
      if (isNative) {
        const hasToken = await hasAccessTokenForPreference();
        setIsToken(hasToken);
      } else {
        setIsToken(hasAccessToken());
      }
    };
    checkToken();
  }, []);
  const { windowWidth, windowHeight } = useWindowSizeState();
  let browserLanguage = useLanguageChange();
  const changeLanguage = lan => {
    if (isAnsweredForRedux || isWaitingForRedux) return;
    const pathname = location.pathname; 
    const nextPath = pathname.replace(/^\/(en|ja|ko)/, `/${lan}`);
    i18n.changeLanguage(lan); 
    navigate(nextPath, { replace: false }); 
    setLanguageMenuOpen(false);
  };
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const appUrlScheme = 'cosmostarot';
  const appHost = 'cosmos-tarot.com';
  const signin = async () => {
    if (isAnsweredForRedux || isWaitingForRedux) return;
    const loginUrl = `${serverUrl}/auth/google/sign`;
    if (isNative) {
      await Preferences.set({ key: 'wasSignedIn', value: 'false' }); 
    } else {
      localStorage.setItem('wasSignedIn', 'false'); 
    }
    if (isNative) {
      const redirectUrl = `${appUrlScheme}:
      await Browser.open({
        url: `${loginUrl}?redirect_uri=${encodeURIComponent(redirectUrl)}`,
      });
    } else {
      window.open(loginUrl, '_self');
    }
  };
  const logout = async () => {
    if (isAnsweredForRedux || isWaitingForRedux) return;
    const logoutUrl = `${serverUrl}/auth/google/logout`;
    if (isNative) {
      await Preferences.set({ key: 'wasSignedIn', value: 'true' }); 
    } else {
      localStorage.setItem('wasSignedIn', 'true'); 
    }
    if (isNative) {
      await removeAccessTokensForPreference();
      await removeRefreshTokensForPreference();
      navigate('/'); 
      window.location.reload();
    } else {
      window.location.reload();
      window.open(logoutUrl, '_self');
    }
  };
  const handleAppUrlOpen = async data => {
    if (isNative) {
      await Browser.close();
    }
    if (data.url.startsWith(`${appUrlScheme}:
      const url = new URL(data.url);
      const accessToken = url.searchParams.get('cos'); 
      const refreshToken = url.searchParams.get('sin'); 
      if (accessToken) await setAccessTokenForPreference(accessToken);
      if (refreshToken) await setRefreshTokenForPreference(refreshToken);
    }
    window.location.reload();
  };
  useEffect(() => {
    if (isNative) {
      const urlOpenListener = App.addListener('appUrlOpen', handleAppUrlOpen);
      return () => {
        urlOpenListener.remove();
      };
    }
  }, []);
  const browserLanguageRef = useRef(null);
  const browserIconRef = useRef(null);
  const browserDropBoxRef = useRef(null);
  useEffect(() => {
    return () => {
      browserLanguageRef.current = null;
      browserIconRef.current = null;
      browserDropBoxRef.current = null;
    };
  }, []);
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [isIconMenuOpen, setIconMenuOpen] = useState(false);
  const handleIconMenuClose = useCallback(
    e => {
      if (
        isIconMenuOpen && 
        browserDropBoxRef.current !== null && 
        !browserDropBoxRef.current.contains(e.target) && 
        !browserIconRef.current.contains(e.target)
      )
        setIconMenuOpen(false);
    },
    [isIconMenuOpen]
  );
  useEffect(() => {
    document.addEventListener('click', handleIconMenuClose);
    return () => document.removeEventListener('click', handleIconMenuClose);
  }, [handleIconMenuClose]);
  const handleMenuClose = useCallback(
    e => {
      if (
        isLanguageMenuOpen &&
        browserLanguageRef.current !== null &&
        !browserLanguageRef.current.contains(e.target)
      )
        setLanguageMenuOpen(false);
    },
    [isLanguageMenuOpen]
  );
  useEffect(() => {
    document.addEventListener('click', handleMenuClose);
    return () => document.removeEventListener('click', handleMenuClose);
  }, [handleMenuClose]);
  return (
    <>
      <nav
        className={`${
          browserLanguage === 'ja'
            ? styles['navbar-japanese']
            : styles['navbar']
        }`}
      >
        <div className={styles['container']}>
          <div
            onClick={() => {
              if (isAnsweredForRedux || isWaitingForRedux) return;
              dispatch(setIsAnswered(false));
              dispatch(setIsWaiting(false));
              if (props?.setAnswerFormForApp)
                props?.setAnswerFormForApp(prev => {
                  return {
                    ...prev,
                    isSubmitted: false,
                    isWaiting: false,
                    isAnswered: false,
                  };
                });
              if (props?.setAdsWatchedForApp) props?.setAdsWatchedForApp(false);
              dispatch(setIsDoneAnimationOfBackground(false));
              dispatch(setIsReadyToShowDurumagi(false));
              if ('/' + currentLang === location.pathname)
                window.location.reload();
            }}
          >
            <Link
              className={`${styles['link-tag-font-style']}`}
              to={`${HOME_PATH}`}
            >
              <div>{t(`header.logo`)}</div>
            </Link>
          </div>
          <div style={{ flexGrow: '1' }}></div>
          <div className={styles['menu-container']}>
            {windowWidth > 1366 && (
              <NavContentMenu
                isAnsweredForRedux={isAnsweredForRedux}
                isWaitingForRedux={isWaitingForRedux}
                isToken={isToken}
                browserLanguageRef={browserLanguageRef}
                changeLanguage={changeLanguage}
                logout={logout}
                isLanguageMenuOpen={isLanguageMenuOpen}
                setLanguageMenuOpen={setLanguageMenuOpen}
                signin={signin}
              />
            )}
            {windowWidth <= 1366 && (
              <>
                <FontAwesomeIcon
                  className={`${
                    browserLanguage === 'ja'
                      ? styles['icon-dropDown-container-japanese']
                      : styles['icon-dropDown-container']
                  }`}
                  icon={faBars}
                  size={'xs'}
                  style={{ color: '#FFD43B' }}
                  onClick={() => {
                    setIconMenuOpen(prev => !prev);
                  }}
                  ref={browserIconRef}
                />
                {isIconMenuOpen === true && (
                  <>
                    <div
                      className={styles['icon-dropDown-box']}
                      ref={browserDropBoxRef}
                    >
                      <div className={styles['icon-dropDown-item']}>
                        {isAnsweredForRedux || isWaitingForRedux ? (
                          <div>{t(`header.principle`)}</div>
                        ) : (
                          <Link
                            className={styles['link-tag-font-style']}
                            to={`${TAROT_PRINCIPLE_PATH}`}
                          >
                            <div>{t(`header.principle`)}</div>
                          </Link>
                        )}
                      </div>
                      {isToken === true && (
                        <div className={styles['icon-dropDown-item']}>
                          {isAnsweredForRedux || isWaitingForRedux ? (
                            <div>{t(`header.mypage`)}</div>
                          ) : (
                            <Link
                              className={styles['link-tag-font-style']}
                              to={`${MYPAGE_MAIN_PATH}`}
                            >
                              <div>{t(`header.mypage`)}</div>
                            </Link>
                          )}
                        </div>
                      )}
                      {isToken === true && (
                        <div className={styles['icon-dropDown-item']}>
                          <Link
                            className={styles['link-tag-font-style']}
                            onClick={logout}
                          >
                            <div>{t(`header.logout`)}</div>
                          </Link>
                        </div>
                      )}
                      {isToken === false && (
                        <div className={styles['icon-dropDown-item']}>
                          <Link
                            className={styles['link-tag-font-style']}
                            onClick={signin}
                          >
                            <div>{t(`header.login`)}</div>
                          </Link>
                        </div>
                      )}
                      {(isToken === true || isToken === false) && (
                        <>
                          <div className={styles['icon-dropDown-item']}>
                            {isAnsweredForRedux || isWaitingForRedux ? (
                              <div>{t(`header.more`)}</div>
                            ) : (
                              <Link
                                className={styles['link-tag-font-style']}
                                to={`${ETC_PATH}`}
                              >
                                <div>{t(`header.more`)}</div>
                              </Link>
                            )}
                          </div>
                        </>
                      )}
                      <div
                        ref={browserLanguageRef}
                        className={styles['icon-dropDown-item']}
                        onClick={() => setLanguageMenuOpen(prev => !prev)}
                      >
                        <div>{t(`header.language`)}</div>
                      </div>
                      <LanguageOptionMenuForIcon
                        isLanguageMenuOpen={isLanguageMenuOpen}
                        browserLanguage={browserLanguage}
                        changeLanguage={changeLanguage}
                      />
                    </div>
                  </>
                )}
              </>
            )}
            <div className={styles['empty']}></div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
const LanguageOptionMenuForIcon = ({
  isLanguageMenuOpen,
  changeLanguage,
  ...props
}) => {
  const browserLanguage = useLanguageChange();
  return (
    <>
      {isLanguageMenuOpen && (
        <ul className={styles['icon-language-dropDown-box']}>
          <li
            className={`${
              browserLanguage === 'ja'
                ? styles['icon-language-dropDown-item-japanese']
                : styles['icon-language-dropDown-item']
            }`}
            onClick={() => {
              changeLanguage('en');
            }}
          >
            English
          </li>
          <li
            className={`${
              browserLanguage === 'ja'
                ? styles['icon-language-dropDown-item-japanese']
                : styles['icon-language-dropDown-item']
            }`}
            onClick={() => {
              changeLanguage('ko');
            }}
          >
            한국어
          </li>
          <li
            className={`${
              browserLanguage === 'ja'
                ? styles['icon-japanese-language-dropDown-item-japanese']
                : styles['japanese-icon-language-dropDown-item']
            }`}
            onClick={() => {
              changeLanguage('ja');
            }}
          >
            日本語
          </li>
        </ul>
      )}
    </>
  );
};
const NavContentMenu = ({
  isAnsweredForRedux,
  isWaitingForRedux,
  isToken,
  browserLanguageRef,
  changeLanguage,
  logout,
  isLanguageMenuOpen,
  setLanguageMenuOpen,
  signin,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles['menu-box']}>
        {isAnsweredForRedux || isWaitingForRedux ? (
          <div>{t(`header.principle`)}</div>
        ) : (
          <Link
            className={styles['link-tag-font-style']}
            to={`${TAROT_PRINCIPLE_PATH}`}
          >
            <div>{t(`header.principle`)}</div>
          </Link>
        )}
      </div>
      <div className={styles['empty']}></div>
      {isToken === true && (
        <>
          <div className={styles['menu-box']}>
            {isAnsweredForRedux || isWaitingForRedux ? (
              <div>{t(`header.mypage`)}</div>
            ) : (
              <Link
                className={styles['link-tag-font-style']}
                to={`${MYPAGE_MAIN_PATH}`}
              >
                <div>{t(`header.mypage`)}</div>
              </Link>
            )}
          </div>
          <div className={styles['empty']}></div>
        </>
      )}
      {isToken === true && (
        <>
          <div className={styles['menu-box']}>
            <Link className={styles['link-tag-font-style']} onClick={logout}>
              <div>{t(`header.logout`)}</div>
            </Link>
          </div>
          <div className={styles['empty']}></div>
        </>
      )}
      {isToken === false && (
        <>
          <div className={styles['menu-box']}>
            <Link className={styles['link-tag-font-style']} onClick={signin}>
              <div>{t(`header.login`)}</div>
            </Link>
          </div>
          <div className={styles['empty']}></div>
        </>
      )}
      {(isToken === true || isToken === false) && (
        <>
          <div className={styles['menu-box']}>
            {isAnsweredForRedux || isWaitingForRedux ? (
              <div>{t(`header.more`)}</div>
            ) : (
              <Link
                className={styles['link-tag-font-style']}
                to={`${ETC_PATH}`}
              >
                <div>{t(`header.more`)}</div>
              </Link>
            )}
          </div>
          <div className={styles['empty']}></div>
        </>
      )}
      <div
        ref={browserLanguageRef}
        className={`${styles['menu-box']} ${styles['language-dropDown-container']}`}
        onClick={() => {
          setLanguageMenuOpen(prev => {
            return !prev;
          });
        }}
      >
        <div>{t(`header.language`)}</div>
      </div>
      <LanguageOptionMenu
        isLanguageMenuOpen={isLanguageMenuOpen}
        changeLanguage={changeLanguage}
      />
    </>
  );
};
const LanguageOptionMenu = ({
  isLanguageMenuOpen,
  changeLanguage,
  ...props
}) => {
  const browserLanguage = useLanguageChange();
  return (
    <>
      {isLanguageMenuOpen && (
        <ul className={styles['language-dropDown-box']}>
          <li
            className={`${
              browserLanguage === 'ja'
                ? styles['language-dropDown-item-japanese']
                : styles['language-dropDown-item']
            }`}
            onClick={() => {
              changeLanguage('en');
            }}
          >
            English
          </li>
          <li
            className={`${
              browserLanguage === 'ja'
                ? styles['language-dropDown-item-japanese']
                : styles['language-dropDown-item']
            }`}
            onClick={() => {
              changeLanguage('ko');
            }}
          >
            한국어
          </li>
          <li
            className={`${
              browserLanguage === 'ja'
                ? styles['japanese-language-dropDown-item-japanese']
                : styles['japanese-language-dropDown-item']
            }`}
            onClick={() => {
              changeLanguage('ja');
            }}
          >
            日本語
          </li>
        </ul>
      )}
    </>
  );
};
