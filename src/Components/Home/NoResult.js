import React from "react";

import styles from './NoResult.module.css';
import { ReactComponent as Illustration } from './../../Assets/illustration-empty.svg';

const NoResult = ({ text, mode }) => {
  return (
    <section className={`${styles.NoResult} ${mode ? styles.Dark : ''}`}>
      <Illustration />
      <h2>There is nothing here</h2>

      {text && (
        <p>
          Create an invoice by clicking the
          <span> New Invoice</span> button and get started
        </p>
      )}
    </section>
  );
};

export default NoResult;
