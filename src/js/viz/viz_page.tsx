import React from 'react';
import styles from '../../pages/styles.module.css';
import vizzes from './vizzes';
import VizList from './viz_list';

const baseUrl = 'https://cloud.flexitanalytics.com';

const Highlight = ({children, type}: {children: React.ReactNode; type: string}) => (
  <span
    style={{
      backgroundColor: (type === 'dimension' ? '#0094d9' : 'orange'),
      borderRadius: '6px',
      color: '#fff',
      padding: '2px 4px',
      marginLeft: '4px',
    }}>
    {children}
  </span>
);

const Iframe = ({src, title}: {src: string; title: string}) => (
  <iframe src={src} title={title} className={styles.vizFrame}></iframe>
);

const Examples = ({arr}: {arr: any[]}) => (
  <>
    {(!arr.length && 'None') || arr.map((example, idx) => (
      <React.Fragment key={example.id ?? idx}>
        {example.title ? (<b>{example.title}</b>) : ''}
        <Iframe src={`${baseUrl}/#analysis/${example.id}/embed`} title={example.title || 'Example visualization'}/>
        <i className="fa fa-external-link"></i> <a target="_blank" rel="noopener noreferrer" href={`${baseUrl}/#analysis/${example.id}`}>Open in New Window</a>
      </React.Fragment>
    ))}
  </>
);

type Req = {min: number; max?: number};

export default function VizPage({type}: {type: string}): React.ReactNode {

  const getReqTest = (obj: Req, kind: string) => {
    const isSame = (obj.min === obj.max);
    return <>
      <em>{(isSame && `${obj.min} `) || (!obj.max && `${obj.min} or more `) || `${obj.min} to ${obj.max} `}</em>
      <Highlight type={kind}>{kind}{isSame && obj.min === 1 ? '' : 's'}</Highlight>
      </>;
  }

  const vizConfig = (vizzes as Record<string, any>)[type];

  const obj: Record<string, Req> = {
    dimension: {min: 0},
    measure: {min: 0},
  }

  vizConfig.dataFields.forEach((df: any) => {
    const x = obj[df.attrtype];
    if (x && df.id !== 'play') {
      x.min += (df.min || 0);
      if (df.max) {
        x.max = x.max || 0;
        x.max += df.max;
      }
    }
  });

  return (
    <>
      <h1>{vizConfig.label} <em><img src={`/img/viz/${type}.png`} alt={`${type} visualization`} className={styles.vizImage}/></em></h1>
      <h2>Description</h2>
      <div dangerouslySetInnerHTML={{__html: vizConfig.desc}} />
      <br/>
      <br/>
      <blockquote>
        <p>
          <strong>Minimum Requirements</strong>
          <br/>
          {getReqTest(obj.dimension, 'dimension')}
          <br/>
          {getReqTest(obj.measure, 'measure')}
        </p>
      </blockquote>
      <h2>Interactive Examples</h2>
      <Examples arr={vizConfig.examples}/>
      <h2>Similar Charts</h2>
      <p>{vizConfig.label} is similar to:</p>
      <VizList items={vizConfig.similar}/>
    </>
  );

}
