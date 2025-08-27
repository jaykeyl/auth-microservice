import SocialLoginButtons from "./SocialLoginButtons";
import FormInput from "./FormInput";
import PrimaryButton from "./PrimaryButton";

export default function SignInForm() {
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
      
      <FormInput
        type="email"
        placeholder="Email"
        name="email"
      />
      
      <FormInput
        type="password"
        name="password"
        placeholder="Password"
      />
      
      <a
        href="#"
        style={{
          color: "#333",
          fontSize: "14px",
          textDecoration: "none",
          margin: "15px 0",
        }}
      >
        Forgot your password?
      </a>
      
      <PrimaryButton>
        Sign In
      </PrimaryButton>
    </div>
  );
}
