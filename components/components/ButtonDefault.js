import React from 'react'

import { useRouter } from 'next/router'

import { Button } from "../../src/components/components/ui/button"

function ButtonDefault({ variant = "default", size = "default", text, destination, onClick }) {

  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (destination) {
      router.push(destination);
    }
  }

  return (
    <>
      <Button onClick={handleClick} variant={variant} size={size}>
        {text}
      </Button>
    </>
  )
}

export default ButtonDefault