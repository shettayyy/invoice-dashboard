import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Layout,
  InvoiceDetail,
  InvoiceActionBar,
  InvoiceForm,
  EmptyInvoiceList,
  Typography,
} from '../../components';
import BackBar from '../../components/BackBar/BackBar';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import FormSlider from '../../components/FormSlider/FormSlider';
import { useInvoice } from '../../context/invoice';
import { Invoice, PaymentStatus } from '../../types/invoice';
import { ROUTE_PATH } from '../../types/navigation';

const InvoiceDetails = () => {
  const { invoicesById, deleteInvoice, updateInvoice, setNewInvoice } =
    useInvoice();
  const [showEditform, setShowEditForm] = useState(false);
  const [visible, setVisible] = useState(false);
  const params = useParams();
  const invoiceId = params.id || '';
  const navigate = useNavigate();

  const toggleFormVisibility = useCallback(() => {
    setShowEditForm(prevShowEditForm => !prevShowEditForm);
  }, []);

  const onDelete = useCallback(() => {
    deleteInvoice(invoiceId);
    navigate(ROUTE_PATH.INVOICES);
  }, [deleteInvoice, invoiceId, navigate]);

  const onMarkAsPaid = useCallback(
    (id: string) => {
      updateInvoice(id, 'status', PaymentStatus.Paid);
    },
    [updateInvoice],
  );

  const onSubmit = useCallback(
    (invoice: Invoice) => setNewInvoice(invoice),
    [setNewInvoice],
  );

  if (!invoiceId || !invoicesById[invoiceId]) {
    return (
      <EmptyInvoiceList title="Uh, Oh!">
        <Typography category="body1">
          The invoice doesn't exist or has been deleted
        </Typography>
      </EmptyInvoiceList>
    );
  }

  const invoice = invoicesById[invoiceId];

  return (
    <>
      <Layout>
        <BackBar />

        <InvoiceActionBar
          onEdit={toggleFormVisibility}
          onDelete={() => setVisible(true)}
          onMarkAsPaid={onMarkAsPaid}
          status={invoice.status}
          invoiceId={invoice.id}
        />

        <InvoiceDetail invoice={invoice} />
      </Layout>

      <FormSlider visible={showEditform}>
        <InvoiceForm
          onDraftSubmit={onSubmit}
          onPendingSubmit={onSubmit}
          onCancel={toggleFormVisibility}
          invoice={invoice}
        />
      </FormSlider>

      <ConfirmationModal
        visible={visible}
        buttonLabel="Delete"
        buttonStatus="danger"
        onClose={() => setVisible(false)}
        onClick={onDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete invoice ${invoiceId}? This action cannot be undone.`}
      />
    </>
  );
};

export default InvoiceDetails;
