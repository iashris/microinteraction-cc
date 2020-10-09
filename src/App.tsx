import React, { ChangeEvent } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Input from './components/Input/Input';
import Select from './components/Select/Select';
import { allMonths } from './utils';
const { useState } = React;

export default function App() {
  const [cardNum, setCardNum] = useState('');
  const [cardName, setCardName] = useState('');
  const [cvv, setCvv] = useState('');
  const [expmonth, setExpmont] = useState('Month');
  const [expyear, setExpyear] = useState('Year');
  const [focused, setFocused] = useState('');

  const disabled =
    cardNum.length < 16 ||
    !cardNum ||
    cvv.length !== 3 ||
    expmonth === 'Month' ||
    expyear === 'Year';
  const cardNumMod = (str: string) =>
    str
      .replace(/\W/gi, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  const handleCardNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.replace(/\W/gi, '').length <= 16) {
      if (+e.target.value.replace(/\W/gi, '')) setCardNum(e.target.value);
    }
  };
  const handleCardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!+e.target.value) setCardName(e.target.value);
    console.log(e.target.value);
  };

  const handleCvv = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCvv(e.target.value);

  const onFocus = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setFocused(e.target.name);

  const handleSelectExpMonth = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setExpmont(e.target.value);
  const handleSelectExpYear = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setExpyear(e.target.value);

  return (
    <div className='form'>
      <Card
        cvv={cvv}
        cardNum={cardNum}
        cardName={cardName}
        expmonth={expmonth}
        expyear={expyear}
        focused={focused}
      />
      <Input
        label='Enter Card Number'
        value={cardNum}
        name='cardNum'
        setValue={handleCardNum}
        modifier={cardNumMod}
        onFocus={onFocus}
      />
      <Input
        label="Card Holder's Name"
        value={cardName}
        name='cardName'
        setValue={handleCardName}
        onFocus={onFocus}
      />
      <div className='flex align-end flex-justify'>
        <div className='flex align-end flex-1'>
          <Select
            onChange={handleSelectExpMonth}
            label='Expiration Date'
            onFocus={onFocus}
            value={expmonth}
            name='Expiry'
            def='Month'
            options={allMonths}
          />
          <Select
            value={expyear}
            name='Expiry'
            onFocus={onFocus}
            def='Year'
            onChange={handleSelectExpYear}
            options={new Array(20)
              .fill(0)
              .map((e, i) => new Date().getFullYear() + i)}
          />
        </div>
        <Input
          label='CVV'
          value={cvv}
          setValue={handleCvv}
          name='cvv'
          onFocus={onFocus}
        />
      </div>
      <button className={`submit ${disabled && 'disabled'}`}>Submit</button>
    </div>
  );
}
