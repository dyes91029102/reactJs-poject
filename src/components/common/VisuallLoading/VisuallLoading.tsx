import React, { FC } from 'react';
import styles from './VisuallLoading.module.scss';
// import './VisuallLoading.scss';
interface VisuallLoadingProps {
  loadText?: string;
  children?: React.ReactNode;
}

const VisuallLoading: FC<VisuallLoadingProps> = (props: VisuallLoadingProps) => {
  return (
    <div className={styles['loading-screen-wrapper']}>
      <div className={styles['loading-screen-icon']}>
        {
          props.loadText ? (
            <span className={styles['loading-text']}>
              {props.loadText}
            </span>
          ) : null
        }

        <div className={styles['lds-ellipsis']}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
};

export default VisuallLoading;
