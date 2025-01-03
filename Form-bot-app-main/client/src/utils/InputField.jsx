

import React, { useState } from 'react';
import styles from '../components/BotScreen.module.css';

const InputField = ({ field, value, onChange, onSubmit }) => {
  const [error, setError] = useState('');

  const validate = (value) => {
    switch (field.label) {
      case 'DateInput':
        if (!value) {
          setError('Please select a date');
          return false;
        }
        break;
      case 'EmailInput':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setError('Please enter a valid email');
          return false;
        }
        break;
      case 'PhoneInput':
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
          setError('Please enter a valid phone number');
          return false;
        }
        break;
      case 'NumberInput':
        if (!value || isNaN(value)) {
          setError('Please enter a valid number');
          return false;
        }
        break;
      case 'ButtonInput':
        if (!value) {
          setError('Please enter button text');
          return false;
        }
        break;
      case 'RatingInput':
        if (!value) {
          setError('Please select a rating');
          return false;
        }
        break;
      default:
        if (!value) {
          setError('Please enter text');
          return false;
        }
        break;
    }
    setError('');
    return true;
  };

  const handleBlur = () => {
    validate(value);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(value)) {
      onSubmit();
    }
  };

  return (
    <div>
      {field.label === 'ButtonInput' ? (
        <div>
          <input
            type="text"
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={styles.inputField}
            placeholder="Enter button text"
          />
        </div>
      ) : field.label === 'RatingInput' ? (
        <div className={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <div
              key={rating}
              className={`${styles.ratingCircle} ${value === rating ? styles.selectedRating : ''}`}
              onClick={() => {
                onChange({ target: { value: rating } });
                validate(rating);
              }}
            >
              {rating}
            </div>
          ))}
        </div>
      ) : (
        <input
          type={field.label === 'DateInput' ? 'date' : field.label === 'EmailInput' ? 'email' : field.label === 'PhoneInput' ? 'tel' : field.label === 'NumberInput' ? 'number' : 'text'}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          className={styles.inputField}
          placeholder={
            field.label === 'DateInput'
              ? 'Select a date'
              : field.label === 'EmailInput'
              ? 'Enter your email'
              : field.label === 'PhoneInput'
              ? 'Enter your phone'
              : field.label === 'NumberInput'
              ? 'Enter a number'
              : 'Enter your text'
          }
        />
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default InputField;



