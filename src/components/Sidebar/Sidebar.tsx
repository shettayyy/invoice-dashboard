import { ReactComponent as Moon } from '../../assets/icons/icon-moon.svg';
import Avatar from '../../assets/images/image-avatar.jpg';
import { ReactComponent as Sun } from '../../assets/icons/icon-sun.svg';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import styles from './Sidebar.module.css';
import useTheme, { ColorScheme } from '../../hooks/useTheme';

const Sidebar = () => {
  const [theme, switchTheme] = useTheme();

  return (
    <nav className={styles.container}>
      <span className={styles.logoContainer}>
        <Logo className={styles.logo} />
        <span className={styles.logoShade} />
      </span>

      <div className={styles.menu}>
        <span onClick={switchTheme}>
          {theme === ColorScheme.Dark ? <Moon /> : <Sun />}
        </span>

        <span className={styles.avatar}>
          <img src={Avatar} alt="Avatar" />
        </span>
      </div>
    </nav>
  );
};

export default Sidebar;
