import React from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";
import { makeStyles, Grid, Typography, Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";

import classnames from 'classnames'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  list: {
    width: "100%",
    maxWidth: 360,
    outline: 'none',
    backgroundColor: theme.palette.background.paper
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color : '#fff'
  },
  hide: {
    display: "none"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background : 'linear-gradient(179.36deg, #19388a -1.39%, #4f91cd 107.57%)',
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  sectionDesktop: {
    display: "flex",
    textAlign: "right"
  },
  color: {
    color: "white"
  },
  black: {
    color: "black",
    textDecoration: "none"
  },
  MuiListItemIconRoot: {
    color: 'rgba(0, 0, 0, 0.54)',
    display: 'inline-flex',
    minWidth: '36px',
    flexShrink: 0,
  },
  listWidth: {
    width: '250px',
  },
  paddingBottom: {
    paddingBottom: theme.spacing(2),
  },
  paddingTop : {
    paddingTop: theme.spacing(1),
  },
}));


export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
 
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      
    </Menu>
  );

 
  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open
        })}
      >
        <Toolbar>
            <IconButton
                edge="start"
                className={clsx(classes.menuButton, props.open && classes.hide)}
                color="inherit"
                aria-label="open drawer"
                onClick={props.handleDrawerOpen}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap className={classes.appName}>
              IPL
            </Typography>
          <div className={classes.grow} />

        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}


