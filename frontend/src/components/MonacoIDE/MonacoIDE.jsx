import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { 
  FiPlay, FiCopy, FiSave, FiCode, FiTerminal, FiClock, 
  FiLayout, FiColumns, FiSidebar, FiGrid 
} from 'react-icons/fi';
import { FaPython, FaJava, FaJs } from 'react-icons/fa';
import { SiCplusplus, SiC } from 'react-icons/si';
import axios from 'axios';
import './MonacoIDE.css';

const languages = [
  { id: 71, name: 'Python', monacoLang: 'python', icon: <FaPython /> },
  { id: 63, name: 'JavaScript', monacoLang: 'javascript', icon: <FaJs /> },
  { id: 62, name: 'Java', monacoLang: 'java', icon: <FaJava /> },
  { id: 54, name: 'C++', monacoLang: 'cpp', icon: <SiCplusplus /> },
  { id: 50, name: 'C', monacoLang: 'c', icon: <SiC /> }
];

const defaultCode = {
  71: '# Write Python code here\nprint("Hello, World!")',
  63: '// Write JavaScript code here\nconsole.log("Hello, World!");',
  62: '// Write Java code here\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
  54: '// Write C++ code here\n#include <iostream>\n\nint main() {\n  std::cout << "Hello, World!";\n  return 0;\n}',
  50: '// Write C code here\n#include <stdio.h>\n\nint main() {\n  printf("Hello, World!");\n  return 0;\n}'
};

const LAYOUTS = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  STACKED: 'stacked',
  ONLY_OUTPUT: 'only-output'
};

const MonacoIDE = () => {
  const [code, setCode] = useState(defaultCode[71]);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [languageId, setLanguageId] = useState(71);
  const [isLoading, setIsLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [fontSize, setFontSize] = useState(14);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [layout, setLayout] = useState(LAYOUTS.HORIZONTAL);
  const [showInput, setShowInput] = useState(true);

  const handleRun = async () => {
    setIsLoading(true);
    const startTime = performance.now();
    
    try {
      const response = await axios.post('http://localhost:5003/user/execute', {
        source_code: code,
        language_id: languageId,
        stdin: input
      });
      
      const endTime = performance.now();
      setExecutionTime((endTime - startTime).toFixed(2));
      setOutput(response.data.stdout || response.data.stderr || "No output");
    } catch (error) {
      setOutput("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (e) => {
    const newLangId = parseInt(e.target.value);
    setLanguageId(newLangId);
    setCode(defaultCode[newLangId]);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  const handleSaveCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${languages.find(lang => lang.id === languageId)?.monacoLang}`;
    a.click();
  };

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 1, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 1, 10));

  const toggleInput = () => setShowInput(!showInput);

  const changeLayout = (newLayout) => {
    setLayout(newLayout);
    if (newLayout === LAYOUTS.ONLY_OUTPUT) {
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };

  const getEditorHeight = () => {
    switch (layout) {
      case LAYOUTS.STACKED:
        return '50%';
      case LAYOUTS.VERTICAL:
        return '60%';
      case LAYOUTS.ONLY_OUTPUT:
        return '75%';
      default:
        return '70%';
    }
  };

  return (
    <div className="ide-wrapper">
    <div className={`ide-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="ide-header">
        <div className="header-left">
          <FiCode className="header-icon" />
          <h2>AMR IDE</h2>
        </div>
        
        <div className="controls">
          <div className="language-selector">
            {languages.find(lang => lang.id === languageId)?.icon}
            <select 
              value={languageId} 
              onChange={handleLanguageChange}
              className="language-select"
            >
              {languages.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
          </div>
          
          <div className="font-controls">
            <button onClick={decreaseFontSize} className="font-btn">A-</button>
            <span>{fontSize}px</span>
            <button onClick={increaseFontSize} className="font-btn">A+</button>
          </div>
          
          <div className="layout-controls">
            <button 
              onClick={() => changeLayout(LAYOUTS.HORIZONTAL)}
              className={`layout-btn ${layout === LAYOUTS.HORIZONTAL ? 'active' : ''}`}
              title="Horizontal Layout"
            >
              <FiLayout />
            </button>
            <button 
              onClick={() => changeLayout(LAYOUTS.VERTICAL)}
              className={`layout-btn ${layout === LAYOUTS.VERTICAL ? 'active' : ''}`}
              title="Vertical Layout"
            >
              <FiColumns />
            </button>
            <button 
              onClick={() => changeLayout(LAYOUTS.STACKED)}
              className={`layout-btn ${layout === LAYOUTS.STACKED ? 'active' : ''}`}
              title="Stacked Layout"
            >
              <FiSidebar />
            </button>
            <button 
              onClick={() => changeLayout(LAYOUTS.ONLY_OUTPUT)}
              className={`layout-btn ${layout === LAYOUTS.ONLY_OUTPUT ? 'active' : ''}`}
              title="Output Only"
            >
              <FiGrid />
            </button>
          </div>
          
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="theme-toggle"
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          
          <button onClick={handleCopyCode} className="action-btn">
            <FiCopy /> Copy
          </button>
          
          <button onClick={handleSaveCode} className="action-btn">
            <FiSave /> Save
          </button>
          
          <button 
            onClick={handleRun} 
            disabled={isLoading}
            className={`run-btn ${isLoading ? 'loading' : ''}`}
          >
            <FiPlay /> {isLoading ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>
      
      <div className="editor-container" style={{ height: getEditorHeight() }}>
        <Editor
          height="100%"
          language={languages.find(lang => lang.id === languageId)?.monacoLang}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme={isDarkMode ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: true },
            fontSize: fontSize,
            wordWrap: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            renderWhitespace: 'selection',
            padding: { top: 15 }
          }}
        />
      </div>
      
      <div className={`io-container ${layout}`}>
        {showInput && (
          <div className="input-panel">
            <div className="panel-header">
              <FiTerminal />
              <h3>Input</h3>
              <button 
                onClick={toggleInput}
                className="panel-toggle"
                title="Toggle Input Panel"
              >
                {layout === LAYOUTS.VERTICAL ? '←' : '↑'}
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input here (optional)..."
            />
          </div>
        )}
        
        <div className="output-panel">
          <div className="panel-header">
            <div className="output-header-left">
              <FiTerminal />
              <h3>Output</h3>
              {!showInput && (
                <button 
                  onClick={toggleInput}
                  className="panel-toggle"
                  title="Show Input Panel"
                >
                  ↓
                </button>
              )}
            </div>
            {executionTime > 0 && (
              <div className="execution-time">
                <FiClock /> {executionTime}ms
              </div>
            )}
          </div>
          <pre className={output.startsWith("Error:") ? "error-output" : ""}>
            {output || "Your output will appear here..."}
          </pre>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MonacoIDE;