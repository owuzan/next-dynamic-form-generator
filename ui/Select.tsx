import classNames from "classnames";
import React from "react";
import { FaAsterisk, FaChevronDown } from "react-icons/fa";

interface DefaultProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}
export interface SelectProps extends Omit<DefaultProps, "className"> {
  label: string;
  id: string;
  options?: OptionProps[];
  errors?: string[];
}
export interface OptionProps
  extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const Select = React.forwardRef(
  (props: SelectProps, ref: React.LegacyRef<HTMLSelectElement>) => {
    const { label, id, errors = [], options = [], required, ...rest } = props;
    const labelClasses = classNames(
      "inline-flex items-start text-sm cursor-pointer",
      [!!errors.length ? "text-red-500" : "text-gray-500"]
    );
    const className = classNames([
      [
        "appearance-none px-4 h-10 text-left border border-gray-200 rounded w-full",
      ],
      ["focus:outline-none focus:border-blue-500"],
      [!!errors.length && "!border-red-500"],
    ]);
    return (
      <div className="flex flex-col items-start">
        <label htmlFor={id} className={labelClasses}>
          <span>{label}</span>
          {required && <FaAsterisk className="text-red-400" size={6} />}
        </label>
        <div className="relative w-full">
          <div className="absolute top-1/2 right-2 -translate-y-1/2 inline-flex items-center justify-center w-4 h-4">
            <FaChevronDown size={12} />
          </div>
          <select
            className={className}
            id={id}
            required={required}
            {...rest}
            ref={ref}
          >
            {options.map((props, index) => {
              return <option key={index} {...props}></option>;
            })}
          </select>
        </div>
        {!!errors.length && (
          <ul className="flex flex-col self-end text-red-500 text-sm text-right">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default Select;
