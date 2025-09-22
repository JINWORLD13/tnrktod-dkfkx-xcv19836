import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { createStore } from './src/data/reduxStore/store.jsx';
import App from './src/App.jsx';
import i18n from './src/locales/i18n.js';
import { StaticRouter } from 'react-router-dom';
export async function prerender(data) {
  if (typeof window === 'undefined') {
    const globalScope = globalThis;
    const mockStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      length: 0,
      key: () => null,
    };
    globalScope.window = {
      location: {
        href: `https:
        pathname: data.url,
        search: '',
        hash: '',
        protocol: 'https:',
        hostname: 'cosmos-tarot.com',
        port: '',
        origin: 'https:
      },
      localStorage: mockStorage,
      sessionStorage: mockStorage,
      navigator: {
        userAgent: 'Mozilla/5.0 (Server Side Rendering)',
        language: 'ko',
        languages: ['ko', 'en'],
        platform: 'Server',
        cookieEnabled: true,
      },
      document: {
        getElementById: () => null,
        querySelector: () => null,
        querySelectorAll: () => [],
        createElement: tag => ({
          tagName: tag,
          setAttribute: () => {},
          getAttribute: () => null,
          appendChild: () => {},
          removeChild: () => {},
          style: {},
          classList: {
            add: () => {},
            remove: () => {},
            contains: () => false,
          },
        }),
        createTextNode: text => ({ textContent: text }),
        addEventListener: () => {},
        removeEventListener: () => {},
        documentElement: {
          style: {},
          classList: {
            add: () => {},
            remove: () => {},
          },
        },
        head: {
          appendChild: () => {},
          removeChild: () => {},
        },
        body: {
          appendChild: () => {},
          removeChild: () => {},
          style: {},
          classList: {
            add: () => {},
            remove: () => {},
          },
        },
        cookie: '',
        readyState: 'complete',
      },
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
      innerWidth: 1200,
      innerHeight: 800,
      outerWidth: 1200,
      outerHeight: 800,
      screen: {
        width: 1200,
        height: 800,
        availWidth: 1200,
        availHeight: 800,
      },
      history: {
        pushState: () => {},
        replaceState: () => {},
        back: () => {},
        forward: () => {},
        go: () => {},
        length: 1,
        state: null,
      },
      getComputedStyle: () => ({}),
      matchMedia: () => ({
        matches: false,
        addListener: () => {},
        removeListener: () => {},
      }),
      requestAnimationFrame: cb => setTimeout(cb, 16),
      cancelAnimationFrame: id => clearTimeout(id),
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      setInterval: setInterval,
      clearInterval: clearInterval,
      console: console,
      alert: () => {},
      confirm: () => false,
      prompt: () => null,
    };
    globalScope.document = globalScope.window.document;
    globalScope.localStorage = mockStorage;
    globalScope.sessionStorage = mockStorage;
    try {
      if (!globalScope.navigator) {
        globalScope.navigator = globalScope.window.navigator;
      }
    } catch (e) {}
    try {
      if (!globalScope.location) {
        globalScope.location = globalScope.window.location;
      }
    } catch (e) {}
    try {
      if (!globalScope.history) {
        globalScope.history = globalScope.window.history;
      }
    } catch (e) {}
    globalScope.XMLHttpRequest =
      globalScope.XMLHttpRequest ||
      class MockXMLHttpRequest {
        open() {}
        send() {}
        setRequestHeader() {}
        addEventListener() {}
      };
    globalScope.fetch =
      globalScope.fetch ||
      (async () => ({
        ok: true,
        json: async () => ({}),
        text: async () => '',
        status: 200,
      }));
  }
  const segments = data.url.split('/');
  const lang = ['ko', 'en', 'ja'].includes(segments[1]) ? segments[1] : 'ko';
  await i18n.changeLanguage(lang);
  const store = createStore();
  const helmetContext = {};
  const html = renderToString(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={data.url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </I18nextProvider>
    </Provider>
  );
  let finalHtml = html;
  if (html.length < 1000 || !html.includes('<h1')) {
    const pageContent = getPageContent(data.url, lang);
    finalHtml = html.replace('</nav>', `</nav>${pageContent}`);
  }
  const { helmet } = helmetContext;
  const title = helmet.title
    ? helmet.title.toString().replace(/<[^>]*>/g, '')
    : getDefaultTitle(lang);
  const siteUrl = 'https:
  const defaultDescription = getDefaultDescription(lang);
  const defaultKeywords = getDefaultKeywords(lang);
  return {
    html: finalHtml,
    links: new Set([
      '/ko',
      '/ja',
      '/en',
      '/ko/tarot/principle',
      '/en/tarot/principle',
      '/ja/tarot/principle',
      '/ko/etc/tarot/learning',
      '/ko/etc/tarot/explanation',
      '/en/etc/tarot/learning',
      '/en/etc/tarot/explanation',
      '/ja/etc/tarot/learning',
      '/ja/etc/tarot/explanation',
      '/ko/etc',
      '/en/etc',
      '/ja/etc',
      '/ko/mypage/chart/totalchart',
      '/ko/mypage/chart/subjectchart',
      '/ko/mypage/chart/questiontopicchart',
      '/en/mypage/chart/totalchart',
      '/en/mypage/chart/subjectchart',
      '/en/mypage/chart/questiontopicchart',
      '/ja/mypage/chart/totalchart',
      '/ja/mypage/chart/subjectchart',
      '/ja/mypage/chart/questiontopicchart',
    ]),
    head: {
      lang,
      title,
      elements: new Set([
        {
          type: 'meta',
          props: {
            name: 'description',
            content: defaultDescription,
          },
        },
        {
          type: 'meta',
          props: {
            name: 'keywords',
            content: defaultKeywords,
          },
        },
        {
          type: 'meta',
          props: {
            name: 'robots',
            content:
              'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
        },
        {
          type: 'meta',
          props: {
            property: 'og:title',
            content: title,
          },
        },
        {
          type: 'meta',
          props: {
            property: 'og:description',
            content: defaultDescription,
          },
        },
        {
          type: 'meta',
          props: {
            property: 'og:url',
            content: `${siteUrl}${data.url}`,
          },
        },
        {
          type: 'meta',
          props: {
            property: 'og:type',
            content: 'website',
          },
        },
        {
          type: 'meta',
          props: {
            property: 'og:image',
            content: `${siteUrl}/cosmos_tarot_favicon/cosmos_tarot-512x512.png`,
          },
        },
        {
          type: 'link',
          props: {
            rel: 'canonical',
            href: `${siteUrl}${data.url}`,
          },
        },
        {
          type: 'link',
          props: {
            rel: 'alternate',
            hrefLang: 'ko',
            href: `${siteUrl}/ko${data.url
              .replace(/^\/[a-z]{2}/, '')
              .replace(/^\/ko/, '')}`,
          },
        },
        {
          type: 'link',
          props: {
            rel: 'alternate',
            hrefLang: 'en',
            href: `${siteUrl}/en${data.url
              .replace(/^\/[a-z]{2}/, '')
              .replace(/^\/en/, '')}`,
          },
        },
        {
          type: 'link',
          props: {
            rel: 'alternate',
            hrefLang: 'ja',
            href: `${siteUrl}/ja${data.url
              .replace(/^\/[a-z]{2}/, '')
              .replace(/^\/ja/, '')}`,
          },
        },
      ]),
    },
  };
}
function getPageContent(url, lang) {
  const pagePath = url.toLowerCase();
  if (pagePath.includes('/tarot/principle')) {
    return getPrinciplePageContent(lang);
  }
  if (pagePath.includes('/mypage')) {
    return getMypageContent(lang);
  }
  if (pagePath.includes('/etc')) {
    return getEtcPageContent(lang);
  }
  return getMainPageContent(lang);
}
function getPrinciplePageContent(lang) {
  const content = {
    ko: `
      <main>
        <header>
          <h1>타로의 원리</h1>
          <p>칼 구스타브 융의 심리학적 접근으로 이해하는 타로카드의 과학적 원리</p>
        </header>
        <section>
          <h2>집단무의식 이론</h2>
          <p>정신과 의사이자 심리학자인 칼 구스타브 융은 인류가 공유하는 집단 무의식의 영역을 타로 카드를 통해 이해할 수 있다고 보았습니다. 그의 이론에 따르면, 집단 무의식은 모든 인류가 공통으로 가지고 있는 특성이며, 우리는 무의식의 깊은 영역에서 서로 연결되어 있습니다.</p>
        </section>
        <section>
          <h2>동시성의 원리 (Synchronicity)</h2>
          <p>융은 이러한 관점을 바탕으로 '동시성의 원리'를 발전시켰습니다. 이는 우연히 동시에 발생하는 사건들이 실제로는 무의식적 연결을 통해 깊은 관계를 맺고 있다는 것입니다.</p>
        </section>
        <section>
          <h2>실제 활용 원리</h2>
          <p>이러한 원리에 따라 타로카드는 질문하는 그 순간의 에너지를 기준으로 결과를 보여줍니다. 코스모스 타로 역시 이러한 융의 이론을 바탕으로, 사용자의 무의식적 선택과 순간적 에너지를 반영하여 의미 있는 통찰을 제공합니다.</p>
        </section>
      </main>
    `,
    en: `
      <main>
        <header>
          <h1>Principles of Tarot</h1>
          <p>Understanding the Scientific Principles of Tarot Cards through Carl Gustav Jung's Psychological Approach</p>
        </header>
        <section>
          <h2>Collective Unconscious Theory</h2>
          <p>Carl Gustav Jung, a psychiatrist and psychologist, believed that the realm of the collective unconscious shared by humanity can be understood through tarot cards. According to his theory, the collective unconscious is a characteristic common to all humanity, and we are connected to each other in the deep realm of the unconscious.</p>
        </section>
        <section>
          <h2>Principle of Synchronicity</h2>
          <p>Based on this perspective, Jung developed the 'principle of synchronicity'. This means that events that occur simultaneously by chance are actually deeply related through unconscious connections.</p>
        </section>
        <section>
          <h2>Practical Application Principles</h2>
          <p>According to these principles, tarot cards show results based on the energy of the moment when the question is asked. Cosmos Tarot also provides meaningful insights by reflecting the user's unconscious choices and momentary energy based on Jung's theory.</p>
        </section>
      </main>
    `,
    ja: `
      <main>
        <header>
          <h1>タロットの原理</h1>
          <p>カール・グスタフ・ユングの心理学的アプローチによるタロットカードの科学的原理の理解</p>
        </header>
        <section>
          <h2>集合的無意識理論</h2>
          <p>精神科医かつ心理学者であるカール・グスタフ・ユングは、人類が共有する集合的無意識の領域をタロットカードを通じて理解できると考えました。彼の理論によれば、集合的無意識は全人類が共通して持つ特性であり、私たちは無意識の深い領域で互いに繋がっています。</p>
        </section>
        <section>
          <h2>共時性の原理 (Synchronicity)</h2>
          <p>ユングはこの観点を基に「共時性の原理」を発展させました。これは偶然に同時に発生する出来事が、実際には無意識的繋がりを通じて深い関係を結んでいるということです。</p>
        </section>
        <section>
          <h2>実際の活用原理</h2>
          <p>これらの原理により、タロットカードは質問するその瞬間のエネルギーを基準として結果を示します。コスモス タロットもユングの理論を基に、ユーザーの無意識的選択と瞬間的エネルギーを反映して意味のある洞察を提供します。</p>
        </section>
      </main>
    `,
  };
  return content[lang] || content.ko;
}
function getMypageContent(lang) {
  const content = {
    ko: `
      <main>
        <h1>마이페이지 - 나의 타로 여정</h1>
        <p>마이페이지에서 나만의 타로 여정을 되돌아보세요. 지난 상담 기록부터 개인별 카드 통계까지, 당신의 타로 이야기가 모두 정리되어 있습니다.</p>
        <section>
          <h2>상담 기록 관리</h2>
          <p>과거 타로 리딩 결과를 테마별 및 질문의 대상별로 정리하여 확인하고, 원하는 기록은 언제든지 삭제할 수 있습니다.</p>
        </section>
        <section>
          <h2>통계 분석</h2>
          <p>개인별 메이저 카드와 마이너 카드 출현 빈도를 그래프로 시각화하여 나만의 타로 패턴을 파악할 수 있습니다.</p>
        </section>
      </main>
    `,
    en: `
      <main>
        <h1>My Page - My Tarot Journey</h1>
        <p>Look back on your own tarot journey in My Page. From past consultation records to personal card statistics, all your tarot stories are organized here.</p>
        <section>
          <h2>Consultation Record Management</h2>
          <p>You can organize and check past tarot reading results by theme and question target, and delete any records you want at any time.</p>
        </section>
        <section>
          <h2>Statistical Analysis</h2>
          <p>You can identify your own tarot patterns by visualizing the frequency of major and minor cards in graphs.</p>
        </section>
      </main>
    `,
    ja: `
      <main>
        <h1>マイページ - 私のタロットの旅</h1>
        <p>マイページで自分だけのタロットの旅を振り返ってみてください。過去の相談記録から個人別カード統計まで、あなたのタロットストーリーがすべて整理されています。</p>
        <section>
          <h2>相談記録管理</h2>
          <p>過去のタロットリーディング結果をテーマ別および質問対象別に整理して確認でき、希望する記録はいつでも削除できます。</p>
        </section>
        <section>
          <h2>統計分析</h2>
          <p>個人別メジャーカードとマイナーカードの出現頻度をグラフで視覚化して、自分だけのタロットパターンを把握できます。</p>
        </section>
      </main>
    `,
  };
  return content[lang] || content.ko;
}
function getEtcPageContent(lang) {
  const content = {
    ko: `
      <main>
        <h1>더보기 - 타로의 모든 것</h1>
        <p>코스모스 타로의 더보기 섹션에서 타로에 대한 깊이 있는 지식을 탐험해보세요.</p>
        <section>
          <h2>타로 배우기</h2>
          <p>타로카드의 기본 개념부터 각 카드의 의미, 스프레드 방법까지 단계별로 학습할 수 있습니다.</p>
        </section>
        <section>
          <h2>이용약관</h2>
          <p>코스모스 타로 서비스 이용 시 알아야 할 모든 약관과 정책을 투명하게 공개합니다.</p>
        </section>
      </main>
    `,
    en: `
      <main>
        <h1>More - Everything About Tarot</h1>
        <p>Explore in-depth knowledge about tarot in the More section of Cosmos Tarot.</p>
        <section>
          <h2>Learn Tarot</h2>
          <p>You can learn step by step from basic concepts of tarot cards to the meaning of each card and spread methods.</p>
        </section>
        <section>
          <h2>Terms of Service</h2>
          <p>We transparently disclose all terms and policies you need to know when using Cosmos Tarot services.</p>
        </section>
      </main>
    `,
    ja: `
      <main>
        <h1>詳細 - タロットのすべて</h1>
        <p>コスモス タロットの詳細セクションでタロットに関する深い知識を探求してみてください。</p>
        <section>
          <h2>タロットを学ぶ</h2>
          <p>タロットカードの基本概念から各カードの意味、スプレッド方法まで段階的に学習できます。</p>
        </section>
        <section>
          <h2>利用規約</h2>
          <p>コスモス タロットサービス利用時に知っておくべきすべての規約とポリシーを透明に公開します。</p>
        </section>
      </main>
    `,
  };
  return content[lang] || content.ko;
}
function getMainPageContent(lang) {
  const content = {
    ko: `
      <main>
        <h1>코스모스 타로 - 귀여운 친구와 함께하는 타로 시간</h1>
        <p>마음의 답을 찾는 고요한 시간, 귀여운 캐릭터 친구와 함께 24시간 언제든 타로 상담을 받아보세요.</p>
        <section>
          <h2>따뜻한 동반자</h2>
          <p>혼자가 아닌 귀여운 친구와 함께하는 타로 시간. 마치 오랜 친구와 대화하듯 편안하게 마음을 털어놓을 수 있어요.</p>
        </section>
        <section>
          <h2>24시간 언제든</h2>
          <p>스마트폰, 태블릿, 컴퓨터 어디서든 부드럽게 움직이는 캐릭터 친구를 만날 수 있어요.</p>
        </section>
      </main>
    `,
    en: `
      <main>
        <h1>COSMOS TAROT - Your Gentle Companion for Life's Questions</h1>
        <p>A quiet time to find answers in your heart, get tarot consultations with your cute character friend anytime, 24 hours a day.</p>
        <section>
          <h2>Warm Companion</h2>
          <p>Tarot time with a cute friend, not alone. You can comfortably open your heart as if talking to an old friend.</p>
        </section>
        <section>
          <h2>Anytime, 24 Hours</h2>
          <p>You can meet smoothly moving character friends anywhere on your smartphone, tablet, or computer.</p>
        </section>
      </main>
    `,
    ja: `
      <main>
        <h1>コスモス タロット - 可愛い友達と一緒のタロット時間</h1>
        <p>心の答えを見つける静かな時間、可愛いキャラクター友達と24時間いつでもタロット相談を受けてみてください。</p>
        <section>
          <h2>温かい仲間</h2>
          <p>一人ではなく可愛い友達と一緒のタロット時間。まるで古い友達と会話するように気楽に心を打ち明けることができます。</p>
        </section>
        <section>
          <h2>24時間いつでも</h2>
          <p>スマートフォン、タブレット、コンピューターどこででも滑らかに動くキャラクター友達に会えます。</p>
        </section>
      </main>
    `,
  };
  return content[lang] || content.ko;
}
function getDefaultTitle(lang) {
  const titles = {
    ko: '코스모스 타로 - 마음을 읽는 AI 타로카드',
    en: 'Cosmos Tarot - AI Tarot Cards That Read Hearts',
    ja: 'コスモス タロット - 心を読むAIタロットカード',
  };
  return titles[lang] || titles.ko;
}
function getDefaultDescription(lang) {
  const descriptions = {
    ko: 'Cosmos Tarot는 타로 카드를 통해 당신의 내면과 타인의 진심을 더 깊이 이해할 수 있도록 도와주는 앱입니다. 고대부터 전해오는 타로의 지혜와 현대 심리학을 접목하여, 관계 속 진실과 거짓을 분별하는데 도움을 줍니다.',
    en: "Cosmos Tarot is an app that helps you gain deeper insights into your inner self and understand others' true intentions through tarot cards. By combining ancient tarot wisdom with modern psychology, it assists you in discerning truth from deception in relationships.",
    ja: 'Cosmos Tarot（コスモスタロット）は、タロットカードを通じてあなたの内面や他者の本心をより深く理解するためのアプリです。古代から伝わるタロットの叡智と現代心理学を組み合わせ、人間関係における真実と偽りを見分けるお手伝いをします。',
  };
  return descriptions[lang] || descriptions.ko;
}
function getDefaultKeywords(lang) {
  const keywords = {
    ko: '타로, 무료 타로, 타로 ai, 코스모스 타로, 타로 리딩, 온라인 타로, 타로 카드, 마음 읽기, 진실된 감정 이해하기, 연애 타로 리딩, 관계 타로, 심리 타로, 정확한 타로, 연애운, 재물운, 직업운, 미래 예측',
    en: "Tarot, Free Tarot, Tarot AI, Cosmos Tarot, tarot reading, online tarot, tarot cards, reading people's hearts, understanding people's true feelings, love tarot reading, relationship tarot, psychological tarot, accurate tarot, love fortune, financial fortune, career fortune, future prediction",
    ja: 'タロット, タロットカード, 無料タロット, タロットAI, コスモスタロット、タロットリーディング、オンラインタロット、心を読む、真の感情を理解する、恋愛タロットリーディング、関係タロット、心理タロット、正確なタロット、恋愛運、金運、職業運、未来予測',
  };
  return keywords[lang] || keywords.ko;
}
