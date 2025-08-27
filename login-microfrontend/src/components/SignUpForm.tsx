import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import type { InferType } from "yup";
import SocialLoginButtons from "./SocialLoginButtons";
import FormInput from "./FormInput";
import PrimaryButton from "./PrimaryButton";

// Esquema de validación local
const signUpSchema = object({
  name: string().required("Nombre requerido"),
  email: string().required("Email requerido").email("Email inválido"),
  password: string()
    .required("Contraseña requerida")
    .min(6, "Mínimo 6 caracteres"),
});

type SignUpFormData = InferType<typeof signUpSchema>;

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log("Registro:", data);
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

      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <FormInput
          type="text"
          placeholder="Name"
          error={errors.name?.message}
          {...register("name")}
        />

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
