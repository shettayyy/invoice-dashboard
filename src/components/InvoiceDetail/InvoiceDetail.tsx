import { format } from 'date-fns';
import { Typography } from '..';
import { Invoice } from '../../types/invoice';
import styles from './Invoice.module.css';

interface Props {
  invoice: Invoice;
}

const InvoiceDetail: React.FC<Props> = ({ invoice }) => {
  const {
    id,
    description,
    senderAddress,
    createdAt,
    paymentDue,
    clientEmail,
    clientAddress,
    clientName,
    total,
    items,
  } = invoice;

  return (
    <div className={styles.invoiceDetailContainer}>
      <section className={styles.invoiceHeader}>
        <div className={styles.invoiceTitleContainer}>
          <Typography category="h4">
            <Typography category="h4">#</Typography>
            {id}
          </Typography>

          <Typography
            status="tertiary"
            category="body4"
            className={styles.projectName}
          >
            {description}
          </Typography>
        </div>

        <address className={styles.layoutColumn}>
          <Typography category="body4" align="right">
            {senderAddress.street}
          </Typography>
          <Typography category="body4" align="right">
            {senderAddress.city}
          </Typography>
          <Typography category="body4" align="right">
            {senderAddress.postCode}
          </Typography>
          <Typography category="body4" align="right">
            {senderAddress.country}
          </Typography>
        </address>
      </section>

      <section className={styles.invoiceSubheader}>
        {/* Date section */}
        <section className={`${styles.layoutColumn} ${styles.dateContainer}`}>
          <div className={styles.layoutColumn}>
            <Typography
              status="tertiary"
              category="body4"
              className={styles.subHeaderTitle}
            >
              Invoice Date
            </Typography>
            <Typography category="h3" className={styles.date}>
              {createdAt
                ? format(new Date(createdAt), 'dd MMM yyyy')
                : 'Not provided'}
            </Typography>
          </div>

          <div className={styles.layoutColumn}>
            <Typography
              status="tertiary"
              category="body4"
              className={styles.subHeaderTitle}
            >
              Payment Due
            </Typography>
            <Typography category="h3" className={styles.date}>
              {paymentDue
                ? format(new Date(paymentDue), 'dd MMM yyyy')
                : 'Not provided'}
            </Typography>
          </div>
        </section>

        {/* Bill to section */}
        <section className={styles.layoutColumn}>
          <Typography
            status="tertiary"
            category="body4"
            className={styles.subHeaderTitle}
          >
            Bill To
          </Typography>

          <Typography category="h3" className={styles.clientName}>
            {clientName}
          </Typography>

          <address className={`${styles.layoutColumn} ${styles.clientAddress}`}>
            <Typography status="tertiary" category="body4">
              {clientAddress.street}
            </Typography>
            <Typography status="tertiary" category="body4">
              {clientAddress.city}
            </Typography>
            <Typography status="tertiary" category="body4">
              {clientAddress.postCode}
            </Typography>
            <Typography status="tertiary" category="body4">
              {clientAddress.street}
            </Typography>
          </address>
        </section>

        {/* Sent to section */}
        <section className={styles.layoutColumn}>
          <Typography
            status="tertiary"
            category="body4"
            className={styles.subHeaderTitle}
          >
            Sent To
          </Typography>

          <Typography category="h3">{clientEmail}</Typography>
        </section>
      </section>

      <section className={styles.invoiceBody}>
        {/* Item Table */}
        <section className={styles.itemContainer}>
          <div className={styles.itemRow}>
            <Typography category="body2" className={styles.itemCol}>
              Item Name
            </Typography>

            <Typography
              align="center"
              category="body2"
              className={styles.itemCol}
            >
              QTY.
            </Typography>

            <Typography
              align="right"
              category="body2"
              className={styles.itemCol}
            >
              Price
            </Typography>

            <Typography
              align="right"
              category="body3"
              className={styles.itemCol}
            >
              Total
            </Typography>
          </div>

          {items.map((item, id) => (
            <div key={id} className={styles.itemRow}>
              <Typography category="body3" className={styles.itemCol}>
                {item.name}
              </Typography>

              <Typography
                align="center"
                category="body3"
                className={styles.itemCol}
              >
                {item.quantity}
              </Typography>

              <Typography
                align="right"
                category="body3"
                className={styles.itemCol}
              >
                £ {item.price}
              </Typography>

              <Typography
                align="right"
                category="body3"
                className={styles.itemCol}
              >
                £ {item.total}
              </Typography>
            </div>
          ))}
        </section>

        {/* Total Table */}
        <section className={styles.totalContainer}>
          <Typography category="body4" className={styles.tableCol}>
            Amount Due
          </Typography>

          <Typography category="h2" className={styles.tableCol}>
            £ {total}
          </Typography>
        </section>
      </section>
    </div>
  );
};

export default InvoiceDetail;
