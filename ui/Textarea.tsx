import classNames from "classnames";
import React from "react";
import { useMemo } from "react";
import { FaAsterisk } from "react-icons/fa";

interface DefaultProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export interface TextareaProps extends Omit<DefaultProps, "className"> {
  label: string;
  id: string;
  errors?: string[];
}

const Textarea = React.forwardRef(
  (props: TextareaProps, ref: React.LegacyRef<HTMLTextAreaElement>) => {
    const {
      label,
      id,
      required = false,
      minLength = undefined,
      maxLength = undefined,
      errors = [],
      ...rest
    } = props;
    const labelClasses = classNames(
      "inline-flex items-start text-sm cursor-pointer",
      [!!errors.length ? "text-red-500" : "text-gray-500"]
    );
    const inputClasses = classNames(
      "bg-white appearance-none border rounded w-full px-4 py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white",
      [
        !!errors.length
          ? "border-red-500 focus:border-red-500"
          : "border-gray-200 focus:border-blue-500",
      ]
    );
    const minLengthValue = useMemo(
      () => (minLength !== undefined && minLength > 0 ? minLength : undefined),
      [minLength]
    );
    const maxLengthValue = useMemo(
      () => (maxLength !== undefined && maxLength > 0 ? maxLength : undefined),
      [maxLength]
    );

    return (
      <div className="flex flex-col items-start">
        <label htmlFor={id} className={labelClasses}>
          <span>{label}</span>
          {required && <FaAsterisk className="text-red-400" size={6} />}
        </label>
        <textarea
          id={id}
          className={inputClasses}
          minLength={minLengthValue}
          maxLength={maxLengthValue}
          {...rest}
          ref={ref}
        />
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

export default Textarea;
