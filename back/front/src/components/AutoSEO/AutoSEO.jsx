import React from 'react';
import { useLocation } from 'react-router-dom';
import SEOMetaTags from '../Helmet/SEOMetaTags.jsx';
import { seoData } from '../../Data/seoData/seoData.jsx';
const AutoSEO = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const seoInfo = seoData[currentPath] || seoData.default;
  return (
    <>
      <SEOMetaTags {...seoInfo} />
      {children}
    </>
  );
};
export default AutoSEO;
