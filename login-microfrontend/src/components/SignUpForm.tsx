import { useState } from "react";
import { object, string } from "yup";
import type { InferType } from "yup";
import { Form, Input } from "antd";
import SocialLoginButtons from "./SocialLoginButtons";
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
  const [form] = Form.useForm<SignUpFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: SignUpFormData) => {
    setIsSubmitting(true);
    try {
      await signUpSchema.validate(values, { abortEarly: false });
      console.log("Registro:", values);
    } catch (error) {
      if (error && typeof error === "object" && "inner" in error) {
        const validationError = error as {
          inner?: Array<{ path?: string; message: string }>;
        };

        const fieldErrors = validationError.inner?.map((err) => {
          if (!err.path) return null;
          return {
            name: err.path as "name" | "email" | "password",
            errors: [err.message],
          };
        }).filter(Boolean) as {
          name: "name" | "email" | "password";
          errors: string[];
        }[];

        form.setFields(fieldErrors);
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

      <span style={{ fontSize: "12px" }}>or use your email for registration</span>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ width: "100%", marginTop: "16px" }}
      >
        <Form.Item name="name">
          <Input placeholder="Name" size="large"/>
        </Form.Item>

        <Form.Item name="email">
          <Input placeholder="Email" type="email" size="large"/>
        </Form.Item>

        <Form.Item name="password">
          <Input.Password placeholder="Password" size="large" />
        </Form.Item>


        <PrimaryButton
          htmlType="submit"
          disabled={isSubmitting}
          style={{
            marginTop: "10px",
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Creating..." : "Sign Up"}
        </PrimaryButton>
      </Form>
    </div>
  );
}
