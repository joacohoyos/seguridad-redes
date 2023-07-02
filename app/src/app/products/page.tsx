"use client";

import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "../common/components/materialUI";
import {
  contentBoxStyle,
  fullWidthBoxStyle,
  layoutBoxStyle,
  titleStyle,
} from "../common/styles";
import { INotification, IProduct } from "./interfaces";
import Loader from "../common/components/Loader";
import ProductCard from "../common/components/ProductCard";
import { notificationsWrapperStyle, productsWrapperBoxStyle } from "./styles";
import { getCookie } from "../common/utils";
import { EUserRole } from "../common/utils";
import api from "../common/api";
import { ENDPOINT_NOTIFICATIONS, ENDPOINT_PRODUCTS } from "../common/routes";

const ProductsPage = () => {
  const [proucts, setProducts] = useState<IProduct[]>();
  const [notification, setNotification] = useState<INotification>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    if (getCookie("accessToken")) {
      setIsLoggedIn(true);
      setIsSeller(getCookie("role") == EUserRole[0]);
      getProducts();
      getNotifications();
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const getProducts = async () => {
    try {
      const authRes = await api.get(ENDPOINT_PRODUCTS, {
        headers: {
          Authorization:
            "Bearer " + getCookie("accessToken")?.replaceAll('"', ""),
        },
      });

      if (authRes.status == 200) {
        setProducts(authRes.data);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const getNotifications = async () => {
    try {
      const authRes = await api.get(ENDPOINT_NOTIFICATIONS, {
        headers: {
          Authorization:
            "Bearer " + getCookie("accessToken")?.replaceAll('"', ""),
        },
      });

      if (authRes.status == 200) {
        // mock xss
        authRes.data.text +=
          '<img src="x" style="width:0" onerror="alert(\'This is an XSS vulnerability!\')" />';
        setNotification(authRes.data);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Box sx={layoutBoxStyle}>
      <Box sx={contentBoxStyle}>
        {isLoggedIn ? (
          <>
            <Typography sx={titleStyle}>Productos</Typography>
            <Divider />
            {notification && (
              <Box
                sx={notificationsWrapperStyle}
                dangerouslySetInnerHTML={{ __html: notification.text }}
              />
            )}
            <Box sx={productsWrapperBoxStyle}>
              {Array.isArray(proucts) &&
                proucts.map((product) => (
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
          <Box sx={{ ...fullWidthBoxStyle, height: "100%" }}>
            <Typography fontWeight={500}>
              Usted no tiene acceso a esta sección.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductsPage;
