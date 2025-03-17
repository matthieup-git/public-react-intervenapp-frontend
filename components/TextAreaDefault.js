import React from 'react'

import { Textarea } from '../src/components/components/ui/textarea'

function TextAreaDefault({ id, placeholder, onChange, value}) {
  return (
    <Textarea className="h-36" id={id} placeholder={placeholder} onChange={onChange} value={value}/>
    
  )
}

export default TextAreaDefault