"use client"

import React, { useState } from "react";
import { Box, Card, IconButton, TextField, Typography } from "../materialUI";
import { IProductCard } from "./interfaces";
import CategoryIcon from '@mui/icons-material/Category';
import { descriptionBoxStyle, descriptionTextStyle, iconNameBoxStyle, productCardStyle } from "./styles";
import EditIcon from '@mui/icons-material/Edit';
import { fullWidthBoxStyle } from "../../styles";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import api from "../../api";
import { ENDPOINT_PRODUCTS, endpointPutProductName } from "../../routes";

const ProductCard = ({ product } : IProductCard) => {

  const { id, name, image, price, description } = product;

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = async () => {
    try {
      const editRes = await api.post(endpointPutProductName(id), {
        name: newName
      });

      if (editRes.status === 200) {
      } else {
        setNewName(name);
      }
      setIsEditing(false);
    } catch (e: any) {
      console.log(e);
      setNewName(name);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewName(name);
  };

  return (
    <Card sx={productCardStyle}>
      <Box sx={{...fullWidthBoxStyle, alignItems: "flex-start"}}>
        <Box sx={iconNameBoxStyle}>
          <CategoryIcon sx={{ marginRight: 2 }} fontSize="small" />
          <TextField
            size="small" 
            value={newName} 
            disabled={!isEditing}
            onChange={(e) => setNewName(e.target.value)}
          />
        </Box>
        <>
          {
            isEditing ? (
              <Box display="flex">
                <IconButton onClick={handleSaveEdit}>
                  <CheckIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={handleCancelEdit}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <IconButton onClick={handleToggleEdit}>
                <EditIcon fontSize="small" />
              </IconButton>
            )
          }
        </>
      </Box>
      <Box sx={descriptionBoxStyle}>
        <Typography sx={descriptionTextStyle}>{`${description}`}</Typography>
      </Box>
    </Card>
  );
}

export default ProductCard;