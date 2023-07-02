import React from "react";
import { ISellerCard } from "./interfaces";
import { Seller, SellerEmail, SellerImg, SellerInfo, SellerName } from "./styles";

const avatarImgs = (seed: string) => `https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}`

const SellerCard = ({ name, email } : ISellerCard) => {
  return (
    <div style={Seller}>
      <img style={SellerImg} src={avatarImgs(name)} alt={name} />
      <div style={SellerInfo}>
        <h1 style={SellerName}>{name}</h1>
        <p style={SellerEmail}>{email}</p>
      </div>
    </div>
  );
}

export default SellerCard;