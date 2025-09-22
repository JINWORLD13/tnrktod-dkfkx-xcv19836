import React, { Suspense, useEffect, useRef, useState } from 'react';
import styles from '../../styles/scss/_TarotCardPrincipleForm.module.scss';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { renderAnswerAsLines } from '../../function/renderAnswerAsLines.jsx';
import { useTranslation } from 'react-i18next';
import LoadingForm from '../../Components/Loading/Loading.jsx';
import SEOMetaTags from '../../Components/Helmet/SEOMetaTags.jsx';
const TarotCardPrincipleForm = () => {
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
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  const JSXTagArr = [...renderAnswerAsLines(t(`content.principle_content`))];
  const structuredData = {
    '@context': 'https:
    '@type': 'Article',
    headline: t('page.principle.meta.title'),
    description: t('page.principle.meta.description'),
    author: {
      '@type': 'Organization',
      name: 'JINWORLD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cosmos Tarot',
      logo: {
        '@type': 'ImageObject',
        url: 'https:
      },
    },
    mainEntity: {
      '@type': 'Thing',
      name: 'Carl Jung Tarot Theory',
      description: t('page.principle.sections.theory.content'),
    },
  };
  return (
    <>
      {}
      <SEOMetaTags
        title={t('page.principle.meta.title')}
        description={t('page.principle.meta.description')}
        keywords={t('page.principle.meta.keywords')}
        structuredData={structuredData}
      />
      <Suspense fallback={<LoadingForm />}>
        <div className={styles['container']}>
          {}
          <div className={styles['box']}>
            <div
              className={`${
                browserLanguage === 'ja'
                  ? styles['content-japanese']
                  : styles['content']
              }`}
              ref={scrollContainerRef}
              onWheel={e => {
                handleScroll(e);
              }}
            >
              {}
              <header className={styles['page-header']}>
                <h1 className={styles['main-title']}>
                  {t('page.principle.header.mainTitle')}
                </h1>
                <p className={styles['subtitle']}>
                  {t('page.principle.header.subtitle')}
                </p>
              </header>
              {}
              <main className={styles['seo-content']}>
                <section className={styles['theory-section']}>
                  <h2>{t('page.principle.sections.theory.title')}</h2>
                  <p>{t('page.principle.sections.theory.content')}</p>
                </section>
                <section className={styles['synchronicity-section']}>
                  <h2>{t('page.principle.sections.synchronicity.title')}</h2>
                  <p>{t('page.principle.sections.synchronicity.content')}</p>
                  <h3>
                    {t(
                      'page.principle.sections.synchronicity.application.title'
                    )}
                  </h3>
                  <p>
                    {t(
                      'page.principle.sections.synchronicity.application.content'
                    )}
                  </p>
                </section>
                <section className={styles['practical-section']}>
                  <h2>{t('page.principle.sections.practical.title')}</h2>
                  <h3>
                    {t('page.principle.sections.practical.methods.title')}
                  </h3>
                  <p>{t('page.principle.sections.practical.methods.intro')}</p>
                  <ul>
                    <li>
                      {t('page.principle.sections.practical.methods.item1')}
                    </li>
                    <li>
                      {t('page.principle.sections.practical.methods.item2')}
                    </li>
                    <li>
                      {t('page.principle.sections.practical.methods.item3')}
                    </li>
                  </ul>
                  <h3>{t('page.principle.sections.practical.energy.title')}</h3>
                  <p>{t('page.principle.sections.practical.energy.content')}</p>
                </section>
                <section className={styles['interpretation-section']}>
                  <h2>{t('page.principle.sections.interpretation.title')}</h2>
                  <h3>
                    {t(
                      'page.principle.sections.interpretation.additional.title'
                    )}
                  </h3>
                  <p>
                    {t(
                      'page.principle.sections.interpretation.additional.content'
                    )}
                  </p>
                  <h3>
                    {t('page.principle.sections.interpretation.caution.title')}
                  </h3>
                  <p>
                    {t(
                      'page.principle.sections.interpretation.caution.content'
                    )}
                  </p>
                </section>
                <section className={styles['conclusion-section']}>
                  <h2>{t('page.principle.sections.conclusion.title')}</h2>
                  <p>{t('page.principle.sections.conclusion.content')}</p>
                </section>
              </main>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};
export default TarotCardPrincipleForm;
