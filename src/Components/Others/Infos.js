import React from "react";

import styles from './Infos.module.css';

const Infos = ({ status, mode }) => {
  return (
    <div
      className={`${styles.InfoStatus} ${mode ? styles.Dark : ''} ${styles[status]}`}
    >
      <div className={styles.StatusBall}></div>
      <p>{status}</p>
    </div>
  );
};

export default Infos;
