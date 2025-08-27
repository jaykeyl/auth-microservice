import type { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export default function FormInput({ placeholder, ...props }: FormInputProps) {
  return (
    <input
      placeholder={placeholder}
      style={{
        backgroundColor: "#eee",
        border: "none",
        padding: "12px 15px",
        margin: "8px 0",
        width: "100%",
        borderRadius: "4px",
        outline: "none",
      }}
      {...props}
    />
  );
}
