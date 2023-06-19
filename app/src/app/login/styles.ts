import {
  PRIMARY_400,
  PRIMARY_500,
  PRIMARY_600,
  PRIMARY_900,
} from "../common/styles";

export const loginBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 10,
  width: 400,
  height: 380,
  borderRadius: 4,
  paddingX: 3,
  backgroundColor: "white",
};

export const appTitleTextStyle = {
  fontSize: 24,
  fontWeight: 600,
  marginY: 2,
};

export const forgorYourPasswordTextStyle = {
  marginTop: 1,
  fontSize: 14,
  color: PRIMARY_400,
  cursor: "pointer",
  "&:hover": {
    color: PRIMARY_600,
    textDecoration: "underline",
  },
  "&:active": {
    color: PRIMARY_900,
    textDecoration: "underline",
  },
};

export const modalBoxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  borderRadius: 4,
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingX: 4,
  paddingY: 2,
};
