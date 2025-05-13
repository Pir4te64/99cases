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
    <div className="mb-4">
        <label
            htmlFor={id}
            className="mb-1 block font-favoritExpandedBook text-sm font-medium md:text-base"
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

        {touched && error && <p className="text-xs text-red-500">{error}</p>}
    </div>
);

export default InputField;
