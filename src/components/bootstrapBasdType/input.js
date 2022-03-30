import React from 'react';

/*
    This file contains single input component, Bootstrap-based custom component.
    Parameter:
        placeholder = placeholder text for input
        setState = listener function detecting change in input 
        value = value for input
        type = type of the input ex) number, text, email, password
        readOnly = boolean value determing whether it is readonly or not, false by default
        disabled = disabled boolean value, false by default

    How to use:
        <Input value={val} setState={somfuncion} placeholder="placeholder"/> //regular text
        <Input type="password" value={val} setState={somfuncion}/> //password
        <Input type="number" value={val} setState={somfuncion}/> //number
        <Input value={someValue} readOnly={true}/> //using only as a readonly
        <Input value={val} disabled={true}/> //disabled input
*/

const Input = (props) => {
  const {
    placeholder,
    setState,
    value,
    type = 'text',
    readOnly = false,
    disabled = false,
  } = props;

  return (
    <div className="form-group center-div">
      <input
        value={value}
        onChange={(event) => setState(event.target.value)}
        type={type}
        className="form-control"
        id="formGroupExampleInput1"
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export { Input };
