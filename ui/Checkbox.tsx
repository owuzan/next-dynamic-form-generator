import classNames from "classnames";
import React, { LegacyRef } from "react";
import { FaAsterisk } from "react-icons/fa";

interface DefaultProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface CheckboxProps extends Omit<DefaultProps, "className"> {
  label: string;
  id: string;
  errors?: string[];
}

const Checkbox = React.forwardRef(
  (props: CheckboxProps, ref: LegacyRef<HTMLInputElement>) => {
    const { label, id, required, errors = [], children, ...rest } = props;

    const labelClasses = classNames(
      "inline-flex items-start text-sm cursor-pointer",
      [!!errors.length ? "text-red-500" : "text-gray-500"]
    );

    const className = classNames(
      "flex-none mr-2 w-4 h-4 rounded border border-gray-200",
      [!!errors.length && "border-red-500"]
    );

    return (
      <div className="flex flex-col items-start">
        <label htmlFor={id} className={labelClasses}>
          <span>{label}</span>
          {required && <FaAsterisk className="text-red-400" size={6} />}
        </label>
        <div className="flex items-start">
          <input
            className={className}
            type="checkbox"
            id={id}
            required={required}
            {...rest}
            ref={ref}
          />
          {children ? (
            <label className="-mt-1" htmlFor={id}>
              {children}
            </label>
          ) : null}
        </div>
      </div>
    );
  }
);

export default Checkbox;
