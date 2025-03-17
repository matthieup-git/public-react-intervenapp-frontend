import React from 'react'

import { Label } from "../src/components/components/ui/label"

function LabelDefault({ text, htmlFor, mandatory, className = "" }) {

    return (
        <Label htmlFor={htmlFor} className={className}>
            {text} <span className="font-normal">{mandatory}</span>
        </Label>
    )
}

export default LabelDefault