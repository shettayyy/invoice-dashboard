import { HTMLProps, useEffect, useState } from 'react';
import styles from './FormSlider.module.css';

interface Props extends HTMLProps<HTMLDivElement> {
  visible: boolean;
  onClose?: () => unknown;
}

const FormSlider: React.FC<Props> = ({
  children,
  visible,
  onClose = () => null,
  ...otherProps
}) => {
  const [sliderVisibile, setSliderVisible] = useState(visible);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (visible) {
      setSliderVisible(visible);
      setTimeout(() => setShowOverlay(visible), 10);
      setTimeout(() => setShowForm(visible), 20);
    } else {
      setShowForm(visible);
      setShowOverlay(visible);
      setTimeout(() => setSliderVisible(visible), 180);
    }
  }, [visible]);

  if (!sliderVisibile) {
    return null;
  }

  return (
    <div
      {...otherProps}
      className={`
        ${styles.formContainer} 
        ${showOverlay ? styles.showOverlay : ''}
      `}
      onClick={onClose}
    >
      <div className={`${styles.formWrap} ${showForm ? styles.showForm : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default FormSlider;
