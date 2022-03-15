import { RoundedPlus } from '../../assets/icons';
import {
  Button,
  Dropdown,
  InvoiceTable,
  Typography,
  Layout,
  EmptyInvoiceList,
  InvoiceForm,
} from '../../components';
import styles from './Invoices.module.css';
import { useCallback, useState } from 'react';
import { Invoice, PaymentStatus } from '../../types/invoice';
import FormSlider from '../../components/FormSlider/FormSlider';
import { useInvoice } from '../../context/invoice';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../types/navigation';

const Invoices = () => {
  const { invoicesById, setNewInvoice } = useInvoice();
  const [showEditform, setShowEditForm] = useState(false);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('');
  const navigate = useNavigate();

  const onNavigate = useCallback(
    (invoice: Invoice) => {
      navigate(`${ROUTE_PATH.INVOICE_DETAILS}/${invoice.id}`);
    },
    [navigate],
  );

  const toggleFormVisibility = useCallback(() => {
    setShowEditForm(prevShowEditForm => !prevShowEditForm);
  }, []);

  const onSubmit = useCallback(
    (invoice: Invoice) => setNewInvoice(invoice),
    [setNewInvoice],
  );

  // Render the Invoices Table
  const renderTable = useCallback(
    (invoiceList: Invoice[]) => {
      if (invoiceList.length) {
        return (
          <div className={styles.invoiceTable}>
            <InvoiceTable onRowClick={onNavigate} options={invoiceList} />

            <FormSlider visible={showEditform}>
              <InvoiceForm
                onDraftSubmit={onSubmit}
                onPendingSubmit={onSubmit}
                onCancel={toggleFormVisibility}
              />
            </FormSlider>
          </div>
        );
      }

      return (
        <EmptyInvoiceList
          title="There is nothing here"
          className={styles.emptyListContainer}
        >
          <Typography
            status="tertiary"
            align="center"
            category="body1"
            className={styles.emptyListMessage}
          >
            Create an invoice by clicking the{' '}
            <Typography status="tertiary" category="h4">
              New Invoice
            </Typography>{' '}
            button and get started
          </Typography>
        </EmptyInvoiceList>
      );
    },
    [onNavigate, onSubmit, showEditform, toggleFormVisibility],
  );

  const invoices = Object.values(invoicesById).filter(
    invoice =>
      invoice.status === selectedPaymentStatus || !selectedPaymentStatus,
  );

  return (
    <Layout>
      <header>
        <div className={styles.heading}>
          <Typography category="h1">Invoices</Typography>
          <Typography category="body4" className={styles.subHeading}>
            There are total {invoices.length} invoices
          </Typography>
        </div>

        <div className={styles.actionContainer}>
          <Dropdown
            appearance="ghost"
            onSelectValue={value => setSelectedPaymentStatus(value as string)}
            value={selectedPaymentStatus}
            defaultLabel="Filter by status"
            options={[...Object.values(PaymentStatus)]}
            className={styles.dropdown}
            containerClass={styles.dropdownContainer}
          />

          <Button
            onClick={toggleFormVisibility}
            leftAccessory={() => <RoundedPlus />}
          >
            New Invoice
          </Button>
        </div>
      </header>

      {renderTable(invoices)}
    </Layout>
  );
};

export default Invoices;
