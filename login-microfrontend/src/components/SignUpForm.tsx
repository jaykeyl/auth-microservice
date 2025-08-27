import { useState } from "react";
import { object, string } from "yup";
import type { InferType } from "yup";
import SocialLoginButtons from "./SocialLoginButtons";
import FormInput from "./FormInput";
import PrimaryButton from "./PrimaryButton";

const signUpSchema = object({
  name: string().required("Nombre requerido"),
  email: string().required("Email requerido").email("Email inválido"),
  password: string()
    .required("Contraseña requerida")
    .min(6, "Mínimo 6 caracteres"),
});

type SignUpFormData = InferType<typeof signUpSchema>;

export default function SignUpForm() {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = async (name: string, value: string) => {
    try {
      await signUpSchema.validateAt(name, { [name]: value });
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
      await signUpSchema.validate(formData, { abortEarly: false });
      console.log("Registro:", formData);
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
      <h1 style={{ fontWeight: "bold", margin: 0 }}>Create Account</h1>

      <SocialLoginButtons />

      <span style={{ fontSize: "12px" }}>
        or use your email for registration
      </span>

      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <FormInput
          type="text"
          placeholder="Name"
          value={formData.name}
          error={errors.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />

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

        <PrimaryButton
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: "10px",
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Creating..." : "Sign Up"}
        </PrimaryButton>
      </form>
    </div>
  );
}
