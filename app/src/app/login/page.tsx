"use client"

import React, { useState } from "react";
import { AccountCircle, Box, Button, InputAdornment, KeyIcon, TextField, Typography } from "../common/components/materialUI";
import { loginBox } from "./styles";
import { fullWidthBoxStyle, layoutBoxStyle, themedButtonStyle } from "../common/styles";
import api from "../common/api";
import { ENDPOINT_AUTH } from "../common/routes";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const authRes = await api.post(ENDPOINT_AUTH, {
        email,
        password, 
      });

      if (authRes.status === 200) {

      }

    } catch (e: any) {
      console.log(e);
    }

  }

  return (
    <Box sx={layoutBoxStyle}>
      <Box sx={loginBox}>
        <Box width="100%">
          <Typography>Email</Typography>
          <TextField
            id="email"
            fullWidth
            variant="outlined" 
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography>Password</Typography>
          <TextField
            type="password"
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={fullWidthBoxStyle}>
            <Button
              sx={{ 
                ...themedButtonStyle,
                width: "40%",
              }} 
              variant="contained"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
      
    </Box>
  )
}

export default LoginPage;
