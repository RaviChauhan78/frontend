import { Header, NotificationCenter, Sidebar, Workspace } from "../components";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { MobileBreakpoint } from "../styleVariables";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import routes from "../routes";
import { useAppState } from "../components/AppProvider/AppProvider";
import useMountEffect from "../mountEffect";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  panel: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      minHeight: "calc(100vh - 64px)",
      paddingTop: "64px"
    },
    [theme.breakpoints.down("xs")]: {
      height: "auto",
      minHeight: "calc(100vh - 56px)",
      paddingTop: "56px"
    },
    [theme.breakpoints.up("sm")]: {
      height: "calc(100vh - 64px)"
    },
    display: "flex",
    flexDirection: "row",
    flexGrow: 1
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(1) * 2,
    right: theme.spacing(1) * 3
  }
}));

const Dashboard = ({ history }) => {

  const dispat = useDispatch();
  const permissionsData = useSelector((state) => state?.role?.getAllPermissions);
  const [adminPermission, setAdminPermission] = useState('All');

  useEffect(() => {
    if (permissionsData?.data?.status && Array.isArray(permissionsData?.data?.data)) {
      setAdminPermission(permissionsData?.data?.data);
    }
  }, [permissionsData]);

  // const routeWithPermission = routes.items.filter((route) => {
  //   if (route.access === null) {
  //     return true;
  //   } else {
  //     if (adminPermission && (adminPermission.includes(route.access) || adminPermission.includes('All'))) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // });

  const classes = useStyles();
  const [state, dispatch] = useAppState();
  const [opened, setOpened] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [openSpeedDial, setOpenSpeedDial] = useState(false);

  // const token = localStorage.getItem('AccessToken');
  // if (token) {
  //   const decodedToken = jwt_decode(token);
  //   const currentTime = Date.now() / 1000;
  //   if (decodedToken.exp < currentTime) {
  //     window.location.href = '/signin';
  //     return (<></>);
  //   }
  // } else {
  //   window.location.href = '/signin';
  //   return (<></>);
  // }

  const mediaMatcher = matchMedia(`(max-width: ${MobileBreakpoint}px)`);

  const resizeDispatch = () => {
    if (typeof Event === "function") {
      window.dispatchEvent(new Event("resize"));
    } else {
      const evt = window.document.createEvent("UIEvents");
      evt.initUIEvent("resize", true, false, window, 0);
      window.dispatchEvent(evt);
    }
  };

  const handleDrawerToggle = () => {
    setOpened(!opened);
    resizeDispatch();
  };

  const handleNotificationToggle = () =>
    setNotificationsOpen(!notificationsOpen);

  const handleFullscreenToggle = () => {
    const element = document.querySelector("#root");
    const isFullscreen =
      document.webkitIsFullScreen || document.mozFullScreen || false;

    element.requestFullScreen =
      element.requestFullScreen ||
      element.webkitRequestFullScreen ||
      element.mozRequestFullScreen ||
      function () {
        return false;
      };
    document.cancelFullScreen =
      document.cancelFullScreen ||
      document.webkitCancelFullScreen ||
      document.mozCancelFullScreen ||
      function () {
        return false;
      };
    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
  };

  const handleSpeedDialOpen = () => setOpenSpeedDial(true);

  const handleSpeedDialClose = () => setOpenSpeedDial(false);

  const getRoutes = (
    <Switch>
      {routes.items.map((item, index) =>
        item.type === "external" ? (
          <Route
            exact
            path={item.path}
            component={item.component}
            name={item.name}
            key={index}
          />
        ) : item.type === "submenu" ? (
          item.children.map(subItem => (
            <Route
              exact
              path={`${item.path}${subItem.path}`}
              component={subItem.component}
              name={subItem.name}
            />
          ))
        ) : (
          <Route
            exact
            path={item.path}
            component={item.component}
            name={item.name}
            key={index}
          />
        )
      )}
      <Redirect to="/404" />
    </Switch>
  );

  useMountEffect(() => {
    if (mediaMatcher.matches) setOpened(false);
    mediaMatcher.addListener(match => {
      setTimeout(() => {
        if (match.matches) setOpened(false);
        else setOpened(true);
      }, 300);
    });

    const unlisten = history.listen(() => {
      if (mediaMatcher.matches) setOpened(false);
      document.querySelector("#root > div > main").scrollTop = 0;
    });

    return () => {
      unlisten();
      mediaMatcher.removeListener(match => {
        setTimeout(() => {
          if (match.matches) setOpened(false);
          else setOpened(true);
        }, 300);
      });
    };
  });

  return (
    <>
      <Header
        // logoAltText="Primer Admin Template"
        // logo={`${process.env.PUBLIC_URL}/static/images/logo.png`}
        toggleDrawer={handleDrawerToggle}
        toogleNotifications={handleNotificationToggle}
        toggleFullscreen={handleFullscreenToggle}
      />
      <div className={classNames(classes.panel, "theme-dark")}>
        <Sidebar
          routes={routes.items}
          opened={opened}
          toggleDrawer={handleDrawerToggle}
        />
        <Workspace opened={opened}>{getRoutes}</Workspace>
        <NotificationCenter
          notificationsOpen={notificationsOpen}
          toogleNotifications={handleNotificationToggle}
        />
      </div>

    </>
  );
};

export default Dashboard;
