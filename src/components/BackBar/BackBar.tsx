import { Link } from 'react-router-dom';
import { Typography } from '..';
import { ROUTE_PATH } from '../../types/navigation';
import { ReactComponent as ArrowRight } from '../../assets/icons/icon-arrow-left.svg';
import styles from './BackBar.module.css';

interface Props {
  to?: string;
}

const BackBar: React.FC<Props> = ({ to = ROUTE_PATH.INVOICES }) => {
  return (
    <nav className={styles.navigation}>
      <Link to={to} className={styles.link}>
        <ArrowRight className={styles.icon} />
        <Typography category="body4">Go back</Typography>
      </Link>
    </nav>
  );
};

export default BackBar;
