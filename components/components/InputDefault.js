import React from "react";

import { Input } from "../../src/components/components/ui/input";

import { useRouter } from "next/router";

function InputDefault({ type, placeholder = "", onChange, value, className }) {

  const router = useRouter();

  className === "error" ? (className = "bg-input-bg-error border-input-stroke-error") : "";

  const autoCapitalizeValue = router.pathname === "/" ? "none" : "on";

  return <Input type={type} placeholder={placeholder} onChange={onChange} value={value} className={className} autoCapitalize={autoCapitalizeValue}/>;
}

export default InputDefault;
