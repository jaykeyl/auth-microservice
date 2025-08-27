import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignInFormData) => {
    console.log("Login:", data);
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

      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <FormInput
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          {...register("email")}
        />

        <FormInput
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register("password")}
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
