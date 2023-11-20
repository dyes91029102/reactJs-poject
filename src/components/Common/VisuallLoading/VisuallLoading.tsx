import React, { FC } from 'react';
// import styles from './VisuallLoading.module.scss';
import './VisuallLoading.scss';
interface VisuallLoadingProps {
  loadText?: string;
  children?: React.ReactNode;
}

const VisuallLoading: FC<VisuallLoadingProps> = (props: VisuallLoadingProps) => (
  <div className={'loading-screen-wrapper'}>
    <div className={'loading-screen-icon'}>
      {
        props.loadText ? (
          <span className="loading-text">
            {props.loadText}
          </span>
        ) : null
      }

      <div className={'lds-ellipsis'}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);

export default VisuallLoading;
