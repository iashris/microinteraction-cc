import React, { ChangeEvent } from 'react';
import './Input.css';

const Input: React.FC<{
  label: string;
  value: any;
  setValue: any;
  name: string;
  modifier?: Function;
  onFocus: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, setValue, modifier = (e: any) => e, name, onFocus }) => {
  const toShow = modifier(value);
  return (
    <div className='input'>
      <div className='input__label'>{label}</div>
      <input
        onFocus={onFocus}
        className='input__main'
        value={toShow}
        onChange={setValue}
        name={name}
      />
    </div>
  );
};

export default Input;
