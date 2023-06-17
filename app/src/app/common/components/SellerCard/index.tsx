import React from "react";
import { Card, Typography } from "../materialUI";
import { ISellerCard } from "./interfaces";
import { sellerCardStyle } from "./styles";

const SellerCard = ({ name } : ISellerCard) => {

  return (
    <Card sx={sellerCardStyle}>
      <Typography>{name}</Typography>
    </Card>
  );
}

export default SellerCard;