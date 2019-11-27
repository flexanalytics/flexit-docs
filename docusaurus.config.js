/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'FlexIt Analytics Documentation',
  tagline: 'Full documentation for FlexIt',
  url: 'https://flexitanalytics.com',
  baseUrl: '/learn/',
  favicon: 'https://flexitanalytics.com/wp-content/uploads/2018/05/Flex-X-small.png',
  organizationName: 'ataft', // Usually your GitHub org/user name.
  projectName: 'flexit-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'FlexIt Documentation',
      logo: {
        alt: 'FlexIt',
        src: 'https://flexitanalytics.com/wp-content/uploads/2018/05/Flex-X-small.png',
      },
      links: [
        {to: 'docs/gettingstarted', label: 'Getting Started', position: 'right'},
        {to: 'docs/install', label: 'Installation', position: 'right'},
        {to: 'docs/administration', label: 'Administration', position: 'right'},
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
      ],
      logo: {
        alt: 'FlexIt Logo',
        src: 'https://flexitanalytics.com/wp-content/uploads/2018/05/Flex-X-small.png',
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
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
