import React from 'react'

import Alert from "../../src/components/components/ui/alert"

export default function AlertComponent({ success, isFadingOut}) {

  return <Alert isFadingOut={isFadingOut} success={success} />
}
