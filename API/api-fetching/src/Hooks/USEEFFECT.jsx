import { useState } from 'react';

export default function TicketClassifier() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

  const handleSubmit = async (e) => {

    // if(hasFetched) return;
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }), // Matches TicketRequest schema
      });

      const data = await response.json();
 
      if (!response.ok) {
        // Captures either your status 400 error or Pydantic's 422 validation errors
        throw new Error(data.detail || data.error || 'Something went wrong');
      }

      setResult(data); // Matches TicketResponse schema ({ category, confidence })
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

return (
  <div style={{ 
    maxWidth: '540px', 
    margin: '4rem auto', 
    padding: '2.5rem', 
    fontFamily: 'Inter, system-ui, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
    border: '1px solid #f0f0f0'
  }}>
    <h2 style={{ 
      fontSize: '1.75rem', 
      fontWeight: '700', 
      color: '#1a1a1a', 
      marginTop: 0, 
      marginBottom: '0.5rem',
      letterSpacing: '-0.025em'
    }}>
      Support Ticket Classifier
    </h2>
    <p style={{ color: '#666666', fontSize: '0.95rem', marginBottom: '2rem' }}>
      Paste the raw ticket message below to instantly identify its classification.
    </p>

    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g., Unable to log into my account since this morning..."
        rows={5}
        style={{ 
          width: '100%', 
          boxSizing: 'border-box',
          marginBottom: '1.25rem', 
          padding: '1rem',
          borderRadius: '10px',
          border: '1px solid #e0e0e0',
          fontSize: '0.95rem',
          lineHeight: '1.5',
          fontFamily: 'inherit',
          resize: 'vertical',
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          backgroundColor: '#f9f9f9'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#4f46e5';
          e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.1)';
          e.target.style.backgroundColor = '#ffffff';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e0e0e0';
          e.target.style.boxShadow = 'none';
          e.target.style.backgroundColor = '#f9f9f9';
        }}
      />
      <button 
        type="submit" 
        disabled={loading} 
        style={{ 
          width: '100%', 
          padding: '0.875rem', 
          cursor: loading ? 'not-allowed' : 'pointer',
          backgroundColor: loading ? '#a5b4fc' : '#4f46e5',
          color: '#ffffff',
          border: 'none',
          borderRadius: '10px',
          fontWeight: '600',
          fontSize: '0.95rem',
          transition: 'background-color 0.2s',
        }}
      >
        {loading ? 'Classifying Data...' : 'Classify Ticket'}
      </button>
    </form>

    {error && (
      <div style={{ 
        marginTop: '1.5rem', 
        padding: '1rem', 
        backgroundColor: '#fef2f2', 
        border: '1px solid #fca5a5', 
        borderRadius: '10px',
        color: '#b91c1c',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>⚠️</span> {error}
      </div>
    )}

    {result && (
      <div style={{ 
        marginTop: '2rem', 
        padding: '1.25rem', 
        backgroundColor: '#f5f3ff', 
        border: '1px solid #ddd6fe', 
        borderRadius: '12px' 
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#4c1d95', fontWeight: '600' }}>
          Prediction Results
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eedeff', paddingBottom: '0.5rem' }}>
            <span style={{ color: '#6d28d9' }}>Category</span>
            <strong style={{ color: '#1e1b4b', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em', backgroundColor: '#e0e7ff', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
              {result.category}
            </strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.25rem' }}>
            <span style={{ color: '#6d28d9' }}>Confidence Score</span>
            <strong style={{ color: '#1e1b4b' }}>{(result.confidence * 100).toFixed(1)}%</strong>
          </div>
        </div>
      </div>
    )}
  </div>
);

}
