import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { grey } from "@mui/material/colors";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ListIcon from "@mui/icons-material/List";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
const theme = createTheme({
  typography: {
    h6: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 14,
    },
  },
});
const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: grey[500],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${grey[900]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h5" color={grey[100]}>
                    ADMIN
                  </Typography>
                  <IconButton
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={{ color: grey[100] }}
                  >
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                  alt="user"
                  width="100px"
                  height="100px"
                  src={`./images/admin.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
                </Box>
                {/* <Box textAlign="center">
                <Typography
                  variant="h6"
                  color={grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  John Cena
                </Typography>
                <Typography variant="h5" color={lightGreen[500]}>
                  Administrator
                </Typography>
              </Box> */}
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "8%"}>
              <Item
                title="Home"
                to="/dashboard"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant="h6"
                color={grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Admin
              </Typography>
              {/* <Item
                title="Home"
                to="/dashboard"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              /> */}
              <SubMenu
                label="teacher"
                title="Teachers"
                icon={<ContactsOutlinedIcon />}
                style={{
                  color: grey[500],
                }}
              >
                <Item
                title="Add Teacher"
                to="/addteacher"
                icon={<PersonAdd />}
                selected={selected}
                setSelected={setSelected}
              />
                <Item
                  title="Teacher List"
                  to="/list"
                  icon={<ListIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                
              </SubMenu>
             
              <Item
                title="Post"
                to="/createpost"
                icon={<PostAddIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Test/Quiz"
                to="/p"
                icon={<ListIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="List"
                to="/p"
                icon={<ListIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Notes"
                to="/post1"
                icon={<AppRegistrationIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Time Table"
                to="/dummy"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Logout"
                to="/dummy"
                icon={<Logout />}
                selected={selected}
                setSelected={setSelected}
              />
              
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </ThemeProvider>
  );
};

export default Sidebar;
