import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useProgress } from '@/context/ProgressContext';
import { ALL_QUESTIONS } from '@/hooks/useQuestions';
import styles from './Navbar.module.css';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { getProgressStats } = useProgress();

  const allIds = ALL_QUESTIONS.map((q) => q.id);
  const stats = getProgressStats(allIds);

  return (
    <nav className={styles.navbar} id="main-navbar">
      <div className={styles.navbar__inner}>
        {/* Brand / Logo */}
        <Link to="/" className={styles.navbar__brand}>
          <span className={styles.navbar__logo}>🧠</span>
          <div>
            <div className={styles.navbar__title}>Frontend Q-Bank</div>
            <div className={styles.navbar__subtitle}>Interview Patterns</div>
          </div>
        </Link>

        {/* Right side actions */}
        <div className={styles.navbar__actions}>
          {/* Progress stats pill */}
          <div className={styles.navbar__stats}>
            <span>✅</span>
            <span className={styles['navbar__stats-count']}>
              {stats.done}/{stats.total}
            </span>
            <span>done</span>
          </div>

          {/* Theme toggle */}
          <button
            className={styles['navbar__theme-btn']}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
