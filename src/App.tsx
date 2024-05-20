import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Card, CardContent, CardHeader, FormControlLabel, Input, Radio, RadioGroup, TextField } from '@mui/material';

function App() {

  const [number, setNumber] = useState('');
  const [radioValue, setRadioValue] = useState('message');

  const formatPhoneNumber = (value: string) => {
    const sanitize = value.replace(/\D/g, '');
    const match = sanitize.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return sanitize;
    const first = match[1];
    const middle = match[2] ? `-${match[2]}` : '';
    const last = match[3] ? `-${match[3]}` : '';
    return `${first}${middle}${last}`;
  }

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rule = /^[0-9-\b]+$/;
    if (event.currentTarget.value == '' || rule.test(event.currentTarget.value)) {
      const value = formatPhoneNumber(event.currentTarget.value);
      setNumber(value)
    }
  }
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.currentTarget.value);
  }

  const handleClick = () => {
    const param = {
      phoneNumber: number,
      method: radioValue
    }
    console.log(param);
  }

  return (
    <div className="app">
      <p>Back to Verify Your Profile</p>
      <Card>
        <CardHeader title="Add your contact phone number"></CardHeader>
        <CardContent>We'll contact you by text message or phone call about account updates for your home products and services, for verification when calling in and for exclusive offers or surveys.</CardContent>
      </Card>

      <div className='textField'>
        <h4>Enter you contact phone number</h4>
        <p>Mobile phone number preferred</p>
        <TextField value={number} onChange={handleNumberChange} required size='medium' type='text' inputProps={{ maxLength: 12 }} placeholder='xxx-xxx-xxxx' />
      </div>

      <div className='radioFields'>
        <h4>We'll send you a code to confirm this phone number. Where should we send it?</h4>
        <RadioGroup value={radioValue} onChange={handleRadioChange}>
          <FormControlLabel value="message" control={<Radio />} label="Text message" />
          <FormControlLabel value="call" control={<Radio />} label="Phone call" />
        </RadioGroup>
      </div>

      <Button className='btn' variant='contained' onClick={handleClick} disabled={!(number.length === 12)}>Continue</Button>
    </div>
  );
}

export default App;
