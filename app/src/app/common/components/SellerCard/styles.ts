import { grey } from "@mui/material/colors";
import { fullWidthBoxStyle } from "../../styles";

export const sellerCardStyle = {
  width: 240,
  height: 100,
  padding: 2,
  margin: 2,
  backgroundColor: grey[300],
};

export const iconNameBoxStyle = {
  ...fullWidthBoxStyle,
  justifyContent: "flex-start",
  marginBottom: 2,
};

export const emailBoxStyle = {
  ...fullWidthBoxStyle,
  justifyContent: "flex-start",
};

export const emailTextStyle = {
  fontSize: 13,
  color: grey[700],
};
