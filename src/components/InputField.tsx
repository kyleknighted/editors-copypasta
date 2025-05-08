import { useEffect } from 'react';
import type { Input } from '../types/copypasta';

interface InputFieldProps {
  input: Input;
  value: string;
  onChange: (value: string) => void;
  onInit?: () => void;
}

export const InputField: React.FC<InputFieldProps> = ({ input, value, onChange, onInit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  useEffect(() => {
    onInit?.()
  }, [])


  if (input.type === 'select' && input.options) {
    return (
      <select
        value={value}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required={input.required}
      >
        <option value="">Select {input.placeholder}</option>
        {input.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={input.type}
      value={value}
      onChange={handleChange}
      placeholder={input.placeholder}
      className="w-full p-2 border rounded-md"
      required={input.required}
    />
  );
};
