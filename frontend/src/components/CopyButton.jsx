import { useState } from "react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  return (
    <button onClick={handleCopy} className="flex items-center p-1 border border-white text-sm rounded-sm">
      {copied ? <p className="text-green-500">Copied!</p> : <p className="text-white">Copy</p>}
    </button>
  );
}

export default CopyButton;