import { grey } from "@mui/material/colors";
import { fullWidthBoxStyle } from "../../styles";

export const productCardStyle = {
  width: 500,
  padding: 2,
  margin: 2,
  backgroundColor: grey[300],
};

export const iconNameBoxStyle = {
  ...fullWidthBoxStyle,
  justifyContent: "flex-start",
  marginBottom: 2,
};

export const descriptionBoxStyle = {
  ...fullWidthBoxStyle,
  justifyContent: "flex-start",
};

export const descriptionTextStyle = {
  fontSize: 13,
  color: grey[700],
};

export const buttonsWrapperBoxStyle = {
  ...fullWidthBoxStyle,
  justifyContent: "flex-end",
};
