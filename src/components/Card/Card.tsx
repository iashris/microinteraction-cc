import React, { ReactElement, useEffect, useRef, useState } from 'react';
import './Card.css';
import { Animated } from 'react-animated-css';
import { allMonths } from '../../utils';
import visa from '../../visa.png';
import chip from '../../chip.png';

const CardNameViewer = React.forwardRef<
  HTMLDivElement,
  {
    value?: string;
    ref?: React.Ref<HTMLDivElement>;
  }
>(({ value = '' }, ref) => {
  const [word, setWord] = useState(value);
  const [backspaced, setBackspaced] = useState(false);
  useEffect(() => {
    if (value.length > word.length) {
      setWord(value);
    } else {
      setBackspaced(true);
      setTimeout(() => {
        setWord(value);
        setBackspaced(false);
      }, 100);
    }
  }, [value]);
  const amIVisible = (ind: number) => {
    if (ind >= value.length) return false;
    if (ind !== value.length) return true;
    return !backspaced;
  };
  return (
    <div className='card__nameviewer' ref={ref}>
      <div className='card__label'>Card Holder</div>
      <div className='flex'>
        {new Array(27).fill(0).map((letter, index) => (
          <Animated
            key={index}
            animationIn='fadeInRight'
            animationOut='fadeOutRight'
            animationInDuration={500}
            animationOutDuration={300}
            isVisible={amIVisible(index)}
          >
            {word[index] === ' ' ? '\u00A0' : word[index]?.toUpperCase()}
          </Animated>
        ))}
        <div className='absolute'>
          <Animated
            animationIn='fadeInDown'
            animationOut='fadeOutDown'
            animationInDuration={500}
            animationOutDuration={300}
            isVisible={value.length === 0}
          >
            FULL NAME
          </Animated>
        </div>
      </div>
    </div>
  );
});

const pad = (n: number) => {
  if (n >= 10) return n.toString();
  return n.toString().padStart(2, '0');
};

const CardExpiryViewer = React.forwardRef<
  HTMLDivElement,
  {
    expmonth?: string;
    expyear: string;
    ref?: React.Ref<HTMLDivElement>;
  }
>(({ expmonth = '', expyear }, ref) => {
  const month =
    expmonth === 'Month' ? 'MM' : pad(allMonths.indexOf(expmonth) + 1);
  const year = expyear === 'Year' ? 'YY' : expyear.slice(2, 4);
  return (
    <div className='card__expiryviewer' ref={ref}>
      <div className='card__label'>Expires</div>
      <div className='flex'>
        <TimeKey value={month} def={'MM'} />
        <span>/</span>
        <TimeKey value={year} def={'YY'} />
      </div>
    </div>
  );
});

const CardNumberViewer = React.forwardRef<
  HTMLDivElement,
  {
    value?: string;
    ref?: React.Ref<HTMLDivElement>;
  }
>(({ value = '' }, ref) => {
  let val = (value.replace(/\W/gi, '').trim() + '#################').slice(
    0,
    16
  );
  return (
    <div className='card__numberviewer flex' ref={ref}>
      {[0, 1, 2, 3].map((g) => (
        <div className='card__numberviewer__group flex'>
          <Key value={val[g * 4]} override={g === 1 || g === 2 ? '*' : ''} />
          <Key
            value={val[g * 4 + 1]}
            override={g === 1 || g === 2 ? '*' : ''}
          />
          <Key
            value={val[g * 4 + 2]}
            override={g === 1 || g === 2 ? '*' : ''}
          />
          <Key
            value={val[g * 4 + 3]}
            override={g === 1 || g === 2 ? '*' : ''}
          />
        </div>
      ))}
    </div>
  );
});

const Key: React.FC<{
  value?: string;
  def?: string;
  override?: string;
}> = ({ value, def = '#', override }) => {
  return (
    <div className={`card__key ${value !== '#' && 'hydrated'}`}>
      <div className='card__key__default'>{def}</div>
      <div className='card__key__value'>{override || value}</div>
    </div>
  );
};

const TimeKey: React.FC<{
  value?: string;
  def?: string;
}> = ({ value, def }) => {
  return (
    <div className={`card__key ${value !== def && 'hydrated'}`}>
      <div className='card__key__default'>{def}</div>
      <div className='card__key__value'>{value}</div>
    </div>
  );
};

const Card: React.FC<{
  cvv: string;
  expmonth: string;
  expyear: string;
  cardNum: string;
  cardName: string;
  focused: string;
}> = ({ cvv, expmonth, expyear, cardNum, cardName, focused }) => {
  const myRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const expiryRef = useRef<HTMLDivElement>(null);
  const [hPos, setHPos] = useState({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  });

  useEffect(() => {
    let fRef;
    if (!focused) return;
    if (focused === 'cvv') return;
    switch (focused) {
      case 'cardNum':
        fRef = numberRef;
        break;
      case 'cardName':
        fRef = nameRef;
        break;
      case 'Expiry':
        fRef = expiryRef;
        break;
    }
    const p = myRef?.current?.getBoundingClientRect();
    const c = fRef?.current?.getBoundingClientRect();
    console.log(p, c);
    const nw = {
      x: (c?.left || 0) - (p?.left || 0),
      y: (c?.top || 0) - (p?.top || 0) - (c?.height || 0) / 5,
      w: c?.width || 0,
      h: (c?.height || 0) * 0.85,
    };
    console.log(nw);
    setHPos(nw);
  }, [focused]);
  return (
    <div className='card'>
      <div className='card__main'>
        <div
          ref={myRef}
          className={`card__front card__side ${
            cvv && focused === 'cvv' && 'flipped'
          }`}
        >
          <div
            className={`card__highlighter ${
              (!focused || focused === 'cvv') && 'invisible'
            }`}
            style={{
              left: hPos.x - 12,
              top: hPos.y,
              width: hPos.w + 18,
              height: hPos.h,
            }}
          ></div>
          <div className='flex flex-column flex-justify full-height'>
            <div className='card__section flex flex-justify imgs align-center'>
              <img src={chip} alt='visa' />
              <img src={visa} alt='visa' />
            </div>
            <div className='card__section'>
              <CardNumberViewer value={cardNum} ref={numberRef} />
            </div>
            <div className='card__section flex-justify'>
              <CardNameViewer value={cardName} ref={nameRef} />
              <CardExpiryViewer
                expmonth={expmonth}
                expyear={expyear}
                ref={expiryRef}
              />
            </div>
          </div>
        </div>
        <div
          className={`card__back card__side ${
            cvv && focused === 'cvv' && 'flipped'
          }`}
        >
          <div className='card__magnetic'></div>
          <div className='card__cvv-zone'>
            <div className='card__label'>CVV</div>
            <div className='card__cvv'>{new Array(cvv.length).fill('*')}</div>
            <img src={visa} className='card__visa' alt='visa' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
