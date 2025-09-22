import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import { useTranslation } from 'react-i18next';
import './NoticePopup.scss';
const isNative = Capacitor.isNativePlatform();
const NoticePopup = ({ email = 'user@user.com' }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [hideFor7Days, setHideFor7Days] = useState(false);
  const HIDE_KEY = `notice_hidden_${email}`;
  const HIDE_DURATION = 7 * 24 * 60 * 60 * 1000; 
  useEffect(() => {
    checkShouldShowNotice();
  }, []);
  const checkShouldShowNotice = async () => {
    try {
      if (isNative) {
        const { value: preferencesData } = await Preferences.get({
          key: HIDE_KEY,
        });
        const now = Date.now();
        const preferencesHideUntil = preferencesData
          ? parseInt(preferencesData)
          : 0;
        if (now > preferencesHideUntil) {
          setIsVisible(true);
        }
      } else {
        const localStorageData = localStorage.getItem(HIDE_KEY);
        const now = Date.now();
        const localHideUntil = localStorageData
          ? parseInt(localStorageData)
          : 0;
        if (now > localHideUntil) {
          setIsVisible(true);
        }
      }
    } catch (error) {
      console.error('error while checking status of notice popup:', error);
      setIsVisible(true);
    }
  };
  const handleClose = async () => {
    if (hideFor7Days) {
      await handleHideFor7Days();
    } else {
      setIsVisible(false);
    }
  };
  const handleHideFor7Days = async () => {
    const hideUntil = Date.now() + HIDE_DURATION;
    const hideData = {
      email,
      hideUntil,
      timestamp: Date.now(),
    };
    try {
      if (isNative) {
        await Preferences.set({
          key: HIDE_KEY,
          value: hideUntil.toString(),
        });
        await Preferences.set({
          key: `${HIDE_KEY}_data`,
          value: JSON.stringify(hideData),
        });
      } else {
        localStorage.setItem(HIDE_KEY, hideUntil.toString());
        localStorage.setItem(`${HIDE_KEY}_data`, JSON.stringify(hideData));
      }
      setIsVisible(false);
    } catch (error) {
      console.error('error while hiding notice for 7 days:', error);
      setIsVisible(false);
    }
  };
  if (!isVisible) {
    return null;
  }
  return (
    <div className="notice-popup-overlay">
      <div className="notice-popup">
        <div className="notice-popup__header">
          <h3 className="notice-popup__title">{t('notice.title')}</h3>
          <button
            className="notice-popup__close-btn"
            onClick={() => setIsVisible(false)}
            aria-label={t('notice.closeButtonAriaLabel')}
          >
            <X size={18} />
          </button>
        </div>
        <div className="notice-popup__content">
          <ul className="notice-popup__list">
            {t('notice.content', { returnObjects: true }).map((item, index) => (
              <li key={index} className="notice-popup__list-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="notice-popup__footer">
          <button
            className="notice-popup__btn notice-popup__btn--primary"
            onClick={handleClose}
          >
            {t('notice.confirmButton')}
          </button>
          <div className="notice-popup__checkbox-section">
            <div className="notice-popup__checkbox-item">
              <input
                type="checkbox"
                id="hide7days"
                checked={hideFor7Days}
                onChange={e => setHideFor7Days(e.target.checked)}
                className="notice-popup__checkbox"
              />
              <label
                htmlFor="hide7days"
                className="notice-popup__checkbox-label"
              >
                {t('notice.hideFor7Days')}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoticePopup;
