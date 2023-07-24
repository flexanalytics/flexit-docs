/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import VizList from '../js/viz/viz_list';

const features = [
  {
    title: <>Visualization Guide</>,
    component: <VizList/>,
    docLink: 'docs/viz/guide',
    description: (
      <>
        The visualization guide is a catalogue and learning source, but it is also interactive so you can get hands-on experience.
      </>
    ),
  },
  {
    title: <>Deploy FlexIt</>,
    imageUrl: 'img/home_install.png',
    docLink: 'docs/deploy',
    description: (
      <>
        Got 3 minutes? That's all the time you need to spin up a cloud or on premises instance and check out how easy and powerful FlexIt is.
      </>
    ),
  },
  {
    title: <>Getting Started</>,
    imageUrl: 'img/home_start.png',
    docLink: 'docs/getting-started',
    description: (
      <>
        Quick start guide to get you familiar with FlexIt. Learn how to access FlexIt and build your first report and dashboard.
      </>
    ),
  },
  {
    title: <>Reporting Guide</>,
    imageUrl: 'img/home_analysis.png',
    docLink: 'docs/report',
    description: (
      <>
        Learn everything you need to know about creating reports in this detailed guide that walks you through all FlexIt has to offer. 
      </>
    ),
  },
];

function FeatureImg({props}) {
  const imgUrl = useBaseUrl(props.imageUrl);
  return (
  <a href={useBaseUrl(props.docLink)}>
    <img className={styles.featureImage} src={imgUrl} alt={props.title} />
  </a>
  );
}

function Feature({props}) {
  return (
    <div className={classnames('col col--6', styles.feature)}>
      <div className={styles.featureBlock}>
        <div className={classnames('text--center', styles.featureText)}>
          {props.imageUrl?<FeatureImg props={props}/>:props.component}
        </div>
        <a className={styles.featureTitle} href={useBaseUrl(props.docLink)}>{props.title}</a>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="User guides and documentation for FlexIt Analytics">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle" role="heading">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--lg',
                styles.heroBtn,
              )}
              to={useBaseUrl('docs/getting-started')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} props={props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
