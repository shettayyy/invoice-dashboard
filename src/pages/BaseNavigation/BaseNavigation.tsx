import { Route, Routes } from 'react-router-dom';
import { EmptyInvoiceList } from '../../components';
import { InvoiceProvider } from '../../context/invoice';
import { ROUTE_PATH } from '../../types/navigation';
import InvoiceDetails from '../InvoiceDetails/InvoiceDetails';
import Invoices from '../Invoices/Invoices';

const BaseNavigation = () => (
  <InvoiceProvider>
    <Routes>
      <Route path="*" element={<EmptyInvoiceList title="Not Found" />} />
      <Route path={ROUTE_PATH.INVOICES} element={<Invoices />} />
      <Route
        path={`${ROUTE_PATH.INVOICE_DETAILS}/:id`}
        element={<InvoiceDetails />}
      />
    </Routes>
  </InvoiceProvider>
);

export default BaseNavigation;
