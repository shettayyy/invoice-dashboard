import { HTMLProps } from 'react';
import styles from './Pill.module.css';

const Pill: React.FC<HTMLProps<HTMLSpanElement>> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <span {...otherProps} className={`${styles.container} ${className}`}>
      {children}
    </span>
  );
};

export default Pill;
