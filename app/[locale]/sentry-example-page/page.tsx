'use client';

export default function SentryExamplePage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Sentry Error Testing Page</h1>
      <p>This page is for testing Sentry error tracking.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
          onClick={() => {
            throw new Error('Test error from Sentry example page');
          }}
        >
          Trigger Error
        </button>
        
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          onClick={() => {
            // @ts-ignore
            myUndefinedFunction();
          }}
        >
          Call Undefined Function
        </button>
      </div>
      
      <div style={{ marginTop: '2rem', color: '#666' }}>
        <p>Click either button to test Sentry error tracking.</p>
        <p>After clicking, check your Sentry dashboard for the error report.</p>
      </div>
    </div>
  );
}