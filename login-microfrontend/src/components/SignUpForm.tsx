import SocialLoginButtons from "./SocialLoginButtons";
import FormInput from "./FormInput";
import PrimaryButton from "./PrimaryButton";

export default function SignUpForm() {
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
      
      <FormInput
        type="text"
        name="name"
        placeholder="Name"
      />
      
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
      />
      
      <FormInput
        type="password"
        name="password"
        placeholder="Password"
      />
      
      <PrimaryButton style={{ marginTop: "10px" }}>
        Sign Up
      </PrimaryButton>
    </div>
  );
}
