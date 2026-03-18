import styles from './ProgressBar.module.css';

function ProgressBar({ done = 0, total = 1, showLabel = false, large = false }) {
  const percentage = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div>
      {showLabel && (
        <div className={styles['progress-bar__label']}>
          <span>{done} of {total} completed</span>
          <span className={styles['progress-bar__percentage']}>{percentage}%</span>
        </div>
      )}
      <div
        className={`${styles['progress-bar']} ${large ? styles['progress-bar--lg'] : ''}`}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${percentage}% complete`}
      >
        <div
          className={styles['progress-bar__fill']}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export { ProgressBar };
