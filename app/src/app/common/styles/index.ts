export const PRIMARY_100 = "#ceadff";
export const PRIMARY_200 = "#ae7cf9";
export const PRIMARY_300 = "#a468ff";
export const PRIMARY_400 = "#954fff";
export const PRIMARY_500 = "#8229ff";
export const PRIMARY_600 = "#7921ff";
export const PRIMARY_700 = "#6b0afc";
export const PRIMARY_800 = "#5b00e5";
export const PRIMARY_900 = "#4e00c4";

export const layoutBoxStyle = {
  backgroundColor: PRIMARY_500,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100vh",
};

export const fullWidthBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

export const themedButtonStyle = {
  width: "40%",
  marginY: 2,
  backgroundColor: PRIMARY_500,
  "&:hover": {
    backgroundColor: PRIMARY_700,
  },
};

export const contentBoxStyle = {
  width: "95%",
  height: "95%",
  padding: 2,
  backgroundColor: "white",
  borderRadius: 2,
};

export const titleStyle = {
  fontSize: 28,
  fontWeight: 600,
};

export const textFieldStyle = {
  height: 40,
};
