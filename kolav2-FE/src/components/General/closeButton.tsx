import React from "react";
import { X } from "lucide-react";

interface CloseButtonProps {
  onClose: () => void;
  className?: string;
}

const CloseButton = ({ onClose, className = "" }: CloseButtonProps) => {
  return (
    <button
      title="close_icon"
      onClick={onClose}
      className={`p-2  hover:text-gray-700 rounded-full hover:bg-gray-100 ${className}`}
    >
      <X size={20} />
    </button>
  );
};

export default CloseButton;
