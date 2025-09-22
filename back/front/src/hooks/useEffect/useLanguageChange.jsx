import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import i18n from '../../Locales/i18n.js';
const useLanguageChange = () => {
  const { lang: paramLang } = useParams();
  const initialLang = ['en','ko','ja'].includes(paramLang)
    ? paramLang
    : i18n.language;
  const [browserLanguage, setBrowserLanguage] = useState(initialLang);
  useEffect(() => {
    if (browserLanguage !== i18n.language) {
      i18n.changeLanguage(browserLanguage);
    }
  }, [browserLanguage]);
  useEffect(() => {
    const onChange = newLang => setBrowserLanguage(newLang);
    i18n.on('languageChanged', onChange);
    return () => i18n.off('languageChanged', onChange);
  }, []);
  return browserLanguage;
};
export default useLanguageChange;
