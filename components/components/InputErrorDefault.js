import React from 'react'

import { CircleX } from 'lucide-react';

function InputErrorDefault({ title }) {
    return (
        <div className="text-input-text-error font-bold flex gap-1 items-center">
            <CircleX size={18} color="#B42318" />
            {title}
        </div>
    )
}

export default InputErrorDefault