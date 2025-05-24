// src/components/Pagos/UI/SelectField.tsx
import React from "react";
import Select, { Props as ReactSelectProps } from "react-select";

export interface SelectFieldProps {
    /** id y name para el label y para react-select */
    id: string;
    /** Texto del label */
    label: string;
    /** Valor actual (la propiedad `value` de alguna opción) */
    value: string;
    /** Opciones reutilizables */
    options: { value: string; text: string }[];
    /** Callback con el nuevo valor */
    onChange: (newValue: string) => void;
    /** Callback de blur (por ejemplo para formik.setFieldTouched) */
    onBlur?: () => void;
    error?: string;
    touched?: boolean;
    /** placeholder opcional */
    placeholder?: string;
    /** searchable? por defecto false */
    isSearchable?: boolean;
}

/** Internamente convertimos tus `{ value, text }` a `{ value, label }` para react-select */
const normalizeOptions = (opts: SelectFieldProps["options"]) =>
    opts.map((o) => ({ value: o.value, label: o.text }));

const SelectField: React.FC<SelectFieldProps> = ({
    id,
    label,
    value,
    options,
    onChange,
    onBlur,
    error,
    touched,
    placeholder,
    isSearchable = false,
}) => {
    const formatted = normalizeOptions(options);
    const selected = formatted.find((o) => o.value === value) || null;

    return (
        <div className="mt-4">
            <label
                htmlFor={id}
                className="mb-1 block font-favoritExpanded text-sm font-medium md:text-base"
            >
                {label}
            </label>

            <Select
                inputId={id}
                name={id}
                options={formatted}
                value={selected}
                onChange={(opt) => onChange((opt as any)?.value ?? "")}
                onBlur={onBlur}
                placeholder={placeholder}
                isSearchable={isSearchable}
                className="react-select-container font-favoritExpanded"
                classNamePrefix="react-select"
            />

            {touched && error && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
        </div>
    );
};

export default SelectField;
