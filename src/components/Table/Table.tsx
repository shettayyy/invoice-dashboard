import React, { HTMLProps, useCallback, useMemo } from 'react';
import { Typography } from '..';
import styles from './Table.module.css';

export interface AccessorComponentProps<T> {
  label: string;
  value: T;
}

export interface Accessor<T> {
  accessor: string;
  component?: React.FC<AccessorComponentProps<T>>;
  cellClass?: string;
}

const Cell: React.FC<HTMLProps<HTMLDivElement>> = ({ children, className }) => (
  <div className={`${styles.cell} ${className}`}>{children}</div>
);

interface Props<T> {
  options: Array<T>;
  accessors: Accessor<T>[];
  onRowClick?: (optionItem: T, index: number) => unknown;
  containerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
}

const Table = <T,>({
  options,
  accessors,
  onRowClick = () => null,
  containerClassName = '',
  rowClassName = '',
  cellClassName = '',
}: Props<T>) => {
  const memoizedAccessors = useMemo(() => accessors, [accessors]);
  const memoizedOptions = useMemo(() => options, [options]);

  const renderCell = useCallback(
    (item: T, accessorList: Props<T>['accessors']) => {
      return accessorList.map((accessorItem, index) => {
        if (item && Object.keys(item).length) {
          const label = (item as unknown as { [key: string]: unknown })[
            accessorItem.accessor
          ] as string;
          const cellStyle = `${accessorItem.cellClass ?? ''} ${cellClassName}`;

          // render a component if it exists
          if (accessorItem.component) {
            const { component: Component } = accessorItem;

            return (
              <Cell className={cellStyle} key={index}>
                <Component label={label} value={item} />
              </Cell>
            );
          }

          return (
            <Cell className={cellStyle} key={index}>
              <Typography className={styles.tableCellLabel} category="body4">
                {label}
              </Typography>
            </Cell>
          );
        }

        return null;
      });
    },
    [cellClassName],
  );

  const renderRow = useCallback(
    (optionList: Props<T>['options'], accessorList: Props<T>['accessors']) => {
      return optionList.map((optionItem, index) => (
        <div
          onClick={() => onRowClick(optionItem, index)}
          className={`${styles.row} ${rowClassName}`}
          key={index}
        >
          {renderCell(optionItem, accessorList)}
        </div>
      ));
    },
    [onRowClick, renderCell, rowClassName],
  );

  return (
    <div className={`${styles.container} ${containerClassName}`}>
      <div className={styles.table}>
        {renderRow(memoizedOptions, memoizedAccessors)}
      </div>
    </div>
  );
};

export default Table;
