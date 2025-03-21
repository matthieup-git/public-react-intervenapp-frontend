import React from 'react'

import { useRouter } from 'next/router'

import { Button } from "../../src/components/components/ui/button"

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
      <Button onClick={handleClick} variant="return" size="return">
        <ArrowLeft color="#000933" /><span className="pl-2">Retour</span>
      </Button>
    </>
  )
}

export default ButtonReturn