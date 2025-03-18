import React from 'react'

import { Textarea } from '../src/components/components/ui/textarea'

function TextAreaDefault({ id, onChange, value, className = "" }) {

  if (className === "error") {
    className = "bg-bg-error border-error"
  }

  return (
    <Textarea
      className={`${className} h-36 select-text`}
      id={id}
      onChange={onChange}
      value={value}
      disabled={false}
    />

  )
}

export default TextAreaDefault