
import React from 'react';

interface InputGroupProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  options?: string[] | { value: string; label: string }[];
  as?: 'input' | 'select' | 'textarea';
  rows?: number;
  helper?: string;
  readOnly?: boolean;
  className?: string; // New prop for custom styling
}

const InputGroup: React.FC<InputGroupProps> = ({ 
  label, id, type = 'text', placeholder, value, onChange, options, as = 'input', rows, helper, readOnly = false, className = ""
}) => {
  const baseClasses = `w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all text-sm ${className}`;
  
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      
      {as === 'input' && (
        <input 
          id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} 
          className={baseClasses} readOnly={readOnly}
        />
      )}
      
      {as === 'select' && (
        <select id={id} value={value} onChange={onChange} className={baseClasses}>
          <option value="">-- Pilih --</option>
          {options?.map((opt: any) => (
            typeof opt === 'string' 
              ? <option key={opt} value={opt}>{opt}</option>
              : <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )}
      
      {as === 'textarea' && (
        <textarea 
          id={id} rows={rows} placeholder={placeholder} value={value} onChange={onChange} 
          className={baseClasses} readOnly={readOnly}
        />
      )}
      
      {helper && <p className="text-xs text-gray-400 mt-1 italic">{helper}</p>}
    </div>
  );
};

export default InputGroup;
