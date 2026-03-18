import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuestions } from '@/hooks/useQuestions';
import { useProgress } from '@/context/ProgressContext';
import { QuestionCard } from '@/components/QuestionCard/QuestionCard';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { FilterBar } from '@/components/FilterBar/FilterBar';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';

function TopicPage() {
  const { topicId } = useParams();
  const {
    questions,
    searchTerm,
    setSearchTerm,
    difficultyFilter,
    setDifficultyFilter,
    statusFilter,
    setStatusFilter,
    getTopicMeta,
    getTopicQuestionIds,
  } = useQuestions({ topicId });

  const { getProgressStats, getStatus } = useProgress();

  const topic = getTopicMeta(topicId);
  const allTopicIds = getTopicQuestionIds(topicId);
  const stats = getProgressStats(allTopicIds);

  // Apply status filter on top of search + difficulty filtered questions
  const displayedQuestions = useMemo(() => {
    if (!statusFilter) return questions;
    return questions.filter((q) => {
      const qStatus = getStatus(q.id);
      return qStatus === statusFilter;
    });
  }, [questions, statusFilter, getStatus]);

  if (!topic) {
    return (
      <main className="container" style={{ paddingTop: 'var(--space-16)', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
          Topic not found
        </h1>
        <Link to="/" style={{ fontSize: 'var(--text-lg)' }}>
          ← Back to all topics
        </Link>
      </main>
    );
  }

  return (
    <main className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>
      {/* Back link */}
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-muted)',
          marginBottom: 'var(--space-6)',
          transition: 'color var(--transition-fast)',
        }}
        id="back-link"
      >
        ← All Topics
      </Link>

      {/* Topic header */}
      <header
        style={{
          marginBottom: 'var(--space-8)',
          animation: 'fadeInUp var(--transition-slow) ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-3)',
          }}
        >
          <span style={{ fontSize: 'var(--text-4xl)' }}>{topic.icon}</span>
          <div>
            <h1
              style={{
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-weight-extrabold)',
                letterSpacing: '-0.02em',
              }}
            >
              {topic.name}
            </h1>
            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-base)',
                marginTop: 'var(--space-1)',
              }}
            >
              {topic.description}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ maxWidth: '400px', marginTop: 'var(--space-4)' }}>
          <ProgressBar done={stats.done} total={stats.total} showLabel />
        </div>
      </header>

      {/* Search + Filters */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)',
          padding: 'var(--space-5)',
          background: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
        }}
      >
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <FilterBar
          difficulty={difficultyFilter}
          onDifficultyChange={setDifficultyFilter}
          status={statusFilter}
          onStatusChange={setStatusFilter}
        />
      </div>

      {/* Results count */}
      <div
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-muted)',
          marginBottom: 'var(--space-4)',
        }}
      >
        Showing {displayedQuestions.length} of {allTopicIds.length} questions
      </div>

      {/* Question list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {displayedQuestions.length > 0 ? (
          displayedQuestions.map((question, i) => (
            <QuestionCard key={question.id} question={question} index={i} />
          ))
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: 'var(--space-16)',
              color: 'var(--color-text-muted)',
            }}
          >
            <div style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
              🔍
            </div>
            <p style={{ fontSize: 'var(--text-lg)' }}>
              No questions match your filters
            </p>
            <p style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export { TopicPage };
