import { format } from 'date-fns';
import { ReactComponent as ArrowRight } from '../../assets/icons/icon-arrow-right.svg';
import { PaymentStatusPill, Table, Typography } from '..';
import { Invoice, PaymentStatus } from '../../types/invoice';
import { Accessor } from '../Table/Table';
import styles from './InvoiceTable.module.css';

interface Props {
  options: Invoice[];
  onRowClick: (invoice: Invoice) => unknown;
}

const ACCESSORS: Accessor<Invoice>[] = [
  {
    accessor: 'id',
    component: ({ label }) => (
      <Typography category="h4" align="center">
        <Typography category="h4" status="secondary">
          #
        </Typography>
        {label}
      </Typography>
    ),
    cellClass: styles.id,
  },
  {
    accessor: 'paymentDue',
    component: ({ label }) => (
      <Typography status="tertiary">
        Due {format(new Date(label), 'dd MMM yyyy')}
      </Typography>
    ),
    cellClass: styles.paymentDue,
  },
  {
    accessor: 'clientName',
    cellClass: styles.clientName,
  },
  {
    accessor: 'total',
    component: ({ label }) => (
      <Typography category="h3" align="right">
        £ {parseFloat(label).toFixed(2)}
      </Typography>
    ),
    cellClass: styles.total,
  },
  {
    accessor: 'status',
    component: ({ label }) => (
      <PaymentStatusPill status={label as PaymentStatus} />
    ),
    cellClass: styles.status,
  },
  {
    accessor: '',
    component: () => <ArrowRight className={styles.arrowRight} />,
    cellClass: styles.iconCell,
  },
];

const InvoiceTable: React.FC<Props> = ({ options, onRowClick }) => {
  return (
    <Table onRowClick={onRowClick} options={options} accessors={ACCESSORS} />
  );
};

export default InvoiceTable;
