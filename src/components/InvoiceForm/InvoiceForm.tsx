import { useCallback, useState } from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { ReactComponent as Delete } from '../../assets/icons/icon-delete.svg';
import { Button, Datepicker, Dropdown, TextField, Typography } from '..';
import styles from './InvoiceForm.module.css';
import { Invoice, PaymentStatus } from '../../types/invoice';
import format from 'date-fns/format';
import { addDays } from 'date-fns/esm';
import uniqueID from 'generate-unique-id';

interface Props {
  onCancel: () => unknown;
  onDraftSubmit: (draftInvoice: Invoice) => unknown;
  onPendingSubmit: (invoice: Invoice) => unknown;
  invoice?: Invoice;
}

interface PaymentTerms {
  label: string;
  value: number;
}

interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface IFormInput {
  id: string;
  description: string;

  clientName: string;
  clientEmail: string;

  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };

  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };

  createdAt: Date;
  paymentTerms: PaymentTerms;

  items: Item[];
}

const PAYMENT_TERMS_OPTIONS = [
  {
    label: 'Next 30 days',
    value: 30,
  },
  {
    label: 'Next 15 days',
    value: 15,
  },
  {
    label: 'Next 10 days',
    value: 10,
  },
  {
    label: 'Next 5 days',
    value: 5,
  },
];

const getInitialState = (invoice?: Invoice): Partial<IFormInput> => {
  if (invoice) {
    return {
      ...invoice,
      createdAt: new Date(invoice.createdAt),
      paymentTerms: {
        label: `Next ${invoice.paymentTerms} days`,
        value: invoice.paymentTerms,
      },
    };
  }

  return {
    createdAt: new Date(),
    paymentTerms: PAYMENT_TERMS_OPTIONS[0],
    items: [],
  };
};

const InvoiceForm: React.FC<Props> = ({
  onCancel,
  onDraftSubmit,
  onPendingSubmit,
  invoice,
}) => {
  const {
    register,
    control,
    getValues,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: getInitialState(invoice),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
    shouldUnregister: true,
  });

  const [itemsErr, setItemsErr] = useState('');
  const items = watch('items');

  const validation = {
    required: 'Your input is required',
    maxLength: {
      value: 40,
      message: 'Maximum 40 characters are allowed',
    },
  };

  const generateInvoice = useCallback(
    (formData: IFormInput, status: `${PaymentStatus}`): Invoice => {
      const { items, id, createdAt, paymentTerms } = formData;

      const itemsDetail = items.reduce(
        (prevValue, item) => {
          const total = parseFloat((item.quantity * item.price).toFixed(2));
          const newItem = {
            ...item,
            total,
          };

          prevValue.updatedItems.push(newItem);
          prevValue.total += total;

          return prevValue;
        },
        {
          updatedItems: [] as Invoice['items'],
          total: 0,
        },
      );

      const newId =
        id ??
        `${uniqueID({
          useLetters: true,
          useNumbers: false,
          length: 2,
        }).toUpperCase()}${uniqueID({
          useLetters: false,
          useNumbers: true,
          length: 4,
        })}`;

      return {
        ...formData,
        id: newId,
        paymentTerms: paymentTerms.value,
        createdAt: format(createdAt, 'yyyy-MM-dd'),
        paymentDue: format(
          addDays(createdAt, paymentTerms.value),
          'yyyy-MM-dd',
        ),
        status,
        items: itemsDetail.updatedItems,
        total: itemsDetail.total,
      };
    },
    [],
  );

  const onSubmitDraft = useCallback(() => {
    onDraftSubmit(generateInvoice(getValues(), PaymentStatus.Draft));
    onCancel();
  }, [generateInvoice, getValues, onCancel, onDraftSubmit]);

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    data => {
      if (!data.items.length) {
        return setItemsErr('Must provide atleast one item.');
      }

      if (itemsErr) {
        setItemsErr('');
      }

      onPendingSubmit(generateInvoice(data, PaymentStatus.Pending));
      onCancel();
    },
    [generateInvoice, itemsErr, onCancel, onPendingSubmit],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Typography category="h2" className={styles.formTitle}>
        New Invoice
      </Typography>

      <section className={styles.formFields}>
        <div className={styles.formFieldsWrapper}>
          {/* Bill From */}
          <fieldset name="Bill From">
            <legend>
              <Typography className={styles.fieldSetTitle}>
                Bill From
              </Typography>
            </legend>

            <TextField
              label="Street Address"
              status={
                errors.senderAddress?.street?.message ? 'danger' : 'primary'
              }
              error={errors.senderAddress?.street?.message}
              className={styles.fieldSeparator}
              {...register('senderAddress.street', validation)}
            />

            <div className={`${styles.addressSet} ${styles.fieldSeparator}`}>
              <TextField
                status={
                  errors.senderAddress?.city?.message ? 'danger' : 'primary'
                }
                error={errors.senderAddress?.city?.message}
                {...register('senderAddress.city', validation)}
                label="City"
              />

              <TextField
                label="Post Code"
                className={styles.postcode}
                status={
                  errors.senderAddress?.postCode?.message ? 'danger' : 'primary'
                }
                error={errors.senderAddress?.postCode?.message}
                {...register('senderAddress.postCode', validation)}
              />

              <TextField
                label="Country"
                status={
                  errors.senderAddress?.country?.message ? 'danger' : 'primary'
                }
                error={errors.senderAddress?.country?.message}
                {...register('senderAddress.country', validation)}
              />
            </div>
          </fieldset>

          {/* Bill To */}
          <fieldset className={styles.fieldset} name="Bill From">
            <legend>
              <Typography className={styles.fieldSetTitle}>Bill To</Typography>
            </legend>

            <TextField
              className={styles.fieldSeparator}
              label="Client's Name"
              status={errors.clientName?.message ? 'danger' : 'primary'}
              error={errors.clientName?.message}
              {...register('clientName', validation)}
            />

            <TextField
              label="Client's Email"
              placeholder="e.g email@example.com"
              {...register('clientEmail', {
                required: 'Your input is required',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Please provide a valid email',
                },
              })}
              status={errors.clientEmail?.message ? 'danger' : 'primary'}
              error={errors.clientEmail?.message}
              className={styles.fieldSeparator}
            />

            <TextField
              label="Street Address"
              {...register('clientAddress.street', validation)}
              className={styles.fieldSeparator}
              status={
                errors.clientAddress?.street?.message ? 'danger' : 'primary'
              }
              error={errors.clientAddress?.street?.message}
            />

            <div className={`${styles.addressSet} ${styles.fieldSeparator}`}>
              <TextField
                label="City"
                {...register('clientAddress.city', validation)}
                status={
                  errors.clientAddress?.city?.message ? 'danger' : 'primary'
                }
                error={errors.clientAddress?.city?.message}
              />

              <TextField
                label="Post Code"
                className={styles.postcode}
                {...register('clientAddress.postCode', validation)}
                status={
                  errors.clientAddress?.postCode?.message ? 'danger' : 'primary'
                }
                error={errors.clientAddress?.postCode?.message}
              />
              <TextField
                label="Country"
                {...register('clientAddress.country', validation)}
                status={
                  errors.clientAddress?.country?.message ? 'danger' : 'primary'
                }
                error={errors.clientAddress?.country?.message}
              />
            </div>
          </fieldset>

          {/* Dates */}
          <fieldset
            className={`${styles.fieldset} ${styles.fieldSeparator} ${styles.dateContainer}`}
          >
            <Controller
              name="createdAt"
              control={control}
              rules={{ required: 'Your input is required.' }}
              render={({ field: { value } }) => (
                <Datepicker
                  label="Invoice Date"
                  value={value}
                  onDateChange={value => setValue('createdAt', value)}
                />
              )}
            />

            <Controller
              name="paymentTerms"
              control={control}
              rules={{ required: 'Your input is required' }}
              render={({ field: { value } }) => (
                <Dropdown
                  containerClass={styles.paymentTerms}
                  label="Payment Terms"
                  value={value}
                  onSelectValue={value =>
                    setValue('paymentTerms', value as PaymentTerms)
                  }
                  options={PAYMENT_TERMS_OPTIONS}
                  accessor="label"
                />
              )}
            />
          </fieldset>

          {/* Project Description */}
          <fieldset>
            <TextField
              placeholder="e.g Graphic Design Service"
              label="Project Description"
              {...register('description', validation)}
              status={errors.description?.message ? 'danger' : 'primary'}
              error={errors.description?.message}
            />
          </fieldset>

          {/* Item list */}
          <fieldset className={styles.items}>
            <Typography
              status={itemsErr ? 'danger' : 'secondary'}
              category="h4"
              className={styles.itemsTitle}
            >
              Item List
            </Typography>

            <div className={styles.itemTable}>
              <div className={styles.itemRow}>
                <Typography status="tertiary" className={styles.itemCol}>
                  Item Name
                </Typography>
                <Typography status="tertiary" className={styles.itemCol}>
                  Qty.
                </Typography>
                <Typography status="tertiary" className={styles.itemCol}>
                  Price
                </Typography>
                <Typography status="tertiary" className={styles.itemCol}>
                  Total
                </Typography>
                <Typography status="tertiary" className={styles.itemCol} />
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className={`${styles.itemRow} ${styles.fieldSeparator}`}
                >
                  <div className={styles.itemCol}>
                    <TextField
                      {...register(`items.${index}.name`, validation)}
                      status={
                        errors.items?.[index]?.name?.message
                          ? 'danger'
                          : 'primary'
                      }
                    />
                  </div>

                  <div className={styles.itemCol}>
                    <TextField
                      key={field.id}
                      {...register(`items.${index}.quantity`, {
                        required: 'This input is required.',
                        valueAsNumber: true,
                        pattern: {
                          value: /[0-9]/g,
                          message: 'This field accepts only numbers',
                        },
                      })}
                      status={
                        errors.items?.[index]?.quantity?.message
                          ? 'danger'
                          : 'primary'
                      }
                    />
                  </div>

                  <div className={styles.itemCol}>
                    <TextField
                      key={field.id}
                      {...register(`items.${index}.price`, {
                        required: 'This input is required.',
                        valueAsNumber: true,
                        pattern: {
                          value: /[0-9]/g,
                          message: 'This field accepts only numbers',
                        },
                      })}
                      status={
                        errors.items?.[index]?.price?.message
                          ? 'danger'
                          : 'primary'
                      }
                    />
                  </div>

                  <div className={`${styles.itemCol} ${styles.total}`}>
                    <Typography>
                      {items[index].price * items[index].quantity
                        ? (items[index].price * items[index].quantity).toFixed(
                            2,
                          )
                        : 0}
                    </Typography>
                  </div>

                  <div className={styles.itemCol}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => remove(index)}
                    >
                      <Delete />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Typography status="danger" category="body4">
              {itemsErr}
            </Typography>

            <Button
              status="tertiary"
              type="button"
              fullWidth
              onClick={() =>
                append({ name: '', quantity: 0, price: 0, total: 0 })
              }
            >
              + Add New Item
            </Button>
          </fieldset>
        </div>
      </section>

      {/* Action butons */}
      <fieldset className={styles.actionBtns}>
        <Button
          type="button"
          onClick={onCancel}
          size="small"
          status="tertiary-alternative"
        >
          Discard
        </Button>

        <div className={styles.mainBtns}>
          <Button
            status="secondary"
            size="small"
            type="button"
            onClick={onSubmitDraft}
          >
            Save as draft
          </Button>

          <Button status="primary" size="small" type="submit">
            Save and Send
          </Button>
        </div>
      </fieldset>
    </form>
  );
};

export default InvoiceForm;
