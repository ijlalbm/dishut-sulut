import React, { useState } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string | number) => void;
  className?: string;
  defaultValue?: string | number;
  name?: string;
  register?: any;
  registerOptions?: object;
  errorMessage?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  name,
  register,
  registerOptions,
  errorMessage,
}) => {
  
  // const [selectedValue, setSelectedValue] = useState<string | number>(defaultValue);

  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = e.target.value;
  //   setSelectedValue(value);
  //   if (onChange) onChange(value);
  // };

  // Integrasi dengan RHF
  const registrationProps = register && name ? register(name, registerOptions) : {};

  return (
    <div>
      <select
        name={name}
        className={`h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`}
        defaultValue={defaultValue}
        {...registrationProps}
        // onChange={handleChange} ← Hapus jika pakai RHF
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <span className="text-red-500 text-xs">{errorMessage}</span>
      )}
    </div>
  );
};

export default Select;