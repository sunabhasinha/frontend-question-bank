import { useState } from 'react';
import { useProgress } from '@/context/ProgressContext';
import styles from './QuestionCard.module.css';

const DIFFICULTY_LABELS = {
  mid: '🟢 Mid',
  senior: '🟡 Senior',
  staff: '🔴 Staff',
};

function QuestionCard({ question, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const { getStatus, markDone, markReview, clearMark } = useProgress();

  const status = getStatus(question.id);

  const handleDoneClick = () => {
    // Toggle: if already done, clear it
    if (status === 'done') {
      clearMark(question.id);
    } else {
      markDone(question.id);
    }
  };

  const handleReviewClick = () => {
    // Toggle: if already review, clear it
    if (status === 'review') {
      clearMark(question.id);
    } else {
      markReview(question.id);
    }
  };

  return (
    <article className={styles['question-card']} id={`question-${question.id}`}>
      {/* Header — clickable to expand */}
      <div
        className={styles['question-card__header']}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className={styles['question-card__header-left']}>
          {/* Meta: index + difficulty */}
          <div className={styles['question-card__meta']}>
            <span className={styles['question-card__number']}>
              #{String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={`${styles.badge} ${styles[`badge--${question.difficulty}`]}`}
            >
              {DIFFICULTY_LABELS[question.difficulty]}
            </span>
          </div>

          {/* Title */}
          <h3 className={styles['question-card__title']}>{question.title}</h3>

          {/* Mental model one-liner */}
          <p className={styles['question-card__mental-model']}>
            💡 {question.mentalModel}
          </p>
        </div>

        {/* Status indicator */}
        <span style={{ fontSize: 'var(--text-xl)', flexShrink: 0 }}>
          {status === 'done' ? '✅' : status === 'review' ? '🔁' : ''}
        </span>
      </div>

      {/* Code snippet — always visible */}
      <pre className={styles['question-card__code']}>
        <code>{question.code}</code>
      </pre>

      {/* Toggle answer button */}
      <button
        className={styles['question-card__toggle']}
        onClick={() => setIsOpen(!isOpen)}
        id={`toggle-${question.id}`}
      >
        <span
          className={`${styles['question-card__toggle-icon']} ${
            isOpen ? styles['question-card__toggle-icon--open'] : ''
          }`}
        >
          ▼
        </span>
        {isOpen ? 'Hide Answer' : 'Show Answer'}
      </button>

      {/* Collapsible Answer section */}
      {isOpen && (
        <div className={styles['question-card__answer']}>
          {/* Output */}
          <div className={styles['question-card__output-label']}>Output</div>
          <pre className={styles['question-card__output']}>{question.output}</pre>

          {/* Explanation */}
          <div className={styles['question-card__explanation-label']}>Explanation</div>
          <p className={styles['question-card__explanation']}>{question.explanation}</p>

          {/* Tags */}
          <div className={styles['question-card__tags']}>
            {question.tags.map((tag) => (
              <span key={tag} className={styles['question-card__tag']}>
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className={styles['question-card__actions']}>
            <button
              className={`${styles['action-btn']} ${styles['action-btn--done']} ${
                status === 'done' ? styles['action-btn--done-active'] : ''
              }`}
              onClick={handleDoneClick}
              id={`done-${question.id}`}
            >
              ✅ {status === 'done' ? 'Completed' : 'Mark Done'}
            </button>
            <button
              className={`${styles['action-btn']} ${styles['action-btn--review']} ${
                status === 'review' ? styles['action-btn--review-active'] : ''
              }`}
              onClick={handleReviewClick}
              id={`review-${question.id}`}
            >
              🔁 {status === 'review' ? 'In Review' : 'Review Later'}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export { QuestionCard };
