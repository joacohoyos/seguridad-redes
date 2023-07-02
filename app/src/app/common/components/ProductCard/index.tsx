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
import { endpointPutProductDescription } from "../../routes";
import { getCookie } from "../../utils";

const ProductCard = ({ product, isSeller } : IProductCard) => {

  const { id, name, image, price, description } = product;

  const [isEditing, setIsEditing] = useState(false);
  const [newDesc, setNewDesc] = useState(description);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = async () => {
    try {
      const editRes = await api.put(endpointPutProductDescription(id), {
        description: newDesc
      },{headers: {
        'Authorization': 'Bearer ' + getCookie("accessToken")?.replaceAll('"', '')
      }});

      if (editRes.status === 200) {
      } else {
        setNewDesc(description);
      }
      setIsEditing(false);
    } catch (e: any) {
      console.log(e);
      setNewDesc(description);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewDesc(description);
  };

  return (
    <Card sx={productCardStyle}>
      <Box sx={{...fullWidthBoxStyle, alignItems: "flex-start"}}>
        <Box sx={iconNameBoxStyle}>
          <CategoryIcon sx={{ marginRight: 2 }} fontSize="small" />
          {name}
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
            ) : isSeller ? (
              <IconButton onClick={handleToggleEdit}>
                <EditIcon fontSize="small" />
              </IconButton>
            ) : (<></>)
          }
        </>
      </Box>
      <Box sx={descriptionBoxStyle}>
      <TextField
            multiline
            fullWidth
            defaultValue={description}
            value={newDesc} 
            disabled={!isEditing}
            onChange={(e) => setNewDesc(e.target.value)}
          />
      </Box>
    </Card>
  );
}

export default ProductCard;