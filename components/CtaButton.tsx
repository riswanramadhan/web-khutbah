import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CtaButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function CtaButton({ className, ...props }: CtaButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-duo-green px-6 py-4 font-extrabold text-white shadow-[0_4px_0_#58A700] transition-transform duration-75 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
}
