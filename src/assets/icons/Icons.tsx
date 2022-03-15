import { HTMLProps } from 'react';
import { ReactComponent as Plus } from './icon-plus.svg';
import styles from './Icons.module.css';

type IconProps = HTMLProps<SVGElement>;

export const RoundedPlus: React.FC<IconProps> = ({
  className = '',
  width,
  height,
}) => (
  <span className={`${styles.rounded} ${className}`} style={{ width, height }}>
    <Plus />
  </span>
);
