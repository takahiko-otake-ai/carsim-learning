import React from 'react';
import styles from './styles.module.css';

export default function VideoEmbed({url, title, description}) {
  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoWrapper}>
        <iframe
          src={url}
          title={title}
          className={styles.videoFrame}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {(title || description) && (
        <div className={styles.videoInfo}>
          {title && <h4 className={styles.videoTitle}>{title}</h4>}
          {description && <p className={styles.videoDescription}>{description}</p>}
        </div>
      )}
    </div>
  );
}
