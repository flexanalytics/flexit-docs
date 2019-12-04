/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'Welcome to FlexIt Learning',
  tagline: 'FlexIt Analytics is business intelligence, built for people',
  url: 'https://flexit.github.io',
  baseUrl: '/',
  favicon: '/img/Flex-X-small.png',
  organizationName: 'ataft', // Usually your GitHub org/user name.
  projectName: 'flexit-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'FlexIt Documentation',
      logo: {
        alt: 'FlexIt',
        src: '/img/Flex-X-small.png',
      },
      links: [
        {to: 'docs/getting-started', label: 'Docs', position: 'right'},
        //{to: 'docs/install', label: 'Install', position: 'right'},
        //{to: 'docs/administration', label: 'Administration', position: 'right'},
        {
          href: 'https://flexitanalytics.com',
          label: 'FlexIt Website',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        /*
        {
          title: 'Install',
          items: [
            {
              label: 'Install',
              to: 'docs/install',
            },
          ],
        },
        {
          title: 'Administration',
          items: [
            {
              label: 'Administration',
              to: 'docs/administration',
            },
          ],
        },
        {
          title: 'FlexIt Website',
          items: [
            {
              label: 'FlexIt Website',
              href: 'https://flexitanalytics.com',
            },
          ],
        },
        */
      ],
      logo: {
        alt: 'FlexIt Logo',
        src: '/img/Flex-X-small.png',
        href: 'https://flexitanalytics.com/',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Flex Analytics, Inc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/ataft/flexit-docs/edit/master/',
          //showLastUpdateAuthor: true,
          //showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  stylesheets: [
    //'node_modules/@fortawesome/fontawesome-pro/css/all.css',
  ],
};
