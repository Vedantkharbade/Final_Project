import React from 'react';
import { useSelector } from 'react-redux';
import Bubble from './Bubbles';
import InputField from './InputField';
import styles from './Workspace.module.css';
import {flag} from '../data/useImportAssets';

const Workspace = ({ mode }) => {
  const fields = useSelector((state) => state.workspace.fields);

  return (
    <div className={styles.workspace}>
      <div className={styles.start}>
        <img src={flag} alt="" />
        <p className={styles.typograpy}>Start</p>
      </div>
      <div className={styles.field}>
      {fields.map((field) => {
        if (field.type === 'bubble') {
          return <Bubble key={field.id} field={field} />;
        } else if (field.type === 'input') {
          return <InputField key={field.id} field={field} />;
        } else {
          return null;
        }
      })}
      </div>
    </div>
  );
};

export default Workspace;









