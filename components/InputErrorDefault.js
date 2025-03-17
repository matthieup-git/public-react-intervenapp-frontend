import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark as faRegularCircleXmark } from '@fortawesome/free-regular-svg-icons';

function InputErrorDefault({ title }) {
    return (
        <div className="text-error font-bold"><FontAwesomeIcon icon={faRegularCircleXmark} color="#B42318" shake/> {title}</div>
    )
}

export default InputErrorDefault