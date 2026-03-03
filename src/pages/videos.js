import React, {useState, useCallback, useEffect} from 'react';
import Layout from '@theme/Layout';
import styles from './videos.module.css';
import videosData from '../data/videos.json';

const CATEGORIES = [
  {id: 'all', label: 'すべて'},
  {id: 'getting-started', label: 'はじめに'},
  {id: 'basic', label: '車両モデル'},
  {id: 'simulation', label: 'シミュレーション'},
  {id: 'advanced', label: '応用・拡張'},
];

function VideoCard({video, onPlay}) {
  const categoryLabel =
    CATEGORIES.find((c) => c.id === video.category)?.label || video.category;

  return (
    <div
      className={styles.videoCard}
      onClick={() => video.url && onPlay(video)}
      role={video.url ? 'button' : undefined}
      tabIndex={video.url ? 0 : undefined}
      onKeyDown={(e) => {
        if (video.url && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onPlay(video);
        }
      }}>
      <div className={styles.thumbnailArea}>
        <div className={styles.playOverlay}>
          <div className={styles.playIcon}>
            <div className={styles.playTriangle} />
          </div>
        </div>
        {video.duration && (
          <span className={styles.durationBadge}>{video.duration}</span>
        )}
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardCategory}>{categoryLabel}</span>
        <h3 className={styles.cardTitle}>{video.title}</h3>
        <p className={styles.cardDescription}>{video.description}</p>
        {!video.url && (
          <span className={styles.noUrl}>動画 URL 未設定</span>
        )}
      </div>
    </div>
  );
}

function VideoModal({video, onClose}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{video.title}</h3>
          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="閉じる">
            &times;
          </button>
        </div>
        <div className={styles.modalVideo}>
          <iframe
            src={video.url}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [playingVideo, setPlayingVideo] = useState(null);

  const filtered =
    activeCategory === 'all'
      ? videosData
      : videosData.filter((v) => v.category === activeCategory);

  const handlePlay = useCallback((video) => {
    setPlayingVideo(video);
  }, []);

  const handleClose = useCallback(() => {
    setPlayingVideo(null);
  }, []);

  return (
    <Layout title="動画ライブラリ" description="CarSim 学習動画の一覧">
      <main className={styles.videosPage}>
        <h1 className={styles.pageTitle}>動画ライブラリ</h1>
        <p className={styles.pageDescription}>
          CarSim の操作方法や活用テクニックを動画で学べます。
        </p>

        <div className={styles.filterBar}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.filterButton} ${
                activeCategory === cat.id ? styles.filterButtonActive : ''
              }`}
              onClick={() => setActiveCategory(cat.id)}>
              {cat.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className={styles.videoGrid}>
            {filtered.map((video) => (
              <VideoCard key={video.id} video={video} onPlay={handlePlay} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>このカテゴリの動画はまだありません。</p>
          </div>
        )}

        {playingVideo && (
          <VideoModal video={playingVideo} onClose={handleClose} />
        )}
      </main>
    </Layout>
  );
}
