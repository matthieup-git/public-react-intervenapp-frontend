import React from 'react'

import { AutosizeTextarea } from '../../src/components/components/ui/autosize-textarea';

function TextAreaDefault({ id, onChange, value, className = "" }) {

  if (className === "error") {
    className = "bg-input-bg-error border-input-stroke-error"
  }

  return (
    <AutosizeTextarea
      className={`${className} h-64`}
      id={id}
      onChange={onChange}
      value={value}
      disabled={false}
    />

  )
}

export default TextAreaDefault