import { useRef, useState } from "react";

function Input() {
  const InpRef = useRef(null);
  const [showPanel, setShowPanel] = useState(false);

  const handleIDsubmit = () => {
    let val = InpRef.current.value;
    chrome.storage?.local.set({ apiKey: val }, () => {
      alert("API key saved!");
    });
  };

  return (
    <>
      {/* Button to open API key panel */}
      {!showPanel && (
        <button
          className="bg-slate-600 text-gray-800 font-bold px-4 py-1 rounded-sm hover:invert"
          onClick={() => setShowPanel(true)}
        >
          ...
        </button>
      )}

      {/* Panel with form */}
      {showPanel && (
        <div className="relative bg-gray-900 p-3 rounded-sm shadow-md border w-full flex flex-col gap-2 font-mono text-sm">
          {/* Close Button 'X' */}
          <div
            className="absolute top-1 right-2 text-gray-200 hover:scale-120 cursor-pointer font-bold text-lg"
            onClick={() => setShowPanel(false)}
          >
            ×
          </div>

          <label htmlFor="apikey">Enter your OpenAI key:</label>

          <input
            type="password"
            name="apikey"
            id="apikey"
            ref={InpRef}
            className="bg-gray-300 text-gray-800 px-2 py-1 w-full rounded-sm outline-none"
          />

          <div
            id="submitButton"
            className="bg-slate-400 text-gray-800 font-bold text-center py-1 hover:invert rounded-sm cursor-pointer"
            onClick={handleIDsubmit}
          >
            SUBMIT
          </div>
        </div>
      )}
    </>
  );
}

export default Input;
