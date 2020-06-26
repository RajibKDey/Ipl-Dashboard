import React from "react";

import clsx from "clsx";

import { makeStyles, useTheme, Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Icon } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import logo from '../../static/index.png'

import classnames from "classnames";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    '& .material-icons' : {
      color : theme.palette.white.main
    },
    '& .MuiTypography-body1' : {
      color : theme.palette.white.main
    }
  },
  drawerOpen: {
    background : 'linear-gradient(108.15deg, #4f91cd -1.39%, #19388a 107.57%)',
    color : '#fff',
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    '& .material-icons' : {
      color : theme.palette.white.main
    },
    '& .MuiSvgIcon-root' : {
      color : theme.palette.white.main
    },
    '& .MuiTypography-body1' : {
      color : theme.palette.white.main
    }
  },
  drawerClose: {
    background : 'linear-gradient(108.15deg, #4f91cd -1.39%, #19388a 107.57%)',
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    // justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  link: {
    textDecoration: "none",
    color: "black"
  },
  justifyFlexEnd: {
    justifyContent: "flex-end"
  },
  flex1: {
    flex: "1"
  },
  active : {
    color : theme.palette.white.main,
      '& .MuiListItem-root' : {
          backgroundColor : 'rgba(0, 0, 0, 0.16)',
          color: theme.palette.white.main,
      },
      '& .MuiIcon-root' : {
        // color : theme.palette.primary.main
      }
  },
  image: {
    width: "90px",
    height: "50px"
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();

  const extMenu = [
    { text: "Dashboard", icon: "dashboard", link: "/nursedashboard" },
    { text: "Client Database", icon: "person", link: "/clientdatabase" },
    { text: "Dispensary Record", icon: "shopping_cart", link: "/dispensary" },
    { text: "Billing Record", icon: "store", link: "/billing" },
    { text: "Summary & Checkout", icon: "assignment_turned_in", link: "./summary" }
  ]

  const theme = useTheme();
  return (
    <>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open
          })
        }}
      >
        <div className={classes.toolbar}>
          <div className={classnames(classes.toolbar, classes.flex1)}>
            <img className={classes.image} src={logo} alt="logo" />
          </div>
          <div className={classnames(classes.toolbar, classes.justifyFlexEnd)}>
            <IconButton onClick={props.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
        </div>
        <Divider />
        <List>
          { 
           extMenu.map((object, index) => (
              <NavLink
                key={index}
                to={object.link}
                className={classes.link}
                activeClassName={classes.active}
              >
                <ListItem button key={object.text} className={classes.menuLink}>
                  <ListItemIcon>
                    <Icon>{object.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={object.text} />
                </ListItem>
              </NavLink>
            ))
          }
        </List>
      </Drawer>
    </>
  );
}


