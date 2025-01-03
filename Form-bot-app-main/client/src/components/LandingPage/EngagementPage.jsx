import { useNavigate } from "react-router-dom";
import styles from "./Engagement.module.css";

function Engagement() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>
          Improve conversion and user engagement <br />
          with FormBots{" "}
        </h1>
        <button className={`${styles.button}`} onClick={() => navigate('/register')}>Create a FormBot</button>
        <p>
          No trial. Generous <span className={styles.highlighter}>free</span>{" "}
          plan.
        </p>
      </div>
    </div>
  );
}

export default Engagement;