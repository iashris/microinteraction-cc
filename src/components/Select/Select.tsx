import React, { ChangeEvent } from 'react';
import './Select.css';

const Select: React.FC<{
  label?: string;
  def?: string;
  options: Array<number | string>;
  value: number | string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onFocus: (event: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
}> = ({ options, label = '', def, onChange, value, name, onFocus }) => {
  return (
    <div className='select'>
      <div className='select__label'>{label}</div>
      <select
        className='select__main'
        id='cars'
        onChange={onChange}
        onFocus={onFocus}
        value={value}
        name={name}
      >
        <option selected hidden disabled>
          {def}
        </option>
        {options.map((opt) => (
          <option value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
