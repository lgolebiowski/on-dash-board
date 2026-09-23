import type { ComponentProps } from "react";

export function Select({ className = "", ...props }: ComponentProps<"select">) {
  return (
    <select
      className={`w-full rounded-md border border-zinc-300 px-3 py-2 text-base focus:outline-2 focus:-outline-offset-1 focus:outline-zinc-900 ${className}`}
      {...props}
    />
  );
}
