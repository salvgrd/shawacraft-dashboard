import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full px-3 py-2 border-2 border-black focus:ring-2 bg-white focus:ring-offset-2 focus:ring-black ${className}`}
      {...props}
    />
  );
}
