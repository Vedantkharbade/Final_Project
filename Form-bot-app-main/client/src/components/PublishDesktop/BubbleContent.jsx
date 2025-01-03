import React from 'react';
import styles from './BubbleContent.module.css';

const BubbleContent = ({ content }) => {
  const isValidImageUrl = (url) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  const isValidVideoUrl = (url) => /\.(mp4|webm|ogg)$/.test(url);
  const isValidGifUrl = (url) => /\.(gif)$/.test(url);

  if (isValidImageUrl(content)) {
    return <img src={content} alt="Bubble content" className={styles.bubbleImage} />;
  } else if (isValidVideoUrl(content)) {
    return (
      <video controls className={styles.bubbleVideo}>
        <source src={content} type="video/mp4" />
        <source src={content} type="video/webm" />
        <source src={content} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    );
  } else if (isValidGifUrl(content)) {
    return <img src={content} alt="Bubble content" className={styles.bubbleImage} />;
  } else {
    return <div className={styles.bubbleContent}><span>{content}</span></div>;
  }
};

export default BubbleContent;
