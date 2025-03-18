import React from 'react'

import { Input } from '../src/components/components/ui/input'

function InputDefault({ type, placeholder = '', onChange, value, className = "" }) {

  if (className === "error") {
    className = "bg-bg-error border-error";
  }

  return (
    <Input type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={className}
    />
  )
}

export default InputDefault