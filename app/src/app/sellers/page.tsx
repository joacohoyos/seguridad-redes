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
import { SellersList } from "./styles";
import { Footer, FooterText, Header, LogButton, Logo } from "../products/styles";
import { delete_cookie } from "sfcookies";

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
    } else {
      setIsLoading(false)
    }

  }, []);

  const getSellers = async () => {
    setIsLoading(true)
    try {
      const authRes = await api.get(ENDPOINT_USERS, {
        headers: {
          'Authorization': 'Bearer ' + getCookie("accessToken")?.replaceAll('"', '')
        }
      });

      console.log(authRes.data)
      if(authRes.status == 200)
      {
        setSellers(authRes.data)
      }

    } catch (e : any){
      console.log(e)
    }
    setIsLoading(false)
  }

  const handleLogClick = () => {
      delete_cookie("accessToken");
      delete_cookie("role");
      window.location.href = "/"
  }
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={Header}>
        <img style={Logo} src='https://seeklogo.com/images/K/kings-sneakers-logo-5B97CC79A1-seeklogo.com.png' />
        <button onClick={handleLogClick} style={LogButton}>{'Logout'}</button>
      </div>
      <Box sx={{...contentBoxStyle, minHeight: 'calc(100vh - 63px - 85px)'}}>
        {
          isUserSeller ? (
            <>
              <Typography sx={{...titleStyle, color: 'black'}}>Vendedores de la plataforma</Typography> 
              <Divider />
              <div style={SellersList}>
                {Array.isArray(sellers) && sellers.map((seller) => (
                  <SellerCard
                    key={seller.id}
                    name={seller.name}
                    email={seller.email}
                  />
                ))}
                </div>             
            </>
          ) : isLoading ? (
            <Loader />
          ) : (
            <Box sx={{...fullWidthBoxStyle, height: "100%" }}>
              <Typography style={{color: 'black',
  fontFamily: 'Lato, sans-serif',
  fontSize: '25px',}} fontWeight={500}>Usted no tiene acceso a esta sección.</Typography>
            </Box>
          )
        }
      </Box>
      <div style={Footer}>
        <p style={FooterText}>Kings Sneakers © 2023</p>
      </div>
    </div>
  )
}

export default SellersPage;
