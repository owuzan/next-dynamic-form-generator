import React from "react";

interface DefaultProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export interface ButtonProps extends Omit<DefaultProps, "className"> {}

const Button = React.forwardRef(
  (props: ButtonProps, ref: React.LegacyRef<HTMLButtonElement>) => {
    return (
      <button
        className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition font-medium"
        {...props}
        ref={ref}
      />
    );
  }
);

export default Button;
