// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CarSim Learning',
  tagline: 'CarSim を使いこなすための学習ポータル',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://takahiko-otake-ai.github.io',
  baseUrl: '/carsim-learning/',

  organizationName: 'takahiko-otake-ai',
  projectName: 'carsim-learning',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    localeConfigs: {
      ja: {label: '日本語', direction: 'ltr'},
      en: {label: 'English', direction: 'ltr'},
    },
  },

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ['ja', 'en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      }),
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/carsim-social-card.png',
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'CarSim Learning',
        logo: {
          alt: 'CarSim',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'learningSidebar',
            position: 'left',
            label: 'ドキュメント',
          },
          {
            to: '/docs/hands-on/exercise-1',
            label: 'ハンズオン',
            position: 'left',
          },
          {
            to: '/docs/test-cases/overview',
            label: 'テストケース',
            position: 'left',
          },
          {
            to: '/docs/reference/faq',
            label: 'リファレンス',
            position: 'left',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://www.carsim.com/',
            label: 'carsim.com',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '学習',
            items: [
              {label: 'はじめに', to: '/docs/getting-started/installation'},
              {label: 'ハンズオン', to: '/docs/hands-on/exercise-1'},
              {label: 'テストケース', to: '/docs/test-cases/overview'},
            ],
          },
          {
            title: 'リファレンス',
            items: [
              {label: 'パラメータ', to: '/docs/reference/parameters'},
              {label: 'FAQ', to: '/docs/reference/faq'},
              {label: '用語集', to: '/docs/reference/glossary'},
            ],
          },
          {
            title: 'リンク',
            items: [
              {label: 'CarSim 公式サイト', href: 'https://www.carsim.com/'},
              {label: 'テクニカルサポート', href: 'https://www.carsim.com/contactus/support.php'},
              {label: '動画', href: 'https://www.carsim.com/downloads/videos.php'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Mechanical Simulation, an Applied Intuition Company.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'bash', 'json', 'yaml', 'matlab'],
      },
    }),
};

export default config;
