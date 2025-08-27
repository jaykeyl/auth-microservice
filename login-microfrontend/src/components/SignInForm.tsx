import { useState } from "react";
import { object, string } from "yup";
import type { InferType } from "yup";
import SocialLoginButtons from "./SocialLoginButtons";
import FormInput from "./FormInput";
import PrimaryButton from "./PrimaryButton";

const signInSchema = object({
  email: string().required("Email requerido").email("Email inválido"),
  password: string().required("Contraseña requerida"),
});

type SignInFormData = InferType<typeof signInSchema>;

export default function SignInForm() {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = async (name: string, value: string) => {
    try {
      await signInSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      if (error instanceof Error) {
        setErrors((prev) => ({ ...prev, [name]: error.message }));
      }
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await signInSchema.validate(formData, { abortEarly: false });
      console.log("Login:", formData);
    } catch (error) {
      const newErrors: Record<string, string> = {};
      if (error && typeof error === "object" && "inner" in error) {
        const validationError = error as {
          inner?: Array<{ path?: string; message: string }>;
        };
        validationError.inner?.forEach((err) => {
          if (err.path) newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 50px",
        height: "100%",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontWeight: "bold", margin: 0 }}>Sign in</h1>

      <SocialLoginButtons />

      <span style={{ fontSize: "12px" }}>or use your account</span>

      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <FormInput
          type="email"
          placeholder="Email"
          value={formData.email}
          error={errors.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />

        <FormInput
          type="password"
          placeholder="Password"
          value={formData.password}
          error={errors.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
        />

        <a
          href="#"
          style={{
            color: "#2563eb",
            fontSize: "14px",
            textDecoration: "none",
            margin: "15px 0",
            display: "block",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#1d4ed8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#2563eb";
          }}
        >
          Forgot your password?
        </a>

        <PrimaryButton
          type="submit"
          disabled={isSubmitting}
          style={{
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </PrimaryButton>
      </form>
    </div>
  );
}
