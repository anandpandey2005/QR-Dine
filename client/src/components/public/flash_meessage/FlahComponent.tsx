import React from 'react';

interface FlashProps {
  message?: string;
  type?: 'success' | 'error' | 'warn' | 'alert'; 
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FlashComponent = ({ 
  message = "Notification", 
  type = "success", 
  onClose 
}: FlashProps) => {
  
  const styles: Record<string, string> = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    warn: "bg-yellow-100 border-yellow-500 text-yellow-700",
  };

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center p-4 border-l-4 shadow-md rounded-r transition-all ${styles[type]}`}
    >
      <span className="flex-1 mr-4 font-medium">{message}</span>
      <button 
        onClick={onClose} 
        className="text-2xl font-bold leading-none hover:opacity-60 transition-opacity"
        type="button"
      >
        &times;
      </button>
    </div>
  );
};

export default FlashComponent;