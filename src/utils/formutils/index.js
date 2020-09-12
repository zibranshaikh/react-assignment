/*Collection of form fields*/
import React from 'react'
import { Form } from 'react-bootstrap';

const InputField = ({ required, type, id, value, label, disabled, autoComplete, name,
  placeholder, onChange, errorMessage, onBlur, autoFocus, className, onKeyPress, readOnly,
  rows, reference }) => {
  let asProps = type === "textarea" ? { as : "textarea" } : ''; 
  let refProps = reference ? {ref: reference} : ''; 
  return (
    <> 
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        {...asProps}
        {...refProps}
        rows={type === 'textarea' ? rows : '1'}
        isInvalid={errorMessage ? true : false}
        required={required || false}
        placeholder={placeholder || ''}
        type={type || 'text'}
        name={name}
        id={id}
        disabled={disabled || false}
        onChange={(e) => onChange(e)}
        onKeyPress={(e) => onKeyPress ? onKeyPress(e) : {}}
        onBlur={onBlur}
        value={value}
        autoComplete={autoComplete || ''}
        autoFocus={autoFocus || false}
        className={className || ''}
        readOnly={readOnly}
      />    
      {errorMessage ? 
            <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback> 
        : name !== 'workOrder' ? <p>&nbsp;</p> : ''}
    </>
  )
}

export {
  InputField
}

