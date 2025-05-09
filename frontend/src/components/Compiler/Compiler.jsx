import React, { useState } from 'react';
import { FiPlay, FiCopy, FiSave } from 'react-icons/fi';
import './Compiler.css';

const languages = [
  { id: 71, name: 'Python' },
  { id: 63, name: 'JavaScript' },
  { id: 62, name: 'Java' },
  { id: 54, name: 'C++' },
  { id: 50, name: 'C' }
];

const Compiler = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState(71); // Default Python
  const [isLoading, setIsLoading] = useState(false);

  const handleRun = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5003/user/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_code: code,
          language_id: language,
          stdin: input
        })
      });
      
      const data = await response.json();
      setOutput(data.stdout || data.stderr || data.compile_output || 'No output');
    } catch (error) {
      setOutput('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="compiler-container">
      <div className="compiler-header">
        <h2>Online Compiler</h2>
        <div className="controls">
          <select 
            value={language} 
            onChange={(e) => setLanguage(parseInt(e.target.value))}
            className="language-select"
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
          </select>
          <button onClick={handleRun} disabled={isLoading}>
            <FiPlay /> {isLoading ? 'Running...' : 'Run'}
          </button>
          <button onClick={handleCopy}>
            <FiCopy /> Copy
          </button>
        </div>
      </div>
      
      <div className="editor-container">
        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here..."
        />
      </div>
      
      <div className="io-container">
        <div className="input-section">
          <h3>Input</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input here..."
          />
        </div>
        
        <div className="output-section">
          <h3>Output</h3>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default Compiler;