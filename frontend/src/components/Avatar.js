import React from 'react';
import styles from '../styles/Avatar.module.css';

// This component displays an image, set its height and text if available
const Avatar = ({ src, height = 45, text }) => {
  // 1 - src is URL for avtar image
  // 2 - height is the height of avatar, it is 45 if not set
  // 3 - If text is available, it is right next to avatar
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt='avatar' />
      {text}
    </span>
  );
};

export default Avatar;