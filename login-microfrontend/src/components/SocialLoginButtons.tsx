interface SocialLoginButtonsProps {
  className?: string;
}

export default function SocialLoginButtons({ className }: SocialLoginButtonsProps) {
  return (
    <div
      className={className}
      style={{
        margin: "20px 0",
      }}
    >
      <a
        href="#"
        style={{
          border: "1px solid #DDDDDD",
          borderRadius: "50%",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 5px",
          height: "40px",
          width: "40px",
          textDecoration: "none",
          color: "#333",
        }}
      >
        <i className="fab fa-facebook-f" />
      </a>
      <a
        href="#"
        style={{
          border: "1px solid #DDDDDD",
          borderRadius: "50%",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 5px",
          height: "40px",
          width: "40px",
          textDecoration: "none",
          color: "#333",
        }}
      >
        <i className="fab fa-google-plus-g" />
      </a>
      <a
        href="#"
        style={{
          border: "1px solid #DDDDDD",
          borderRadius: "50%",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 5px",
          height: "40px",
          width: "40px",
          textDecoration: "none",
          color: "#333",
        }}
      >
        <i className="fab fa-linkedin-in" />
      </a>
    </div>
  );
}
