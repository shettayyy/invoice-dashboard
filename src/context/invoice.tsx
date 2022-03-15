import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Invoice } from '../types/invoice';
import data from '../constants/data.json';

type InvoiceById = { [key: string]: Invoice };

interface InvoiceState {
  invoicesById: InvoiceById;
  setNewInvoice: (invoice: Invoice) => unknown;
  updateInvoice: (
    id: string,
    accessor: keyof Invoice,
    value: unknown,
  ) => unknown;
  deleteInvoice: (id: string) => unknown;
}

const INITIAL_INVOICE_STATE = {
  invoicesById: {},
  setNewInvoice: () => null,
  updateInvoice: () => null,
  deleteInvoice: () => null,
};

const InvoiceContext = createContext<InvoiceState>(INITIAL_INVOICE_STATE);
InvoiceContext.displayName = 'Invoice Context';

export const InvoiceProvider: React.FC = ({ children }) => {
  const [isInvoiceReady, setInvoiceReady] = useState(false);
  const [invoicesById, setInvoicesById] = useState<InvoiceById>({});

  const setNewInvoice = useCallback((newInvoice: Invoice) => {
    setInvoicesById(prevInvoicesById => ({
      ...prevInvoicesById,
      [newInvoice.id]: newInvoice,
    }));
  }, []);

  const updateInvoice = useCallback(
    (id: string, accessor: keyof Invoice, value: unknown) => {
      setInvoicesById(prevInvoicesById => {
        const invoice = prevInvoicesById[id];

        invoice[accessor] = value as never;

        return {
          ...prevInvoicesById,
          [id]: invoice,
        };
      });
    },
    [],
  );

  const deleteInvoice = useCallback((id: string) => {
    setInvoicesById(prevInvoicesById => {
      const newInvoicesById = { ...prevInvoicesById };
      delete newInvoicesById[id];

      return newInvoicesById;
    });
  }, []);

  useEffect(() => {
    // Set Invoices List
    setInvoicesById(
      data.reduce((prevData, dataItem) => {
        return {
          ...prevData,
          [dataItem.id]: dataItem,
        };
      }, {}),
    );

    // After inital data is set, start the app
    setInvoiceReady(true);
  }, []);

  if (!isInvoiceReady) {
    return null;
  }

  return (
    <InvoiceContext.Provider
      value={{
        invoicesById,
        setNewInvoice,
        deleteInvoice,
        updateInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = (): InvoiceState => useContext(InvoiceContext);
