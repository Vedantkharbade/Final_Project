import {
  hero_left,
  hero_right,
  image_chat,
 
} from "../../data/useImportAssets";
import { useNavigate } from "react-router-dom";

import styles from "./Hero.module.css";
function Hero() {
  const navigate = useNavigate()
  return (
    <div className={`flex flex-col justify-between ${styles.wrapper}`}>
      <h1 className={`text-center ${styles.heading1}`}>
        Build advanced chatbots <br></br>{" "}
        <span className={styles.headingColor}>visually</span>
      </h1>

      <p className={`text-center ${styles.para}`}>
        Typebot gives you powerful blocks to create unique chat experiences.
        Embed them <br /> anywhere on your web/mobile apps and start collecting
        results like magic.
      </p>

      <button className={`${styles.button}`} onClick={() => navigate('/register')}>Create a FormBot for free</button>

      <div className={styles.img_section}>
        <img src={image_chat} />
      </div>
      
      <div className={styles.left_img_div}>
        <img src={hero_left} />
      </div>
      <div className={styles.right_img_div}>
        <img src={hero_right} />
      </div>
    </div>
  );
}

export default Hero;