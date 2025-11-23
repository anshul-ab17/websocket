
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button: React.FC<Props> = ({ children, className = "", ...rest }) => {
  return (
    <button
      {...rest}
      className={
        `inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-lg font-semibold transition-shadow focus:outline-none focus:ring-2 focus:ring-amber-400
         bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-md ` + className
      }
    >
      {children}
    </button>
  );
};

export default Button;
