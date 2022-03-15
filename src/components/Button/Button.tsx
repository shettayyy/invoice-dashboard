import { ButtonHTMLAttributes, FC } from 'react';
import styles from './Button.module.css';

enum Size {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum Status {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  TertiaryAlternative = 'tertiary-alternative',
  Danger = 'danger',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: `${Size}`;
  status?: `${Status}`;
  fullWidth?: boolean;
  leftAccessory?: () => JSX.Element;
}

const Button: FC<Props> = props => {
  const {
    children,
    size = 'large',
    fullWidth = false,
    status = 'primary',
    onClick,
    leftAccessory,
    className = '',
    ...otherProps
  } = props;
  const fullWidthStyle = fullWidth ? styles.fullWidth : '';
  const leftAccessoryContainer = leftAccessory
    ? styles.leftAccessoryContainer
    : '';

  return (
    <button
      {...otherProps}
      onClick={onClick}
      className={`
        ${styles.btn} 
        ${styles[status]} 
        ${styles[size]} 
        ${fullWidthStyle} 
        ${leftAccessoryContainer}
        ${className}
      `}
    >
      {leftAccessory && (
        <span className={styles.leftAccessory}>{leftAccessory()}</span>
      )}

      {children}
    </button>
  );
};

export default Button;
