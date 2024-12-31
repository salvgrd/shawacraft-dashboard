import type { LabelHTMLAttributes, ReactNode } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  className?: string;
}

export function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label className={`block text-lg font-bold ${className}`} {...props}>
      {children}
    </label>
  );
}
