import { createContext, useState, useCallback, useContext } from 'react';

const ProgressContext = createContext();

/*
  Progress State Shape:
  {
    "event-loop-001": "done",
    "closure-002": "review",
    // unseen questions simply don't exist in the map
  }
*/

function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    const stored = localStorage.getItem('qb-progress');
    return stored ? JSON.parse(stored) : {};
  });

  // Persist to localStorage whenever progress changes
  const persist = useCallback((updated) => {
    localStorage.setItem('qb-progress', JSON.stringify(updated));
  }, []);

  const markDone = useCallback((questionId) => {
    setProgress((prev) => {
      const updated = { ...prev, [questionId]: 'done' };
      persist(updated);
      return updated;
    });
  }, [persist]);

  const markReview = useCallback((questionId) => {
    setProgress((prev) => {
      const updated = { ...prev, [questionId]: 'review' };
      persist(updated);
      return updated;
    });
  }, [persist]);

  const clearMark = useCallback((questionId) => {
    setProgress((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      persist(updated);
      return updated;
    });
  }, [persist]);

  const getStatus = useCallback(
    (questionId) => progress[questionId] || 'unseen',
    [progress]
  );

  const getProgressStats = useCallback(
    (questionIds) => {
      const done = questionIds.filter((id) => progress[id] === 'done').length;
      const review = questionIds.filter((id) => progress[id] === 'review').length;
      const total = questionIds.length;
      return { done, review, unseen: total - done - review, total };
    },
    [progress]
  );

  return (
    <ProgressContext.Provider
      value={{ progress, markDone, markReview, clearMark, getStatus, getProgressStats }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}

export { ProgressProvider, useProgress };
