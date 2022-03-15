import { Button, Typography } from '..';
import { Status } from '../Button/Button';
import styles from './ConfirmationModal.module.css';

interface Props {
  visible: boolean;
  title: string;
  message: string;
  buttonLabel: string;
  buttonStatus: `${Status}`;
  onClick: () => unknown;
  onClose: () => unknown;
}

const ConfirmationModal: React.FC<Props> = ({
  visible,
  title,
  message,
  buttonLabel,
  buttonStatus = 'primary',
  onClose,
  onClick,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <Typography category="h2">{title}</Typography>

        <Typography
          status="tertiary"
          category="body2"
          className={styles.message}
        >
          {message}
        </Typography>

        <div className={styles.actionBtns}>
          <Button status="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button status={buttonStatus} onClick={onClick}>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
