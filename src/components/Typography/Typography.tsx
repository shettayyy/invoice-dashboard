import { FC, HTMLProps } from 'react';
import styles from './Typography.module.css';

enum Category {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',

  body1 = 'body1',
  body2 = 'body2',
  body3 = 'body3',
  body4 = 'body4',
}

enum Status {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Danger = 'danger',
}

enum Align {
  Right = 'right',
  Left = 'left',
  Center = 'center',
}

interface Props extends HTMLProps<HTMLSpanElement> {
  category?: `${Category}`;
  status?: `${Status}`;
  align?: `${Align}`;
}

const Typography: FC<Props> = props => {
  const {
    children,
    category = 'body4',
    status = 'primary',
    align = 'left',
    className = '',
    ...otherProps
  } = props;

  return (
    <span
      {...otherProps}
      className={`
        ${styles.typography} 
        ${styles[align]}
        ${styles[category]} 
        ${styles['text-' + status]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Typography;
