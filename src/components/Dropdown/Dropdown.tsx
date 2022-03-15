import React, {
  forwardRef,
  HTMLProps,
  useCallback,
  useEffect,
  useState,
} from 'react';
import TextField from '../TextField/TextField';
import styles from './Dropdown.module.css';
import { ReactComponent as ArrowDown } from '../../assets/icons/icon-arrow-down.svg';
import Typography from '../Typography/Typography';
import useOutsideClick from '../../hooks/useOutsideClick';

enum Status {
  Primary = 'primary',
}

enum Appearance {
  Filled = 'filled',
  Ghost = 'ghost',
}

type OptionAttributes = Record<string, unknown>;

type Options =
  | {
      options: string[];
      accessor?: never;
    }
  | {
      options: OptionAttributes[];
      accessor: string;
    };

interface Props extends Omit<HTMLProps<HTMLInputElement>, 'value'> {
  status?: `${Status}`;
  value: string | OptionAttributes;
  onSelectValue: (value: unknown) => unknown;
  appearance?: `${Appearance}`;
  defaultLabel?: string;
  containerClass?: string;
}

const verifyOptionsText = (menuOptions: string[]) =>
  menuOptions?.every(option => typeof option === 'string');

const Dropdown = forwardRef<null, Props & Options>((props, ref) => {
  const {
    label,
    appearance = 'filled',
    className = '',
    containerClass = '',
    onSelectValue,
    status = 'primary',
    options,
    accessor,
    placeholder,
    defaultLabel = '',
    value,
    ...otherProps
  } = props;
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const [clickedOutside, setElem] = useOutsideClick<HTMLFieldSetElement>();

  useEffect(() => {
    if (value) {
      setSelectedLabel('');
    }
    if (typeof value === 'string') {
      setSelectedLabel(value);
    } else if (accessor) {
      setSelectedLabel(value[accessor] as string);
    }
  }, [accessor, value]);

  const onSelectText = useCallback(
    (option: string) => {
      onSelectValue(option);
      setOpen(false);
    },
    [onSelectValue],
  );

  const onSelect = useCallback(
    (option: OptionAttributes) => {
      onSelectValue(option);
      setOpen(false);
    },
    [onSelectValue],
  );

  const renderOptions = useCallback(
    (menuOptions: Options['options']) => {
      // If the options is a set of array of strings, render it directly
      if (verifyOptionsText(menuOptions as string[])) {
        return menuOptions.map(option => (
          <li
            className={styles.dropdownItem}
            onClick={() => onSelectText(option as string)}
            key={option as string}
          >
            <Typography>{option}</Typography>
          </li>
        ));
      }

      // if the options is a set of objects, render it's label
      return (menuOptions as OptionAttributes[]).map(option => {
        const typedOption = option[accessor as string] as string;

        return (
          <li
            className={styles.dropdownItem}
            key={typedOption}
            onClick={() => onSelect(option)}
          >
            <Typography>{typedOption}</Typography>
          </li>
        );
      });
    },
    [accessor, onSelect, onSelectText],
  );

  useEffect(() => {
    if (clickedOutside) {
      setOpen(false);
    }
  }, [clickedOutside]);

  return (
    <fieldset
      ref={ref => setElem(ref)}
      className={`
        ${styles.dropdownContainer} 
        ${styles[status]} 
        ${containerClass}
      `}
    >
      <TextField
        {...(otherProps as unknown)}
        ref={ref as never}
        placeholder={placeholder || 'Please select an option'}
        status={status}
        inputClassName={`${styles.dropdown} ${styles[appearance]} ${className}`}
        label={label}
        value={selectedLabel || defaultLabel}
        rightAccessory={() => <ArrowDown />}
        onClick={() => setOpen(prevOpen => !prevOpen)}
        readOnly
      />

      {open && (
        <ul className={styles.dropdownMenu}>{renderOptions(options)}</ul>
      )}
    </fieldset>
  );
});

export default React.memo(Dropdown);
