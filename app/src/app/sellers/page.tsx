"use client"

import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "../common/components/materialUI";
import { contentBoxStyle, fullWidthBoxStyle, layoutBoxStyle, titleStyle } from "../common/styles";
import { ISeller } from "./interfaces";
import Loader from "../common/components/Loader";
import SellerCard from "../common/components/SellerCard";

const mockedSellers: ISeller[] = [
  {
    id: "1",
    name: "Guido Rosito",
    email: "guidorosito@frba.com",
    role: 0,
  },
  {
    id: "2",
    name: "Guido Klajnberg",
    email: "guidoklaj@frba.com",
    role: 0,
  },
  {
    id: "3",
    name: "Joaquín Hoyos",
    email: "jhoyos@frba.com",
    role: 0,
  },
];

/**
 * @TODO
 * 
 * 1. Remove mocked data and fetch it from api.
 * 2. Add read cookie logic to decide if user is a seller or not.
 */

const getCookie = (key : string) => {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}


const SellersPage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isUserSeller, setIsUserSeller] = useState(false);
  const [sellers, setSellers] = useState<ISeller[]>(mockedSellers);


  useEffect(() => {

    const isSeller = getCookie("role") == "vendedor";

    if (isSeller) {
     setIsUserSeller(true);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);



  return (
    <Box sx={layoutBoxStyle}>
      <Box sx={contentBoxStyle}>
        {
          isUserSeller ? (
            <>
              <Typography sx={titleStyle}>Vendedores</Typography> 
              <Divider />
              <Box sx={{...fullWidthBoxStyle, justifyContent: "flex-start", flexWrap: "wrap" }}>
                {Array.isArray(sellers) && sellers.map((seller) => (
                  <SellerCard
                    key={seller.id}
                    name={seller.name}
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

export default SellersPage;
