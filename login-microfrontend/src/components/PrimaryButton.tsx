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
    border: "1px solid #2563eb",
    background:
      "linear-gradient(135deg, #2563eb 0%, #3b82f6 70%, #7c3aed 100%)",
    color: "#FFFFFF",
    transition: "all 0.3s ease",
  };

  const outlineStyle = {
    ...baseStyle,
    border: "1px solid #FFFFFF",
    backgroundColor: "transparent",
    color: "#FFFFFF",
    transition: "all 0.3s ease",
  };

  return (
    <button
      style={{
        ...(variant === "primary" ? primaryStyle : outlineStyle),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (variant === "primary") {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(37, 99, 235, 0.3)";
        } else {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "primary") {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        } else {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
