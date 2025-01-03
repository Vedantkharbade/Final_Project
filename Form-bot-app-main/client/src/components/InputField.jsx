import React, { useState } from 'react';
import styles from './InputField.module.css';
import { useDispatch } from 'react-redux';
import { updateField ,deleteField} from '../configureslice/workspaceSlice'
import { delete_icon } from '../data/useImportAssets';

const InputField = ({ field }) => {
  const [value, setValue] = useState(field.content);
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setValue(e.target.value);// Optionally handle input change here, if necessary
    dispatch(updateField({ id: field.id, updates: { content: value } }));
  };
  const handleDelete = () => {
    dispatch(deleteField({ id: field.id }));
  };

  switch (field.label) {
    case 'TextInput':
      return (
        <div className={styles.custom_input}>
          <h3 className={styles.typography}>{field.label}</h3>
          <div className={styles.delete_image}>
            <img src={delete_icon} alt="delete" className={styles.delete} onClick={handleDelete} />
          </div>
          <p className={styles.para_typography}>{`Hint : User will input a ${field.label} on his form`}</p>
            <input
          type="text"
          id={field.id}
          value={field.value}
          placeholder={field.label}
          className={styles.input}
          readOnly
        />
        </div>
      );
    case 'NumberInput':
      return (
        <div className={styles.custom_input}>
          <h3 className={styles.typography}>{field.label}</h3>
          <div className={styles.delete_image}>
            <img src={delete_icon} alt="delete" className={styles.delete} onClick={handleDelete} />
          </div>
          <p className={styles.para_typography}>{`Hint : User will input a ${field.label} on his form`}</p>
           <input
          type="number"
          id={field.id}
          value={field.value}
          placeholder={field.label}
          className={styles.input}
          readOnly
        />
        </div>
      );
    case 'EmailInput':
      return (
        <div className={styles.custom_input}>
          <h3 className={styles.typography}>{field.label}</h3>
          <div className={styles.delete_image}>
            <img src={delete_icon} alt="delete" className={styles.delete} onClick={handleDelete} />
          </div>
          <p className={styles.para_typography}>{`Hint : User will input a ${field.label} on his form`}</p>
           <input
          type="email"
          id={field.id}
          value={field.value}
          placeholder={field.label}
          className={styles.input}
          readOnly
          
        />
        </div>
       
      );
    case 'PhoneInput':
      return (
        <div className={styles.custom_input}>
          <h3 className={styles.typography}>{field.label}</h3>
          <div className={styles.delete_image}>
            <img src={delete_icon} alt="delete" className={styles.delete} onClick={handleDelete} />
          </div>
          <p className={styles.para_typography}>{`Hint : User will input a ${field.label} on his form`}</p>
           <input
          type="tel"
          id={field.id}
          value={field.value}
          placeholder={field.label}
          className={styles.input}
          readOnly
          
        />
        </div>
      );
    case 'DateInput':
      return (
        <div className={styles.custom_input}>
          <h3 className={styles.typography}>{field.label}</h3>
          <div className={styles.delete_image}>
            <img src={delete_icon} alt="delete" className={styles.delete} onClick={handleDelete} />
          </div>
          <p className={styles.para_typography}>{`Hint : User will input a ${field.label} on his form`}</p>
           <input
          type="date"
          id={field.id}
          value={field.value}
          className={styles.input}
          readOnly
          
        />
        </div>
      );
    case 'RatingInput':
      return (
        <div className={styles.custom_input}>
          <h3 className={styles.typography}>{field.label}</h3>
          <div className={styles.delete_image}>
            <img src={delete_icon} alt="delete" className={styles.delete} onClick={handleDelete} />
          </div>
          <p className={styles.para_typography}>{`Hint : User will input a ${field.label} on his form`}</p>
           <input
          type="range"
          id={field.id}
          value={field.value}
          min="1"
          max="5"
          className={styles.input}
          readOnly
          
        />
        </div>
      );
      case 'ButtonInput':
      return (
        <div className={styles.custom_input}>
          <h3 className={styles.typography}>{field.label}</h3>
          <div className={styles.delete_image}>
            <img src={delete_icon} alt="delete" className={styles.delete} onClick={handleDelete} />
          </div>
          <input
            type="text"
            id={field.id}
            value={value}
            className={styles.input_button}
            onChange={handleChange}
          />
        </div>
      );
    default:
      return null;
  }
};

export default InputField;

// import React, { useState } from 'react';
// import styles from './InputField.module.css';
// import { useDispatch } from 'react-redux';
// import { updateField } from '../configureslice/workspaceSlice'

// const InputField = ({ field }) => {
//   const [value, setValue] = useState(field.content);
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setValue(e.target.value);
//     dispatch(updateField({ id: field.id, updates: { content: value } }));
//   };

//   switch (field.label) {
//     case 'TextInput':
//     case 'NumberInput':
//     case 'EmailInput':
//     case 'PhoneInput':
//     case 'DateInput':
//     case 'RatingInput':
//       return (
//         <input
//           type={field.label.replace('Input', '').toLowerCase()}
//           id={field.id}
//           value={value}
//           placeholder={field.label}
//           className={styles.input}
//           readOnly={field.label === 'ButtonInput'}
//           onChange={handleChange}
//         />
//       );
//     case 'ButtonInput':
//       return (
//         <input
//           type="text"
//           id={field.id}
//           value={value}
//           placeholder="Button label"
//           className={styles.input}
//           onChange={handleChange}
//         />
//       );
//     default:
//       return null;
//   }
// };

// export default InputField;







