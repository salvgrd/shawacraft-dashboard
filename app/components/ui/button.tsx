import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function Button({
  children,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-white text-black border-4 border-black font-bold hover:bg-gray-200 hover:translate-x-1 hover:translate-y-1 transition-transform ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
