import React from 'react'

import { useRouter } from 'next/router'

import { Button } from "../../src/components/components/ui/button"

import { CircleFadingPlus } from 'lucide-react';

import Loading from './Loading';

function ButtonDefault({ variant = "default", size = "default", text, destination, onClick, loading}) {
  
  const router = useRouter();

  const handleClick = () => {
    if (onClick && !loading) {
      onClick();
    } else if (destination) {
      router.push(destination);
    }
  }

  const icon = variant === "addAdmin"
    && <CircleFadingPlus size={20} strokeWidth={2.5} />

  return (
    <Button onClick={handleClick} variant={variant} size={size}>
      {loading ? <Loading /> : <>{icon}{text}</>}
    </Button>
  )
}

export default ButtonDefault