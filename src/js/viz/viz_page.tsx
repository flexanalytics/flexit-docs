import React from 'react';
import styles from '../../pages/styles.module.css';
import vizzes from '../../../../flexit/client/js/config/vizzes';
import VizList from './viz_list';

const baseUrl = 'https://cloud.flexitanalytics.com'; //'http://carbon1:3030';

const Highlight = ({children, type}) => (
  <span
    style={{
      backgroundColor: (type==='dimension'?'#0094d9':'orange'),
      borderRadius: '6px',
      color: '#fff',
      padding: '2px 4px',
      marginLeft: '4px',
    }}>
    {children}
  </span>
);

const Iframe = ({src}) => (
  <iframe src={src} className={styles.vizFrame}></iframe>
);

const Examples = ({arr}) => (
  (!arr.length&&'None') || arr.map(example => {
    return (<>
      <h3>{example.title}</h3>
      <Iframe src={`${baseUrl}/#analysis/${example.id}/embed`}/>
      <i className="fa fa-external-link"></i> <a target="_blank" href={`${baseUrl}/#analysis/${example.id}`}>Open in New Window</a>
    </>)
  })
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

  const obj = {
    dimension: {min:0},
    measure: {min:0},
  }

  vizConfig.dataFields.forEach(df => {
    const x = obj[df.attrtype];
    if(x && df.id!=='play') {
      x.min += (df.min || 0);
      if(df.max) {
        x.max = x.max || 0;
        x.max += df.max;
      }
    }
  });

  return (
    <>
      <h1>{vizConfig.label} <em><img src={`/img/viz/${type}.png`} className={styles.vizImage}/></em></h1>
      <h2>Description</h2>
      <div dangerouslySetInnerHTML={{ __html: vizConfig.desc }} />
      <br/>
      <br/>
      {
      <blockquote>
        <p>
          <strong>Minimum Requirements</strong>
          <br/>
          {getReqTest(obj.dimension, 'dimension')}
          <br/>
          {getReqTest(obj.measure, 'measure')}
        </p>
      </blockquote>
      }
      <h2>Interactive Examples</h2>
      <Examples arr={vizConfig.examples}/>
      <h2>Similar Charts</h2>
      <p>{vizConfig.label} is similar to:</p>
      <VizList items={vizConfig.similar}/>
    </>
  );

}

export default VizPage;
