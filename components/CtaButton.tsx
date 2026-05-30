import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CtaButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function CtaButton({ className, ...props }: CtaButtonProps) {
  return (
    <button
      className={cn(
        "bg-duo-green text-white font-bold rounded-xl px-6 py-4 shadow-[0_4px_0_#58A700] transition-transform duration-75 active:translate-y-1 active:shadow-none disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}
