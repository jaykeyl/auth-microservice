import LoginContainer from "../components/LoginContainer";

export default function Login() {
  return (
    <div
      style={{
        background: "#f6f5f7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Montserrat, sans-serif",
        height: "100vh",
        margin: "-20px 0 50px",
      }}
    >
      <h2>Sign in/up Form</h2>
      <LoginContainer />
    </div>
  );
}
