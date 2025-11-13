import { useCallback, useEffect, useState, useRef } from 'react';


function App() {
  const [length, setLength] = useState(8);
  const [lowercase, setLowercase] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState('');

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = '';
    if (lowercase) {
      str += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (uppercase) {
      str += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (number) {
      str += '0123456789';
    }
    if (symbol) {
      str += '@#$%^&*';
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, lowercase, uppercase, number, symbol, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, lowercase, uppercase, number, symbol, passwordGenerator]);

  return (
    <>

      <div className="max-w-md mx-auto my-12 p-6 bg-gray-800 text-white rounded-2xl shadow-2xl shadow-blue-500/30 transition-shadow duration-300 hover:shadow-blue-400/50">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Password Generator
        </h1>

        <div className="flex items-center gap-3 mb-8">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Your password will appear here"
            className="flex-1 py-2 px-3 rounded-lg bg-gray-700 border border-gray-600 outline-none text-sm placeholder-gray-300"
            aria-label="Generated password"
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="shrink-0 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Copy password"
          >
            Copy
          </button>
        </div>

        <div className="space-y-5 text-sm mb-3">
          <div className="flex items-center justify-between">
            <label className="mr-4">Password length</label>
            <div className="flex items-center gap-4 w-2/3">
              <input
                type="range"
                min={6}
                max={32}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full"
                aria-label="Password length"
              />
              <span className="w-10 text-right">{length}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="lowercaseInput" className="text-sm">
              Include lowercase (a-z)
            </label>
            <input
              id="lowercaseInput"
              type="checkbox"
              checked={lowercase}
              onChange={() => setLowercase((p) => !p)}
              className="h-4 w-4"
              aria-checked={lowercase}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="uppercaseInput" className="text-sm">
              Include uppercase (A-Z)
            </label>
            <input
              id="uppercaseInput"
              type="checkbox"
              checked={uppercase}
              onChange={() => setUppercase((p) => !p)}
              className="h-4 w-4"
              aria-checked={uppercase}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numberInput" className="text-sm">
              Include numbers (0-9)
            </label>
            <input
              id="numberInput"
              type="checkbox"
              checked={number}
              onChange={() => setNumber((p) => !p)}
              className="h-4 w-4"
              aria-checked={number}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="symbolInput" className="text-sm">
              Include symbols (!@#$...)
            </label>
            <input
              id="symbolInput"
              type="checkbox"
              checked={symbol}
              onChange={() => setSymbol((p) => !p)}
              className="h-4 w-4"
              aria-checked={symbol}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
