import { Link } from 'react-router-dom';
import { useProgress } from '@/context/ProgressContext';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import styles from './TopicCard.module.css';

function TopicCard({ topic, questionCount, questionIds }) {
  const { getProgressStats } = useProgress();
  const stats = getProgressStats(questionIds);

  return (
    <Link
      to={`/topic/${topic.id}`}
      className={styles['topic-card']}
      style={{ '--topic-color': topic.color }}
      id={`topic-card-${topic.id}`}
    >
      {/* Header: icon + count */}
      <div className={styles['topic-card__header']}>
        <span className={styles['topic-card__icon']}>{topic.icon}</span>
        <span className={styles['topic-card__count']}>
          {questionCount} {questionCount === 1 ? 'Q' : 'Qs'}
        </span>
      </div>

      {/* Title */}
      <h3 className={styles['topic-card__name']}>{topic.name}</h3>

      {/* Description */}
      <p className={styles['topic-card__desc']}>{topic.description}</p>

      {/* Progress bar */}
      <div className={styles['topic-card__footer']}>
        <ProgressBar done={stats.done} total={stats.total} />
      </div>
    </Link>
  );
}

export { TopicCard };
