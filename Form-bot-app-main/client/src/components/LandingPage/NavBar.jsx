import {logo} from '../../data/useImportAssets'
import styles from './NavBar.module.css';
import {Link} from 'react-router-dom';
const NavBar =()=> {
    return (
      <div className={styles.headerMainNavigation}>
        <div className={styles.container}>
          <div className={styles.link}>
            <img className={styles.svgIcon} alt="" src={logo} />
            <div className={styles.container1}>
              <a className={styles.formbot}>FormBot</a>
            </div>
          </div>
        </div>
        <div className={styles.nav}>
          <Link className={styles.link1} to="/login">
            <span className={styles.signIn}>Sign in</span>
          </Link>
          <button className={styles.link2}>
            <Link to="/register" className={styles.createAFormbot}>Create a FormBot</Link>
          </button>
        </div>
      </div>
    );
  }
  
  export default NavBar;