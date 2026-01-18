import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Variant = "primary" | "ghost" | "gray";

type ButtonProps = {
  small?: boolean;
  variant?: Variant;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({
  small = false,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const sizeClasses = small ? "px-2 py-1 text-sm" : "px-4 py-2 font-semibold";

  const variantClasses =
    variant === "primary"
      ? "bg-[#3b49df] text-white hover:bg-blue-500 focus-visible:ring-blue-500/40"
      : variant === "gray"
        ? "bg-gray-400 text-white hover:bg-gray-300 focus-visible:ring-gray-400/40"
        : "bg-transparent text-gray-800 hover:bg-gray-100 border border-transparent hover:border-gray-300 focus-visible:ring-blue-500/30";

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md transition-colors duration-200
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none focus-visible:ring-2
      ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    />
  );
}
