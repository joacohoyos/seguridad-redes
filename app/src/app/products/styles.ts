import { fullWidthBoxStyle } from "../common/styles";

export const productsWrapperBoxStyle = {
  ...fullWidthBoxStyle,
  alignItems: "stretch",
  justifyContent: "flex-start",
  flexWrap: "wrap",
};

export const notificationsWrapperStyle = {
  ...productsWrapperBoxStyle,
  backgroundColor: "#FF6C70",
  color: "#fff",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "5px",
  width: "80%",
  margin: "10px auto",
  padding: "20px",
};
