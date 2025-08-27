import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline";
}

export default function PrimaryButton({
  children,
  variant = "primary",
  style,
  ...props
}: PrimaryButtonProps) {
  const baseStyle = {
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    padding: "12px 45px",
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
    transition: "transform 80ms ease-in",
    cursor: "pointer",
    outline: "none",
  };

  const primaryStyle = {
    ...baseStyle,
    border: "1px solid #FF4B2B",
    backgroundColor: "#FF4B2B",
    color: "#FFFFFF",
  };

  const outlineStyle = {
    ...baseStyle,
    border: "1px solid #FFFFFF",
    backgroundColor: "transparent",
    color: "#FFFFFF",
  };

  return (
    <button
      style={{
        ...(variant === "primary" ? primaryStyle : outlineStyle),
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
