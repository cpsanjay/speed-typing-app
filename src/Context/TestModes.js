const { createContext, useState, useContext } = require("react");

const TestModeContext = createContext();

export const TextModeContextProvider = ({ children }) => {
  const [testTime, setTestTime] = useState(15);
  const [testMode, setTestMode] = useState("time");
  const [testWords, setTestWords] = useState(10);

  const value = {
    testTime,
    testMode,
    testWords,
    setTestTime,
    setTestMode,
    setTestWords,
  };

  return (
    <TestModeContext.Provider value={value}>
      {children}
    </TestModeContext.Provider>
  );
};

export const useTestMode = () => useContext(TestModeContext);
