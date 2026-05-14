import React from 'react';
import { Search, Plus } from 'lucide-react';

export default function Topbar({ setActiveTab, onSearch }) {
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    const handler = setTimeout(() => {
      onSearch?.(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  const handleAsk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveTab('Ask Doubt');
    }, 800);
  };

  return (
    <header className="topbar">
      <div className="search-container">
        <Search size={18} color="#8B949E" />
        <input 
          type="text" 
          placeholder="Search doubts, subjects or topics..." 
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button 
        className="btn-ask" 
        onClick={handleAsk}
        disabled={loading}
      >
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <Plus size={18} />
            <span>Ask Doubt</span>
          </>
        )}
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .btn-ask:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .topbar {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          border-bottom: 1px solid var(--border);
          background-color: var(--bg-deep);
          z-index: 10;
        }

        .search-container {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0 16px;
          width: 60%;
          height: 48px;
          transition: border-color 0.2s;
        }

        .search-container:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .search-input {
          background: none;
          border: none;
          color: var(--text-main);
          font-size: 0.95rem;
          width: 100%;
          outline: none;
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .btn-ask {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--primary);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-ask:hover {
          background-color: var(--primary-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
        }

        .btn-ask:active {
          transform: translateY(0);
        }
      `}} />
    </header>
  );
}
