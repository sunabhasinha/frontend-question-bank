import { useQuestions } from '@/hooks/useQuestions';
import { useProgress } from '@/context/ProgressContext';
import { TopicCard } from '@/components/TopicCard/TopicCard';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';

function HomePage() {
  const { topics, allQuestions, getTopicQuestionCount, getTopicQuestionIds } = useQuestions();
  const { getProgressStats } = useProgress();

  // Overall stats
  const allIds = allQuestions.map((q) => q.id);
  const overallStats = getProgressStats(allIds);

  return (
    <main className="container" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-16)' }}>
      {/* Hero section */}
      <section
        style={{
          textAlign: 'center',
          marginBottom: 'var(--space-12)',
          animation: 'fadeInUp var(--transition-slow) ease',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, var(--text-5xl))',
            fontWeight: 'var(--font-weight-extrabold)',
            letterSpacing: '-0.03em',
            lineHeight: 'var(--leading-tight)',
            marginBottom: 'var(--space-4)',
          }}
        >
          Master Frontend
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Interview Patterns
          </span>
        </h1>
        <p
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto var(--space-8)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          Build the mental models you need. {allQuestions.length} output-based questions
          organized by pattern — not just topic.
        </p>

        {/* Overall progress */}
        <div
          style={{
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <ProgressBar done={overallStats.done} total={overallStats.total} showLabel large />
        </div>
      </section>

      {/* Topic grid */}
      <section>
        <h2
          style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: 'var(--space-6)',
            color: 'var(--color-text-secondary)',
          }}
        >
          Choose a Pattern
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {topics.map((topic, i) => (
            <div
              key={topic.id}
              style={{
                animationDelay: `${i * 60}ms`,
              }}
              className="animate-fade-in-up"
            >
              <TopicCard
                topic={topic}
                questionCount={getTopicQuestionCount(topic.id)}
                questionIds={getTopicQuestionIds(topic.id)}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export { HomePage };
