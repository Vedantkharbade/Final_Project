import { chat } from "../../data/useImportAssets";
import styles from "./Result.module.css";
const Result=()=> {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Collect results in real-time</h1>
        <p>
          One of the main advantage of a chat application is that you collect
          the user&apos;s responses on each question.
          <br></br>
          <span className={styles.highlighter}>
            You won&apos;t lose any valuable data.
          </span>
        </p>
      </div>
      <div>
        <img src={chat} />
      </div>
    </div>
  );
}

export default Result;