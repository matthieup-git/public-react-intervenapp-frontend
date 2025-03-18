import React from 'react'

import { Textarea } from '../src/components/components/ui/textarea'

function TextAreaDefault({ id, placeholder, onChange, value, className = "" }) {

  if (className === "error") {
    className = "bg-bg-error border-error"
  }

  return (
    <Textarea
      className={`${className} h-36 select-text`}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      disabled={false}
    />

  )
}

export default TextAreaDefault