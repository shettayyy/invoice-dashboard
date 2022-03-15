import { HTMLProps } from 'react';
import { Typography } from '..';
import { PaymentStatus } from '../../types/invoice';
import Pill from '../Pill/Pill';
import styles from './PaymentStatusPill.module.css';

interface Props extends HTMLProps<HTMLSpanElement> {
  status: `${PaymentStatus}`;
}

const PaymentStatusPill: React.FC<Props> = ({ children, status }) => {
  return (
    <Pill className={`${styles.container} ${styles[status]}`}>
      <Typography
        align="center"
        category="body4"
        className={styles[`${status}-label`]}
      >
        <span className={styles.notification} />
        {status}
      </Typography>
    </Pill>
  );
};

export default PaymentStatusPill;
