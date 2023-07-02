"use client"

import React, { useEffect, useState } from "react";
import { IProduct } from "./products/interfaces";
import { EUserRole, getCookie } from "./common/utils";
import { ENDPOINT_PRODUCTS } from "./common/routes";
import api from "./common/api";
import { contentBoxStyle, fullWidthBoxStyle, layoutBoxStyle, titleStyle } from "./common/styles";
import { Box, Divider, Typography } from "@mui/material";
import { productsWrapperBoxStyle } from "./products/styles";
import ProductCard from "./common/components/ProductCard";
import Loader from "./common/components/Loader";

const ProductsPage = () => {

  const [proucts, setProducts] = useState<IProduct[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    if(getCookie("accessToken")){
      setIsLoggedIn(true);
      setIsSeller(getCookie("role") == EUserRole[0]);
      getProducts()
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const getProducts = async () =>{
    try{
      const authRes = await api.get(ENDPOINT_PRODUCTS, {
        headers: {
          'Authorization': 'Bearer ' + getCookie("accessToken")?.replaceAll('"', '')
        }
      });
      
      if(authRes.status == 200)
      {
        setProducts(authRes.data)
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <Box sx={layoutBoxStyle}>
      <Box sx={contentBoxStyle}>
      {
          isLoggedIn ? (
            <>
              <Typography sx={titleStyle}>Productos</Typography> 
              <Divider />
              <Box sx={productsWrapperBoxStyle}>
                {Array.isArray(proucts) && proucts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSeller={isSeller}
                  />
                ))}             
              </Box>
            </>
          ) : isLoading ? (
            <Loader />
          ) : (
            <Box sx={{...fullWidthBoxStyle, height: "100%" }}>
              <Typography fontWeight={500}>Usted no tiene acceso a esta sección.</Typography>
            </Box>
          )
        }

      </Box>

    </Box>
  )
}

export default ProductsPage;
