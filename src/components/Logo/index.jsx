import React from 'react';
import styles from './index.module.scss';
import logo from './logo.png';

export default function Logo() {
  return (
    <div className={styles['logo-container']}>
      <img src={logo} alt="logo" className={styles['log-img']} />
    </div>
  );
}
