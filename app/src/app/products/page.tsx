"use client"

import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "../common/components/materialUI";
import { contentBoxStyle, fullWidthBoxStyle, layoutBoxStyle, titleStyle } from "../common/styles";
import { IProduct } from "./interfaces";
import Loader from "../common/components/Loader";
import ProductCard from "../common/components/ProductCard";
import { productsWrapperBoxStyle } from "./styles";

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

  const [proucts, setProducts] = useState<IProduct[]>(mockedProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const isSeller = false;
    // READ COOKIES LOGIC

    // if (isSeller) {
    //   setIsUserSeller(true);
    // }

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

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
