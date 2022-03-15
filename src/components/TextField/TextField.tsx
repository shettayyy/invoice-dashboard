import { forwardRef, HTMLProps } from 'react';
import Typography from '../Typography/Typography';
import styles from './TextField.module.css';

enum Status {
  Primary = 'primary',
  Danger = 'danger',
}

interface Props extends HTMLProps<HTMLInputElement> {
  status?: `${Status}`;
  rightAccessory?: () => JSX.Element;
  inputClassName?: string;
  error?: string;
}

const TextField = forwardRef<null, Props>((props, ref) => {
  const {
    label,
    className = '',
    inputClassName = '',
    status = 'primary',
    error = '',
    rightAccessory,
    ...otherProps
  } = props;

  return (
    <fieldset className={`${styles.container} ${className}`}>
      {label && (
        <label className={styles.label} htmlFor={otherProps.name}>
          <Typography className={`${styles['label-' + status]}`}>
            {label}
          </Typography>
        </label>
      )}

      <div className={styles.inputContainer}>
        <input
          {...otherProps}
          ref={ref}
          className={`
            ${styles.textfield} 
            ${styles[status]}
            ${rightAccessory ? styles.rightAccessoryInput : ''} 
            ${inputClassName}
          `}
        />
        <Typography status="danger" category="body4">
          {error}
        </Typography>

        {rightAccessory && (
          <span className={styles.rightAccessory}>{rightAccessory()}</span>
        )}
      </div>
    </fieldset>
  );
});

export default TextField;
