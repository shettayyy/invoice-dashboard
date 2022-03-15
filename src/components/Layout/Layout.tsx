import { HTMLProps } from 'react';
import styles from './Layout.module.css';

const Layout: React.FC<HTMLProps<HTMLDivElement>> = ({
  children,
  className = '',
}) => {
  return (
    <section className={`${styles.container} ${className}`}>{children}</section>
  );
};

export default Layout;
