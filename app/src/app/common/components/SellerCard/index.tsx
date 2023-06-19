import React from "react";
import { Box, Card, Typography } from "../materialUI";
import { ISellerCard } from "./interfaces";
import { emailBoxStyle, emailTextStyle, iconNameBoxStyle, sellerCardStyle } from "./styles";
import { fullWidthBoxStyle } from "../../styles";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const SellerCard = ({ name, email } : ISellerCard) => {

  return (
    <Card sx={sellerCardStyle}>
      <Box sx={iconNameBoxStyle}>
        <PersonOutlineIcon sx={{ marginRight: 2 }} />
        <Typography>{name}</Typography>
      </Box>
      <Box sx={emailBoxStyle}>
        <Typography sx={emailTextStyle}>{`Email: ${email}`}</Typography>
      </Box>
    </Card>
  );
}

export default SellerCard;