import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { useAuth } from "../Hooks/useAuth";

const SideBar = styled(Box)(({ theme }) => ({
  width: "5%",
  height: "106vh",
  backgroundColor: theme.palette.primary.main,
  position: "absolute",
  top: 0,
  zIndex: 20,
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  padding: "20px",
  paddingRight: "50px",
  marginLeft: "5%",
}));

const TopBar = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "8vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  backgroundColor: theme.palette.primary.light,
}));

function Layout() {
  const navigate = useNavigate();

  return (
    <>
      <TopBar>
        <Tooltip title={"Logout"}>
          <IconButton
            onClick={() => {
              navigate("/login");
              localStorage.clear();
            }}
          >
            <Logout color="primary" />
          </IconButton>
        </Tooltip>
      </TopBar>
      <Stack direction={"row"} height={"100vh"}>
        <SideBar></SideBar>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </Stack>
    </>
  );
}

export default Layout;
