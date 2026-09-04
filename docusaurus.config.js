// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Welcome to FlexIt Learning',
  tagline: 'FlexIt Analytics is business intelligence, built for people',
  url: 'https://learn.flexitanalytics.com',
  baseUrl: '/',
  favicon: 'img/Flex-X-small.png',
  organizationName: 'flexanalytics',
  projectName: 'flexit-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/flexanalytics/flexit-docs/edit/master/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'UA-127440102-1',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      zoomSelector: '.markdown :not(em) > img',
      algolia: {
        appId: 'BH4D9OD16A',
        apiKey: '04948da940dc579697cd957e0acf432b',
        indexName: 'flexitanalytics',
        // Index was crawled by legacy DocSearch and has no docusaurus_tag facet
        contextualSearch: false,
      },
      navbar: {
        title: 'FlexIt Documentation',
        logo: {
          alt: 'FlexIt',
          src: 'img/Flex-X-small.png',
        },
        items: [
          {to: '/docs/getting-started', label: 'Docs', position: 'right'},
          {
            href: 'https://flexitanalytics.com',
            label: 'FlexIt Website',
            position: 'right',
            'aria-label': 'Open FlexIt Analytics website in new window',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} Flex Analytics, Inc.`,
      },
    }),

  plugins: ['plugin-image-zoom'],
};

module.exports = config;
