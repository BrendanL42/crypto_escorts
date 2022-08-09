import styles from "./locations.module.css";
import Tours from "./Tours";
import { makeStyles } from "@mui/styles";
import Selects from "../../inputs/Selects";
import Btn from "../../btn/Save";
import bl from "./bl";
import locations from "../aboutMe/locations";
import {
  MenuItem,
  Grid,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  DialogTitle,
  DialogContentText,
} from "@mui/material";

import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import AirplanemodeInactiveIcon from "@mui/icons-material/AirplanemodeInactive";

const Locations = () => {
  const {
    userProfile,
    handleCountry,
    handleState,
    handleCity,
    tabs,
    selectCurrentCity,
    currentCity,
    touring,
    handleTouring,
    onSave,
    handleClickOpen,
    handleClose,
    open,
  } = bl();

  const {
    getCountries,
    getCitiesOfState,
    statesOfAustralia,
    statesOfNewZealand,
    statesOfUK,
    statesOfSinapore,
  } = locations();

  const wrapper = {
    padding: "1em",
    height: "auto",
    marginBottom: "5em",
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {!touring
              ? "Switching to a touring only profile will remove you from all your permanent cities"
              : "Your about to switch to a permanent city and touring escort profile"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleTouring} autoFocus>
            Confirm Switch
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={2} sx={wrapper}>
        <Grid item xs={12} align="center">
          {userProfile.touring ? (
            <AirplanemodeActiveIcon
              onClick={handleClickOpen}
              fontSize="large"
              sx={{ color: "#27ae60", cursor: "pointer" }}
            />
          ) : (
            <AirplanemodeInactiveIcon
              onClick={handleClickOpen}
              fontSize="large"
              sx={{ color: "#bdc3c7", cursor: "pointer" }}
            />
          )}

          {!userProfile.touring ? (
            <p>
              Switch to a touring escort profile <br /> ( no permanent location
              needed )
            </p>
          ) : (
            <p>Switch to a touring and permanently based escort profile</p>
          )}
        </Grid>

        {!userProfile.touring ? (
          <>
            <Grid item xs={12}>
              <Selects
                id="country"
                helperText={"Which country are you based in ?"}
                labelId="country"
                value={userProfile.country ? userProfile.country : ""}
                label="Country"
                name="countries"
                onChange={handleCountry}
                select={getCountries().map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    {item.menu}
                  </MenuItem>
                ))}
              />
            </Grid>
            <Grid item xs={12}>
              <p>Here you can add up to 5 cities to permanently appear in</p>
            </Grid>
            <Grid item xs={12}>
              <div className={styles.modelCircles}>
                {tabs.map((tab, i) => (
                  <div
                    onClick={() => selectCurrentCity(i + 1)}
                    className={
                      i + 1 === currentCity
                        ? styles.modelCircleSelected
                        : styles.modelCircle
                    }
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={6}>
              <Selects
                id="states"
                helperText={"State"}
                labelId="states"
                value={
                  currentCity === 1
                    ? userProfile.stateOne
                    : currentCity === 2
                    ? userProfile.stateTwo
                    : currentCity === 3
                    ? userProfile.stateThree
                    : currentCity === 4
                    ? userProfile.stateFour
                    : currentCity === 5
                    ? userProfile.stateFive
                    : ""
                }
                label="State"
                name="states"
                onChange={handleState}
                select={
                  userProfile.country === "AU"
                    ? statesOfAustralia.map((item, i) => (
                        <MenuItem key={i} value={item.isoCode}>
                          {item.name}
                        </MenuItem>
                      ))
                    : userProfile.country === "GB"
                    ? statesOfUK.map((item, i) => (
                        <MenuItem key={i} value={item.isoCode}>
                          {item.name}
                        </MenuItem>
                      ))
                    : userProfile.country === "NZ"
                    ? statesOfNewZealand.map((item, i) => (
                        <MenuItem key={i} value={item.isoCode}>
                          {item.name}
                        </MenuItem>
                      ))
                    : userProfile.country === "SG"
                    ? statesOfSinapore.map((item, i) => (
                        <MenuItem key={i} value={item.isoCode}>
                          {item.name}
                        </MenuItem>
                      ))
                    : null
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Selects
                multiple={true}
                helperText="City"
                id="city"
                labelId="city"
                value={
                  currentCity === 1
                    ? userProfile.cityOne
                    : currentCity === 2
                    ? userProfile.cityTwo
                    : currentCity === 3
                    ? userProfile.cityThree
                    : currentCity === 4
                    ? userProfile.cityFour
                    : currentCity === 5
                    ? userProfile.cityFive
                    : ""
                }
                label="City"
                name="city"
                onChange={handleCity}
                select={getCitiesOfState(
                  userProfile.country,
                  currentCity === 1
                    ? userProfile.stateOne
                    : currentCity === 2
                    ? userProfile.stateTwo
                    : currentCity === 3
                    ? userProfile.stateThree
                    : currentCity === 4
                    ? userProfile.stateFour
                    : currentCity === 5
                    ? userProfile.stateFive
                    : ""
                )}
              />
            </Grid>
            <Grid align="center" item xs={12}>
              <Btn function={onSave} name={"Save All Cities"} />
            </Grid>
          </>
        ) : null}
        <Tours />
      </Grid>
    </>
  );
};

export default Locations;
