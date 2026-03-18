import styles from './FilterBar.module.css';

const DIFFICULTY_OPTIONS = [
  { value: 'mid', label: 'Mid', color: 'var(--color-difficulty-mid)' },
  { value: 'senior', label: 'Senior', color: 'var(--color-difficulty-senior)' },
  { value: 'staff', label: 'Staff', color: 'var(--color-difficulty-staff)' },
];

const STATUS_OPTIONS = [
  { value: 'done', label: '✅ Done' },
  { value: 'review', label: '🔁 Review' },
  { value: 'unseen', label: '⬜ Unseen' },
];

function FilterBar({ difficulty, onDifficultyChange, status, onStatusChange }) {
  return (
    <div className={styles['filter-bar']} id="filter-bar">
      {/* Difficulty filter */}
      <span className={styles['filter-bar__label']}>Difficulty:</span>
      <div className={styles['filter-bar__pills']}>
        {DIFFICULTY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`${styles['filter-pill']} ${
              difficulty === opt.value ? styles['filter-pill--active'] : ''
            }`}
            onClick={() => onDifficultyChange(difficulty === opt.value ? '' : opt.value)}
            id={`filter-difficulty-${opt.value}`}
          >
            <span
              className={styles['filter-pill__dot']}
              style={{ background: opt.color }}
            />
            {opt.label}
          </button>
        ))}
      </div>

      {/* Status filter */}
      <span className={styles['filter-bar__label']}>Status:</span>
      <div className={styles['filter-bar__pills']}>
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`${styles['filter-pill']} ${
              status === opt.value ? styles['filter-pill--active'] : ''
            }`}
            onClick={() => onStatusChange(status === opt.value ? '' : opt.value)}
            id={`filter-status-${opt.value}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export { FilterBar };
