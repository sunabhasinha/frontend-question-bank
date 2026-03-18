import { useState, useMemo } from 'react';
import { TOPICS } from '@/data/topics';

// Import all question files statically
import eventLoop from '@/data/questions/eventLoop.json';
import thisKeyword from '@/data/questions/thisKeyword.json';
import scopeHoisting from '@/data/questions/scopeHoisting.json';
import closures from '@/data/questions/closures.json';
import typeCoercion from '@/data/questions/typeCoercion.json';
import objectReferences from '@/data/questions/objectReferences.json';
import prototypes from '@/data/questions/prototypes.json';
import es6Quirks from '@/data/questions/es6Quirks.json';

// Map topic fileName to imported data
const QUESTION_MAP = {
  eventLoop,
  thisKeyword,
  scopeHoisting,
  closures,
  typeCoercion,
  objectReferences,
  prototypes,
  es6Quirks,
};

// All questions flattened into a single array
const ALL_QUESTIONS = Object.values(QUESTION_MAP).flat();

function useQuestions({ topicId = null, search = '', difficulty = '' } = {}) {
  const [searchTerm, setSearchTerm] = useState(search);
  const [difficultyFilter, setDifficultyFilter] = useState(difficulty);
  const [statusFilter, setStatusFilter] = useState('');

  // Get questions for a specific topic or all
  const baseQuestions = useMemo(() => {
    if (topicId) {
      const topic = TOPICS.find((t) => t.id === topicId);
      if (topic) {
        return QUESTION_MAP[topic.fileName] || [];
      }
      return [];
    }
    return ALL_QUESTIONS;
  }, [topicId]);

  // Apply search + difficulty filters
  const filteredQuestions = useMemo(() => {
    let result = baseQuestions;

    // Search filter — searches title, tags, mentalModel
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (q) =>
          q.title.toLowerCase().includes(term) ||
          q.mentalModel.toLowerCase().includes(term) ||
          q.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    // Difficulty filter
    if (difficultyFilter) {
      result = result.filter((q) => q.difficulty === difficultyFilter);
    }

    return result;
  }, [baseQuestions, searchTerm, difficultyFilter]);

  // Get topic metadata for a topic ID
  const getTopicMeta = (id) => TOPICS.find((t) => t.id === id);

  // Get question count per topic
  const getTopicQuestionCount = (id) => {
    const topic = TOPICS.find((t) => t.id === id);
    if (!topic) return 0;
    return (QUESTION_MAP[topic.fileName] || []).length;
  };

  // Get all question IDs for a topic
  const getTopicQuestionIds = (id) => {
    const topic = TOPICS.find((t) => t.id === id);
    if (!topic) return [];
    return (QUESTION_MAP[topic.fileName] || []).map((q) => q.id);
  };

  return {
    questions: filteredQuestions,
    allQuestions: ALL_QUESTIONS,
    topics: TOPICS,
    searchTerm,
    setSearchTerm,
    difficultyFilter,
    setDifficultyFilter,
    statusFilter,
    setStatusFilter,
    getTopicMeta,
    getTopicQuestionCount,
    getTopicQuestionIds,
  };
}

export { useQuestions, ALL_QUESTIONS, QUESTION_MAP };
