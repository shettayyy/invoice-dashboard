import React, { forwardRef, HTMLProps, useEffect, useState } from 'react';
import CalendarView from 'react-calendar';
import TextField from '../TextField/TextField';
import { ReactComponent as CalendarIcon } from '../../assets/icons/icon-calendar.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/icon-arrow-right.svg';
import { ReactComponent as ArrowLeft } from '../../assets/icons/icon-arrow-left.svg';
import useOutsideClick from '../../hooks/useOutsideClick';
import { format } from 'date-fns';
import styles from './Datepicker.module.css';

enum Status {
  Primary = 'primary',
}

interface Props extends Omit<HTMLProps<HTMLInputElement>, 'value'> {
  status?: `${Status}`;
  onDateChange: (date: Date) => unknown;
  value: Date;
}

const Datepicker = forwardRef<null, Props>((props, ref) => {
  const {
    label,
    className = '',
    status = 'primary',
    onDateChange,
    value,
    ...otherProps
  } = props;
  const [open, setOpen] = useState(false);
  const [clickedOutside, setElem] = useOutsideClick<HTMLFieldSetElement>();
  const [dateValue, setDateValue] = useState(new Date());

  useEffect(() => {
    if (value) {
      setDateValue(new Date(value));
    }
  }, [value]);

  useEffect(() => {
    if (clickedOutside) {
      setOpen(false);
    }
  }, [clickedOutside]);

  return (
    <fieldset
      ref={ref => setElem(ref)}
      className={`${styles.dropdownContainer} ${styles[status]}`}
    >
      <TextField
        {...(otherProps as unknown)}
        ref={ref as never}
        status={status}
        inputClassName={`${styles.dropdown} ${className}`}
        label={label}
        value={format(dateValue, 'd MMM yyyy')}
        rightAccessory={() => <CalendarIcon />}
        onClick={() => setOpen(prevOpen => !prevOpen)}
        readOnly
      />

      {open && (
        <CalendarView
          prevLabel={<ArrowLeft className={styles.navigationIcon} />}
          nextLabel={<ArrowRight className={styles.navigationIcon} />}
          navigationLabel={({ date, label, view }) => {
            if (view === 'month') {
              return format(date, 'MMM yyyy');
            }

            return label;
          }}
          next2Label={null}
          prev2Label={null}
          onChange={(date: Date) => {
            onDateChange(date);
            setOpen(false);
          }}
          value={dateValue}
          className={styles.calendar}
        />
      )}
    </fieldset>
  );
});

export default React.memo(Datepicker);
