import { React, useContext } from "react";
import { makeStyles } from "@mui/styles";
import bl from "./bl";
import AppContext from "../../../lib/AppContext";
import blClient from "./aboutMe/blClient";
import blAboutMe from "./aboutMe/blAboutMe";
import styles from "../../../styles/Settings.module.css";
import { styled } from "@mui/material/styles";

import Photos from "./photos/index";
import AboutMe from "./aboutMe/AboutMe";
import Locations from "./locations/index";
import Contact from "./contact/index";
import ServicesCategories from "./services-categories/index";
import RatesAvailability from "./rates-availability/index";
import Optional from "./optional/index";
import Services from "./services/Services";
import Connect from "./connect/Connect";
import NFTS from "./nfts/index";
import Security from "./security/index";
import Account from "./Account";
import AboutMeClient from "./aboutMe/AboutMeClient";

import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import {
  IconFlagUK,
  IconFlagUS,
  IconFlagAU,
  IconFlagEU,
} from "material-ui-flags";

import {
  IconButton,
  MenuItem,
  Toolbar,
  AppBar,
  Switch,
  Menu,
  Tooltip,
  Avatar,
} from "@mui/material";

const useStyles = makeStyles(() => ({
  appBar: {
    margin: "55px auto 0 auto",
    backgroundColor: "RGB(255, 255, 255, 0.4) !important",
    borderRadius: "0",
  },
}));

const Input = styled("input")({
  display: "none",
});

const Settings = () => {
  const classes = useStyles();

  const {
    authSwitch,
    handleAuth,
    handleClose,
    handleMenu,
    anchorEl,
    panel,
    setPanel,
    anchorEl2,
    handleFlag,
  } = bl();
  const { auth, user, userRef } = useContext(AppContext);
  const { userProfileRef, handlesetAvailable, photos } = blAboutMe();

  const { uploadProfile, loading } = blClient();
  return (
    <>
      {auth && (
        <AppBar position="static" className={classes.appBar}>
          <Toolbar style={{ display: "flex", justifyContent: "space-around" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Tooltip title={auth ? "Logout" : "Login"}>
                <Switch
                  color="warning"
                  checked={authSwitch}
                  onChange={handleAuth}
                  aria-label="login switch"
                />
              </Tooltip>
              <Tooltip title={"Currency"}>
                <IconButton
                  aria-label="currency"
                  aria-controls="flag"
                  aria-haspopup="true"
                  onClick={(e) => handleFlag(e)}
                >
                  {user.fiat === "USD" ? (
                    <IconFlagUS />
                  ) : user.fiat === "AUD" ? (
                    <IconFlagAU />
                  ) : user.fiat === "GBP" ? (
                    <IconFlagUK />
                  ) : user.fiat === "EUR" ? (
                    <IconFlagEU />
                  ) : null}
                </IconButton>
              </Tooltip>

              <Menu
                id="flag"
                anchorEl={anchorEl2}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl2)}
                onClose={handleClose}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "80px",
                  }}
                >
                  <MenuItem onClick={(e) => handleFlag(e, "GBP")}>
                    <span style={{ marginRight: "10px", fontSize: "1.2em" }}>
                      £
                    </span>
                    <IconFlagUK />
                  </MenuItem>

                  <MenuItem onClick={(e) => handleFlag(e, "USD")}>
                    <span style={{ marginRight: "10px", fontSize: "1.2em" }}>
                      $
                    </span>{" "}
                    <IconFlagUS />
                  </MenuItem>
                  <MenuItem onClick={(e) => handleFlag(e, "EUR")}>
                    <span style={{ marginRight: "10px", fontSize: "1.2em" }}>
                      €
                    </span>{" "}
                    <IconFlagEU />
                  </MenuItem>
                  <MenuItem onClick={(e) => handleFlag(e, "AUD")}>
                    <span style={{ marginRight: "10px", fontSize: "1.2em" }}>
                      $
                    </span>{" "}
                    <IconFlagAU />
                  </MenuItem>
                </div>
              </Menu>
            </div>
            {user.role === "model" ? (
              <Link
                href="/models/[id]"
                as={decodeURIComponent(
                  `/models/${userProfileRef.current.fName?.toLocaleLowerCase()}-${userProfileRef.current.lName?.toLocaleLowerCase()}?id=${
                    user._id
                  }`
                )}
              >
                <Tooltip title="View Profile">
                  <a style={{ cursor: "pointer" }}>
                    <Avatar
                      sx={{ width: 42, height: 42 }}
                      alt={user.fName}
                      src={
                        photos?.length
                          ? photos.filter((item) => item.thumbnail === true)[0]
                              .url
                          : "/user.jpg"
                      }
                    />
                  </a>
                </Tooltip>
              </Link>
            ) : (
              <Tooltip
                title={
                  userProfileRef.current.fName +
                  " " +
                  userProfileRef.current.lName
                }
              >
                {!loading ? (
                  <>
                    <label htmlFor="icon-button-file">
                      <Input
                        onChange={uploadProfile}
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <Avatar
                          sx={{ width: 48, height: 48 }}
                          alt={user.fName}
                          src={user.photo}
                        />
                      </IconButton>
                    </label>
                  </>
                ) : (
                  <CircularProgress />
                )}
              </Tooltip>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {user.role === "client" ? (
                <Tooltip
                  title={
                    !userProfileRef.current.available
                      ? "Turn Available Now On"
                      : "Turn Available Now Off"
                  }
                >
                  <IconButton color="inherit"></IconButton>
                </Tooltip>
              ) : null}

              {user.role === "model" ? (
                <Tooltip
                  title={
                    !userProfileRef.current.available
                      ? "Turn Available Now On"
                      : "Turn Available Now Off"
                  }
                >
                  <IconButton onClick={handlesetAvailable} color="inherit">
                    <PowerSettingsNewIcon
                      style={{
                        color: userProfileRef.current.available
                          ? "#27ae60"
                          : "#e74c3c",
                      }}
                      fontSize="large"
                    />
                  </IconButton>
                </Tooltip>
              ) : null}

              <Tooltip title={"Account Settings"}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <SettingsIcon
                    style={{
                      color: "#ecf0f1",
                    }}
                    fontSize="large"
                  />
                </IconButton>
              </Tooltip>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {user.role === "client" && (
                  <MenuItem onClick={() => setPanel(0)}>Profile</MenuItem>
                )}
                <MenuItem onClick={() => setPanel(4)}>Security</MenuItem>
                <MenuItem onClick={() => setPanel(5)}>Account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      )}

      {user.role === "model" && (
        <>
          <div className={styles.page}>
            <Tooltip title="Photos">
              <AddAPhotoIcon
                sx={{
                  cursor: "pointer",
                  color: panel === 8 ? "#FC9918" : null,
                  borderBottom: panel === 8 ? "1px solid #FC9918" : null,
                  paddingBottom: panel === 8 ? "5px" : null,
                }}
                fontSize="large"
                onClick={() => setPanel(8)}
              />
            </Tooltip>

            <Tooltip title="About Me">
              <PersonIcon
                sx={{
                  cursor: "pointer",
                  color: panel === 0 ? "#FC9918" : null,
                  borderBottom: panel === 0 ? "1px solid #FC9918" : null,
                  paddingBottom: panel === 0 ? "5px" : null,
                }}
                fontSize="large"
                onClick={() => setPanel(0)}
              />
            </Tooltip>
            <Tooltip title="Locations">
              <AddLocationIcon
                sx={{
                  cursor: "pointer",
                  color: panel === 1 ? "#FC9918" : null,
                  borderBottom: panel === 1 ? "1px solid #FC9918" : null,
                  paddingBottom: panel === 1 ? "5px" : null,
                }}
                fontSize="large"
                onClick={() => setPanel(1)}
              />
            </Tooltip>
            <Tooltip title="Contact">
              <ContactPageIcon
                sx={{
                  cursor: "pointer",
                  color: panel === 2 ? "#FC9918" : null,
                  borderBottom: panel === 2 ? "1px solid #FC9918" : null,
                  paddingBottom: panel === 2 ? "5px" : null,
                }}
                fontSize="large"
                onClick={() => setPanel(2)}
              />
            </Tooltip>
            <Tooltip title="Services/Categories">
              <FormatListNumberedIcon
                sx={{
                  cursor: "pointer",
                  color: panel === 3 ? "#FC9918" : null,
                  borderBottom: panel === 3 ? "1px solid #FC9918" : null,
                  paddingBottom: panel === 3 ? "5px" : null,
                }}
                fontSize="large"
                onClick={() => setPanel(3)}
              />
            </Tooltip>
            <Tooltip title="Rates/Availability">
              <MonetizationOnIcon
                sx={{
                  cursor: "pointer",
                  color: panel === 6 ? "#FC9918" : null,
                  borderBottom: panel === 6 ? "1px solid #FC9918" : null,
                  paddingBottom: panel === 6 ? "5px" : null,
                }}
                fontSize="large"
                onClick={() => setPanel(6)}
              />
            </Tooltip>

            <Tooltip title="Optional">
              <FavoriteIcon
                sx={{
                  cursor: "pointer",
                  color: panel === 7 ? "#FC9918" : null,
                  borderBottom: panel === 7 ? "1px solid #FC9918" : null,
                  paddingBottom: panel === 7 ? "5px" : null,
                }}
                fontSize="large"
                onClick={() => setPanel(7)}
              />
            </Tooltip>
          </div>

          {user.role === "model" && <>{panel === 0 && <AboutMe />}</>}
          {user.role === "model" && <>{panel === 8 && <Photos />}</>}
          {user.role === "model" && <>{panel === 1 && <Locations />}</>}
          {user.role === "model" && <>{panel === 2 && <Contact />}</>}
          {user.role === "model" && (
            <>{panel === 3 && <ServicesCategories />}</>
          )}
          {user.role === "model" && <>{panel === 6 && <RatesAvailability />}</>}
          {user.role === "model" && <>{panel === 7 && <Optional />}</>}
        </>
      )}
      {user.role === "client" && <>{panel === 0 && <AboutMeClient />}</>}
      {panel === 4 && <Security />}
      {panel === 5 && <Account />}
    </>
  );
};

export default Settings;
