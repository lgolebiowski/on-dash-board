import type { ComponentProps } from "react";

export function Form({ className = "", ...props }: ComponentProps<"form">) {
  return <form className={`flex flex-col gap-5 ${className}`} {...props} />;
}
