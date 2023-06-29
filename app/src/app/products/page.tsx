"use client"

import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "../common/components/materialUI";
import { contentBoxStyle, fullWidthBoxStyle, layoutBoxStyle, titleStyle } from "../common/styles";
import { IProduct } from "./interfaces";
import Loader from "../common/components/Loader";
import ProductCard from "../common/components/ProductCard";
import { productsWrapperBoxStyle } from "./styles";
import { getCookie } from "../common/utils";
import { EUserRole } from "../common/utils";
import api from "../common/api";
import { ENDPOINT_PRODUCTS } from "../common/routes";

const mockedProducts: IProduct[] = [
  {
    id: "1",
    name: "Zapatillas Nike - Modelo 1",
    price: 150.90,
    description: "El mejor modelo hasta el día de la fecha.",
    image: "string",
  },
  {
    id: "2",
    name: "Zapatillas Nike - Modelo 2",
    price: 120.00,
    description: "Se trata ni más de menos del modelo con la descripción más extensa. La idea de este modelo es probar el responsiveness.",
    image: "string",
  },
  {
    id: "3",
    name: "Zapatillas Nike - Modelo 3",
    price: 100.50,
    description: "string",
    image: "string",
  }
];

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
      console.log(authRes);
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
