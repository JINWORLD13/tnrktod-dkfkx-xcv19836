import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Capacitor } from '@capacitor/core';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
const SEOMetaTags = ({
  title = '',
  description = '',
  keywords = '',
  image = '',
  canonicalUrl = '',
  threeJSContent = false,
  structuredData = null,
}) => {
  const { t, i18n } = useTranslation();
  const isNative = Capacitor.isNativePlatform();
  const location = useLocation();
  const siteUrl = 'https:
  const defaultTitle = title?.length > 0 ? title : `${t('meta.title')}`;
  const defaultDescription =
    description?.length > 0 ? description : `${t('meta.description')}`;
  const defaultKeywords =
    keywords?.length > 0 ? keywords : `${t('meta.keywords')}`;
  const getLanguageFromPath = path => {
    const languageMap = { ko: 'ko_KR', en: 'en_US', ja: 'ja_JP' };
    const pathSegments = path.split('/')?.filter(segment => segment);
    const langCode = pathSegments[0];
    return languageMap[langCode] || 'ko_KR';
  };
  const currentLanguage = getLanguageFromPath(location.pathname);
  let isAppSpot = false;
  if (typeof window !== 'undefined') {
    isAppSpot = window.location.hostname.includes('.appspot.com');
  }
  const getLocalizedCanonicalUrl = () => {
    if (canonicalUrl) return canonicalUrl;
    return `${siteUrl}${location.pathname || ''}`;
  };
  const getBasePath = () => {
    if (typeof window === 'undefined') {
      return '';
    }
    const pathSegments = location.pathname
      .split('/')
      ?.filter(segment => segment);
    const actualDepth = Math.max(0, pathSegments.length - 1);
    return actualDepth > 0 ? '../'.repeat(actualDepth) : './';
  };
  const getAssetPath = path => {
    if (location.pathname === '/' || import.meta.env.DEV) {
      return path;
    }
    return `${getBasePath()}${path.startsWith('/') ? path.slice(1) : path}`;
  };
  const defaultStructuredData = {
    '@context': 'http:
    '@type': ['WebSite', 'WebApplication'],
    name: `${t(`meta.name`)}`,
    url: siteUrl,
    description: defaultDescription,
    author: { '@type': 'Organization', name: 'JINWORLD' },
    inLanguage: i18n.language || 'ko',
    availableLanguage: ['ko', 'en', 'ja'],
    applicationCategory: 'Tarot AI Application',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '1000',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'KRW',
      price: '0',
      description: `${t(`meta.title`)}`,
    },
  };
  return (
    <Helmet
      htmlAttributes={{
        lang: i18n.language || 'ko',
      }}
      meta={[
        { 'http-equiv': 'content-language', content: i18n.language || 'ko' },
      ]}
    >
      {}
      <title>{defaultTitle}</title>
      {}
      {isAppSpot ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}
      {}
      <meta name="description" content={defaultDescription} />
      <meta name="keywords" content={defaultKeywords} />
      {}
      <meta name="author" content="JINWORLD" />
      <meta name="generator" content="React" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      {}
      <link
        rel="icon"
        type="image/x-icon"
        href={getAssetPath('/assets/favicon.ico')}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={getAssetPath(
          '/assets/cosmos_tarot_favicon/apple-icon-180x180.png'
        )}
      />
      {}
      {}
      <link
        rel="prefetch"
        href={getAssetPath('/assets/font/Dongle/Dongle-Regular.ttf')}
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        rel="prefetch"
        href={getAssetPath('/assets/font/Kosugi_Maru/KosugiMaru-Regular.ttf')}
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      {}
      {threeJSContent && (
        <>
          <meta name="content-type" content="interactive-3d" />
          <meta name="format-detection" content="telephone=no" />
        </>
      )}
      {}
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={defaultDescription} />
      <meta property="og:locale" content={currentLanguage} />
      <meta property="og:site_name" content={t('meta.title')} />
      <meta
        property="og:image"
        content={
          getAssetPath(`${image}`) ||
          `${siteUrl}/cosmos_tarot_favicon/cosmos_tarot-512x512.png`
        }
      />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:alt" content="Cosmos Tarot Logo" />
      {}
      {!isNative && (
        <>
          <meta property="og:type" content="website" />
          <meta property="og:url" content={getLocalizedCanonicalUrl()} />
          {}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={defaultTitle} />
          <meta name="twitter:description" content={defaultDescription} />
          <meta
            name="twitter:image"
            content={
              image ||
              `${siteUrl}/cosmos_tarot_favicon/cosmos_tarot-512x512.png`
            }
          />
          <meta name="twitter:site" content="@cosmos_tarot" />
          {}
          <meta name="application-name" content={t('meta.name')} />
          <meta name="theme-color" content="#800080" />
          <meta name="format-detection" content="telephone=no" />
          {}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content={t('meta.name')} />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          {}
          <meta
            name="msapplication-window"
            content="width=device-width;height=device-height"
          />
          <meta name="msapplication-tooltip" content={t('meta.title')} />
          {}
          <link rel="canonical" href={getLocalizedCanonicalUrl()} />
          {}
          <script type="application/ld+json">
            {JSON.stringify(structuredData || defaultStructuredData)}
          </script>
        </>
      )}
      {}
      <link
        rel="alternate"
        hrefLang="ko"
        href={`${siteUrl}/ko${location.pathname
          .replace(/^\/[a-z]{2}/, '')
          .replace(/^\/ko/, '')}`}
      />
      <link
        rel="alternate"
        hrefLang="en"
        href={`${siteUrl}/en${location.pathname
          .replace(/^\/[a-z]{2}/, '')
          .replace(/^\/en/, '')}`}
      />
      <link
        rel="alternate"
        hrefLang="ja"
        href={`${siteUrl}/ja${location.pathname
          .replace(/^\/[a-z]{2}/, '')
          .replace(/^\/ja/, '')}`}
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${siteUrl}/en${location.pathname
          .replace(/^\/[a-z]{2}/, '')
          .replace(/^\/en/, '')}`}
      />
    </Helmet>
  );
};
SEOMetaTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  canonicalUrl: PropTypes.string,
  threeJSContent: PropTypes.bool,
  structuredData: PropTypes.object,
};
export default SEOMetaTags;
