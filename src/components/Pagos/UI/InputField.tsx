import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  value: string | number;
  placeholder?: string;
  disabled?: boolean;

  /* Formik helpers */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  disabled,
  onChange,
  onBlur,
  error,
  touched,
}) => (
  <div className="my-6 relative">
    <label
      htmlFor={id}
      className="absolute -top-2 left-3 bg-white px-1 font-favoritExpandedBook text-xs font-medium text-gray-600 z-10"
    >
      {label}
    </label>

    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      className="w-full rounded border border-gray-300 px-3 py-2 font-favoritExpandedBook text-sm md:text-base"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
    />

    {touched && error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

export default InputField;
