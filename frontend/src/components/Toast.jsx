import { useEffect } from 'react';

export default function Toast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-white/10 bg-white px-5 py-4 shadow-lg animate-in fade-in slide-in-from-bottom-2">
      <p className="text-[14px] font-medium text-black">{message}</p>
    </div>
  );
}