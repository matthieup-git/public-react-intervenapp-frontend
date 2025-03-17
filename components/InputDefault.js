import React from 'react'

import { Input } from '../src/components/components/ui/input'

function InputDefault({type, placeholder = null, onChange, value}) {
  return (
    <Input type={type}
    placeholder={placeholder}
    onChange={onChange}
    value={value} />
  )
}

export default InputDefault