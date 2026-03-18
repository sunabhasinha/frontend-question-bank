import { useRef } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ value, onChange, placeholder = 'Search questions by title, tag, or concept...' }) {
  const inputRef = useRef(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles['search-bar']}>
      <span className={styles['search-bar__icon']}>🔍</span>
      <input
        ref={inputRef}
        type="text"
        className={styles['search-bar__input']}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id="search-input"
        aria-label="Search questions"
      />
      {value && (
        <button
          className={styles['search-bar__clear']}
          onClick={handleClear}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export { SearchBar };
