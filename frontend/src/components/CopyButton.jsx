import { useState } from "react";
import { LuClipboard, LuClipboardCheck } from "react-icons/lu";

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
    <button onClick={handleCopy} className="flex items-center gap-1">
      {copied ? <LuClipboardCheck color="white" size={27} /> : <LuClipboard size={27} color="white" />}
    </button>
  );
}

export default CopyButton;