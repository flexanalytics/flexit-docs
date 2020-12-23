import React from 'react';
import styles from './styles.module.css';
import vizzes from './vizzes';
import VizList from './viz_list';

export const Highlight = ({children, type}) => (
  <span
    style={{
      backgroundColor: (type==='dimension'?'#0094d9':'orange'),
      borderRadius: '6px',
      color: '#fff',
      padding: '2px 4px',
      'margin-left': '4px',
    }}>
    {children}
  </span>
);

const Iframe = ({src}) => (
  <iframe src={src} width="100%" height="500px"></iframe>
);

function VizPage({type}): JSX.Element | null {

  const getReqTest = (obj, type) => {
    const isSame = (obj.min===obj.max);
    return <>
      <em>{(isSame && `${obj.min} `) || (!obj.max && `${obj.min} or more `) || `${obj.min} to ${obj.max} `}</em>
      <Highlight type={type}>{type}{isSame&&obj.min===1?'':'s'}</Highlight>
      </>;
  }

  const vizConfig = vizzes[type];
  return (
    <>
      <h1>{vizConfig.label} <em><img src={`/img/viz/${type}.png`} className={styles.featureImage}/></em></h1>
      <h2>Description</h2>
      {vizConfig.desc}
      <br/>
      <br/>
      <blockquote>
        <p>
          <strong>Minimum Requirements</strong>
          <br/>
          {getReqTest(vizConfig.dim, 'dimension')}
          <br/>
          {getReqTest(vizConfig.fact, 'measure')}
        </p>
      </blockquote>
      <h2>Interactive Example</h2>
      <Iframe src={`https://cloud.flexitanalytics.com/#analysis/${vizConfig.uuid||type}/embed`}/>
      <h2>Similar Charts</h2>
      <p>{vizConfig.label} is similar to:</p>
      <VizList items={vizConfig.similar}/>
    </>
  );

}

export default VizPage;
