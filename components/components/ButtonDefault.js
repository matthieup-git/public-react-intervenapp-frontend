import React from 'react'

import { useRouter } from 'next/router'

import { Button } from "../../src/components/components/ui/button"

import { CircleFadingPlus, PencilLine } from 'lucide-react';

import Loading from './Loading';

function ButtonDefault({ variant = "default", size = "default", text, destination, onClick, loading}) {

  console.log("loading in button", loading)

  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (destination) {
      router.push(destination);
    }
  }

  const icon = variant === "addAdmin"
    ? <CircleFadingPlus size={20} strokeWidth={2.5} />
    : variant === "modify"
      ? <PencilLine size={20} />
      : null;

  return (
    <Button onClick={handleClick} variant={variant} size={size}>
      {loading ? <Loading /> : <>{icon}{text}</>}
    </Button>
  )
}

export default ButtonDefault