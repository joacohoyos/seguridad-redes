"use client"

import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "../common/components/materialUI";
import { contentBoxStyle, fullWidthBoxStyle, titleStyle } from "../common/styles";
import { ADMIN_ROUTES, IRoute, ISeller, SELLER_ROUTES } from "./interfaces";
import Loader from "../common/components/Loader";
import SellerCard from "../common/components/SellerCard";
import { EUserRole, getCookie } from "../common/utils";
import api from "../common/api";
import { ENDPOINT_USERS } from "../common/routes";
import { SellersList } from "./styles";
import { Footer, FooterText, Header, LogButton, Logo, NavigationBar } from "../products/styles";
import { delete_cookie } from "sfcookies";

const SellersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserSeller, setIsUserSeller] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [sellers, setSellers] = useState<ISeller[]>();
  const [routes, setRoutes] = useState<IRoute[]>([])

  useEffect(() => {
    const isLogged = getCookie('accessToken')
    const isSeller = getCookie("role") == EUserRole[0];
    const isAdmin = getCookie('role') == EUserRole[2]

    if(!isLogged) {
      window.location.href = "/login"
    }
    if (isSeller) {
     setIsUserSeller(true);
     setRoutes(SELLER_ROUTES)
     getSellers();
    } else if (isAdmin) {
      setIsUserAdmin(true);
     setRoutes(ADMIN_ROUTES)
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
    <>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{...Header}}>
        <img style={Logo} src='https://seeklogo.com/images/K/kings-sneakers-logo-5B97CC79A1-seeklogo.com.png' />
        <button onClick={handleLogClick} style={LogButton}>{'Logout'}</button>
      </div>
      <div style={NavigationBar}>
        {routes.map((route) => {
          return <div onClick={() => window.location.href = route.path}>
            {route.name}
            </div>
        })}
      </div>
      <Box sx={{...contentBoxStyle, minHeight: 'calc(100vh - 63px - 85px)'}}>
        {
          isUserSeller || isUserAdmin ? (
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
    </>
  )
}

export default SellersPage;
