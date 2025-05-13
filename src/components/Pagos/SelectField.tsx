import React from "react";

interface SelectFieldProps {
    id: string;
    label: string;
    value: string;
    options: { value: string; text: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
    error?: string;
    touched?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
    id,
    label,
    value,
    options,
    onChange,
    onBlur,
    error,
    touched,
}) => (
    <div className="mt-4">
        <label
            htmlFor={id}
            className="mb-1 block font-favoritExpandedBook text-sm font-medium md:text-base"
        >
            {label}
        </label>

        <select
            id={id}
            name={id}
            className="w-full rounded border border-gray-300 px-3 py-2 font-favoritExpandedBook text-sm md:text-base"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.text}
                </option>
            ))}
        </select>

        {touched && error && <p className="text-xs text-red-500">{error}</p>}
    </div>
);

export default SelectField;
