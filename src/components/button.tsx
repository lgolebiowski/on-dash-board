import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "border border-transparent bg-zinc-900 text-zinc-50",
  secondary: "border border-zinc-300 bg-transparent text-zinc-900",
};

export function Button({
  variant = "secondary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return (
    <button
      className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
