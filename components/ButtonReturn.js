import React from 'react'

import { useRouter } from 'next/router'

import { Button } from "../src/components/components/ui/button"

import { ArrowLeft } from 'lucide-react';

function ButtonReturn({ destination, onClick }) {

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
      <Button onClick={handleClick} variant="return">
        <ArrowLeft />Retour
      </Button>
    </>
  )
}

export default ButtonReturn