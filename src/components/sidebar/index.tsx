import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, {
  AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainListItem, secondaryListItem } from "../listItems";
// import { Outlet } from "react-router-dom";
import { Tornado, UserCheck } from "../../assets/icons";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { SignOutRound } from "../../assets/icons";

import {logoutRequest} from "../../shared/api/auth-api";

import {deleteUser} from "../../redux/auth/auth-slice";

const drawerWidth = 240;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(0),
  height: "100vh",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    margin: theme.spacing(0),
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Sidebar() {
  // {
  // children,
  // }: React.PropsWithChildren
  // const theme = useTheme()
  const { user } = useSelector((state: any) => state.auth);
  const location = useLocation();
  const pathName = location.pathname;
  const [open, setOpen] = React.useState(false);
  const [openItem, setOpenItem] = React.useState<number | null>(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    user?.login && setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const signOut = async ()=> {
    try {
      await logoutRequest();
      setOpen(false);
      dispatch(deleteUser());
      navigate("/");
    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ bgcolor: "rgba(255,255,255,0.5)" }}
        open={open}
      >
        <Toolbar>
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
              bgcolor: "#5255bc",
            }}
          >
            <Tornado
              sx={{ mr: 1, fill: "#fcfcfc" }}
              fontSize="medium"
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="h2"
            color="#5255bc"
          >
            Funnel / Filler
          </Typography>
          {user.login && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 40,
                bgcolor: "#e1e3ff",
                borderRadius: "20px",
                ml: "auto",
              }}
            >
              <UserCheck fill="#5255bc" sx={{ fontSize: 20 }} />
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Tornado
            sx={{ mr: "auto", fill: "#5255bc" }}
            fontSize="medium"
          />
        </DrawerHeader>
        <IconButton
          onClick={handleDrawerClose}
          sx={{
            color: "#5255bc",
            bgcolor: "#fcfcfc",
            position: "absolute",
            right: 0,
            top: 45,
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <List>
          {mainListItem.map((text, idx) => (
            <NavLink
              to={text?.path}
              key={text.text}
              style={{ textDecoration: "none" }}
            >
              <ListItem
                disablePadding
                sx={{
                  bgcolor: openItem === idx ? "#e1e3ff" : "#fcfcfc",
                  borderRight:
                    openItem === idx
                      ? "4px solid #9092d6"
                      : "#fcfcfc",
                }}
              >
                <ListItemButton
                  selected={pathName === text.path}
                  onClick={() => setOpenItem(idx)}
                >
                  <ListItemIcon>{text.icon}</ListItemIcon>
                  <ListItemText
                    primary={text.text}
                    sx={{ fontSize: 16, color: "#161616" }}
                  />
                  {text.attach.length > 0 &&
                    (openItem === idx ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    ))}
                </ListItemButton>
              </ListItem>
              {text.attach.length > 0 &&
                text.attach.map((item) => (
                  <Collapse
                    in={openItem === idx}
                    timeout="auto"
                    key={item}
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 10 }}>
                        <ListItemText primary={item} />
                      </ListItemButton>
                    </List>
                  </Collapse>
                ))}
            </NavLink>
          ))}
        </List>
        <Divider sx={{ mt: 16, mb: 3 }} />
        <List>
          <ListItem disablePadding onClick={signOut}>
            <ListItemButton>
              <ListItemIcon><SignOutRound sx={{ fontSize: 32 }} /></ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </ListItem>
          {/* {secondaryListItem.map((text) => (
            <ListItem key={text.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.text} />
              </ListItemButton>
            </ListItem>
          ))} */}
        </List>
      </Drawer>
      <Main
        open={open}
        sx={{ width: `calc(100% - ${drawerWidth}px)` }}
      >
        <DrawerHeader sx={{ height: 60 }} />
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet.
          Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est
          ultricies integer quis. Cursus euismod quis viverra nibh
          cras. Metus vulputate eu scelerisque felis imperdiet proin
          fermentum leo. Mauris commodo quis imperdiet massa
          tincidunt. Cras tincidunt lobortis feugiat vivamus at augue.
          At augue eget arcu dictum varius duis at consectetur lorem.
          Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla
          est ullamcorper eget nulla facilisi etiam dignissim diam.
          Pulvinar elementum integer enim neque volutpat ac tincidunt.
          Ornare suspendisse sed nisi lacus sed viverra tellus. Purus
          sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate
          odio. Morbi tincidunt ornare massa eget egestas purus
          viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor.
          Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod
          elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin
          aliquam ultrices sagittis orci a.
        </Typography> */}
        <Outlet />
        {/* {children} */}
      </Main>
    </Box>
  );
}
