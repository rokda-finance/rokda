import React from 'react';

const Tools = ({ handleFileUpload }: { handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className="App-tools" style={{ border: '2px solid #61dafb', padding: '1rem', borderRadius: '8px' }}>
      <h2 style={{ color: '#61dafb' }}>Tools</h2>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="App-upload-input"
      />
    </div>
  );
};

export default Tools;