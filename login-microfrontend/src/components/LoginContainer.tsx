import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import OverlayPanel from "./OverlayPanel";

export default function LoginContainer() {
  const [type, setType] = useState<"signIn" | "signUp">("signIn");

  const handleOnClick = (text: "signIn" | "signUp") => {
    if (text !== type) {
      setType(text);
    }
  };

  const isRightPanelActive = type === "signUp";

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        position: "relative",
        overflow: "hidden",
        width: "768px",
        maxWidth: "100%",
        minHeight: "480px",
      }}
    >
      {/* Sign Up */}
      <div
        style={{
          position: "absolute",
          top: 0,
          height: "100%",
          transition: "all 0.6s ease-in-out",
          left: 0,
          width: "50%",
          opacity: isRightPanelActive ? 1 : 0,
          zIndex: isRightPanelActive ? 5 : 1,
          transform: isRightPanelActive ? "translateX(100%)" : "translateX(0)",
        }}
      >
        <SignUpForm />
      </div>

      {/* Sign In */}
      <div
        style={{
          position: "absolute",
          top: 0,
          height: "100%",
          transition: "all 0.6s ease-in-out",
          left: 0,
          width: "50%",
          zIndex: 2,
          transform: isRightPanelActive ? "translateX(100%)" : "translateX(0)",
        }}
      >
        <SignInForm />
      </div>

      {/* Overlay Container */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "50%",
          height: "100%",
          overflow: "hidden",
          transition: "transform 0.6s ease-in-out",
          zIndex: 100,
          transform: isRightPanelActive ? "translateX(-100%)" : "translateX(0)",
        }}
      >
        <div
          style={{
            background: "linear-gradient(to right, #FF4B2B, #FF416C)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "0 0",
            color: "#FFFFFF",
            position: "relative",
            left: "-100%",
            height: "100%",
            width: "200%",
            transform: isRightPanelActive ? "translateX(50%)" : "translateX(0)",
            transition: "transform 0.6s ease-in-out",
          }}
        >
          <OverlayPanel
            title="Welcome Back!"
            description="To keep connected with us please login with your personal info"
            buttonText="Sign In"
            onClick={() => handleOnClick("signIn")}
            position="left"
            isActive={isRightPanelActive}
          />

          <OverlayPanel
            title="Hello, Friend!"
            description="Enter your personal details and start journey with us"
            buttonText="Sign Up"
            onClick={() => handleOnClick("signUp")}
            position="right"
            isActive={isRightPanelActive}
          />
        </div>
      </div>
    </div>
  );
}
