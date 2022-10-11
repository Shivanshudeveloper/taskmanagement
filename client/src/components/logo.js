import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Logo1 from "./images/image.png";
import Logo2 from "./images/image (1).png";
// import "./Css/logo.style.css";

export const Logo = styled((props) => {
  const { variant, ...other } = props;

  const color = variant === "light" ? "#C1C4D6" : "#5048E5";

  return (
    <>
      <div
        style={{
          minWidth: "4rem",
          height: "4rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className="logo-container"
      >
        <img
          style={{ width: "3rem", height: "3rem", borderRadius: "4px" }}
          src="https://res.cloudinary.com/daboha8rt/image/upload/v1665480419/tasksaas/image_11_d4lbjw.png"
          alt=""
        />
        <img
          style={{ width: "200px" }}
          src="https://res.cloudinary.com/daboha8rt/image/upload/v1665480420/tasksaas/image_12_fcxpx4.png"
          alt=""
        />
      </div>
    </>
  );
})``;

Logo.defaultProps = {
  variant: "primary",
};

Logo.propTypes = {
  variant: PropTypes.oneOf(["light", "primary"]),
};
