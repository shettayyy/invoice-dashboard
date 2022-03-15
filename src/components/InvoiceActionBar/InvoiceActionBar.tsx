import { Button, PaymentStatusPill, Typography } from '..';
import { PaymentStatus } from '../../types/invoice';
import styles from './InvoiceActionBar.module.css';

interface Props {
  invoiceId: string;
  status: `${PaymentStatus}`;
  onEdit: (id: string) => unknown;
  onDelete: (id: string) => unknown;
  onMarkAsPaid: (id: string) => unknown;
}

const InvoiceActionBar: React.FC<Props> = ({
  onEdit,
  onDelete,
  onMarkAsPaid,
  status,
  invoiceId,
}) => {
  return (
    <div className={styles.actionBar}>
      <div className={styles.statusContainer}>
        <Typography
          status="tertiary"
          category="body4"
          className={styles.status}
        >
          Status
        </Typography>

        <PaymentStatusPill status={status} />
      </div>

      <div className={styles.actionBtns}>
        <Button status="tertiary" onClick={() => onEdit(invoiceId)}>
          Edit
        </Button>
        <Button status="danger" onClick={() => onDelete(invoiceId)}>
          Delete
        </Button>
        <Button
          disabled={status === PaymentStatus.Paid}
          status="primary"
          onClick={() => onMarkAsPaid(invoiceId)}
        >
          Mark as Paid
        </Button>
      </div>
    </div>
  );
};

export default InvoiceActionBar;
