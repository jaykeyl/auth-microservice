interface SocialLoginButtonsProps {
  className?: string;
}

export default function SocialLoginButtons({
  className,
}: SocialLoginButtonsProps) {
  const socialButtonStyle = {
    border: "1px solid #e2e8f0",
    borderRadius: "50%",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 5px",
    height: "40px",
    width: "40px",
    textDecoration: "none",
    color: "#2563eb",
    backgroundColor: "#ffffff",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 4px rgba(37, 99, 235, 0.1)",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.2)";
    e.currentTarget.style.borderColor = "#3b82f6";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 2px 4px rgba(37, 99, 235, 0.1)";
    e.currentTarget.style.borderColor = "#e2e8f0";
  };

  return (
    <div
      className={className}
      style={{
        margin: "20px 0",
      }}
    >
      <a
        href="#"
        style={socialButtonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <i className="fab fa-facebook-f" />
      </a>
      <a
        href="#"
        style={socialButtonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <i className="fab fa-google-plus-g" />
      </a>
      <a
        href="#"
        style={socialButtonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <i className="fab fa-linkedin-in" />
      </a>
    </div>
  );
}
