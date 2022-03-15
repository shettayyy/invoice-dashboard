import { HTMLProps } from 'react';
import { Typography } from '..';
import { ReactComponent as EmptyIllustration } from '../../assets/icons/illustration-empty.svg';
import styles from './EmptyInvoiceList.module.css';

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
}

const EmptyInvoiceList: React.FC<Props> = ({
  children,
  className = '',
  title,
  ...otherProps
}) => {
  return (
    <div {...otherProps} className={`${styles.container} ${className}`}>
      <EmptyIllustration />

      <Typography align="center" category="h2" className={styles.title}>
        {title}
      </Typography>

      {children}
    </div>
  );
};

export default EmptyInvoiceList;
