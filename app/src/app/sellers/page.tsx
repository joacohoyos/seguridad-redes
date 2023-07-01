"use client"

import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "../common/components/materialUI";
import { contentBoxStyle, fullWidthBoxStyle, layoutBoxStyle, titleStyle } from "../common/styles";
import { ISeller } from "./interfaces";
import Loader from "../common/components/Loader";
import SellerCard from "../common/components/SellerCard";
import { EUserRole, getCookie } from "../common/utils";
import api from "../common/api";
import { ENDPOINT_USERS } from "../common/routes";

const SellersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserSeller, setIsUserSeller] = useState(false);
  const [sellers, setSellers] = useState<ISeller[]>();

  useEffect(() => {
    const isLogged = getCookie('accessToken')
    const isSeller = getCookie("role") == EUserRole[0];

    if(!isLogged) {
      window.location.href = "/login"
    }
    if (isSeller) {
     setIsUserSeller(true);
     getSellers();
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const getSellers = async () => {
    try {
      const authRes = await api.get(ENDPOINT_USERS, {
        headers: {
          'Authorization': 'Bearer ' + getCookie("accessToken")?.replaceAll('"', '')
        }
      });

      if(authRes.status == 200)
      {
        setSellers(authRes.data)
      }

    } catch (e : any){
      console.log(e)
    }
  }

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
                    email={seller.email}
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
