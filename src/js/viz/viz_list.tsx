import React from 'react';
import styles from '../../pages/styles.module.css';
import vizzes from './vizzes';

const VizItem = ({vizId, vizProps}: {vizId: string; vizProps: any}) => (
    <a href={`/docs/viz/${vizId}`} aria-label={`${vizProps.label} visualization`}>
        <div className={styles.vizItem}>
            <em><img src={`/img/viz/${vizId}.png`} alt={`${vizProps.label} visualization`} /></em>
            <div className={styles.vizText}>
                {vizProps.label}
            </div>
        </div>
    </a>
);

export default function VizList({items}: {items?: string[]}): React.ReactNode {
    return (
        <>
            {Object.entries(vizzes as Record<string, any>).map(([vizId, vizProps]) => {
                if (items && items.indexOf(vizId) === -1) {
                    return null;
                }
                return <VizItem key={vizId} vizId={vizId} vizProps={vizProps} />;
            })}
        </>
    );
}
