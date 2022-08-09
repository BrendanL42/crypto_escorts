import { useState, useContext } from "react";
import bl from "./bl";
import axios from "axios";
import AppContext from "../../../../lib/AppContext";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import styles from "./tours.module.css";
import Selects from "../../inputs/Selects";
import TextInput from "../../inputs/Input";
import locations from "../aboutMe/locations";
import {
  DialogContent,
  DialogActions,
  Dialog,
  MenuItem,
  Button,
  DialogTitle,
  TextField,
  Grid,
  Tooltip,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

const useStyles = makeStyles(() => ({
  text: {
    margin: "1em 0 1em 0 ",
    borderRadius: "10px 10px 0 0  !important",
    margin: "0.8em auto !important",
    color: "#FFF !important",
    "& :-webkit-autofill": {
      transitionDelay: "999999999s",
    },
    "& input": {
      color: "RGB(255, 255, 255, 1) !important",
    },
    backgroundColor: "RGB(255, 255, 255, 0.4)",
  },
  inputLabel: {
    margin: "0 0 1em 0 ",
    fontWeight: "400",
    letterSpacing: "1px",
    fontSize: "0.8em",
    color: "RGB(255, 255, 255, 1)",
    height: "10px !important",
  },
  length: {
    fontSize: "1em",
    color: "rgb(237, 108, 2)",
    margin: "0",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
}));

const dialog = {
  backgroundColor: "black",
  border: "1px solid white",
  borderRadius: "20px",
  padding: "0.5em",
  margin: "0.5em",
};

const title = {
  color: "rgb(237, 108, 2)",
  textAlign: "center",
  fontWeight: "500",
  letterSpacing: "1px",
};

const deleteTour = {
  color: "darkRed",
  position: "absolute",
  top: "5px",
  right: "0px",
  cursor: "pointer",
};

const Tours = () => {
  const classes = useStyles();
  const { userProfile, fetchUser } = bl();
  const { throwMessage } = useContext(AppContext);
  const {
    getCountries,
    getCitiesOfState,
    statesOfAustralia,
    statesOfNewZealand,
    statesOfUK,
    statesOfSinapore,
  } = locations();
  const [open, setOpen] = useState(false);
  const [once, setOnce] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [to, setTo] = useState(new Date());
  const [from, setFrom] = useState(new Date());
  const [offers, setOffers] = useState("");

  const handleChangeDateTo = (newValue) => {
    setTo(newValue);
  };

  const handleChangeDateFrom = (newValue) => {
    setFrom(newValue);
  };

  const handleOffers = (event) => {
    setOffers(event.target.value);
  };

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleState = (event) => {
    setState(event.target.value);
  };
  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setState("");
    setCity("");
    setCountry("");
    setTo(new Date());
    setFrom(new Date());
    setOffers("");
  };

  const handleNewTour = () => {
    if (!once) {
      setOnce(true);
      const bookingId = (Math.random() + 1).toString(36).substring(2);
      const tour = {
        state: state,
        city: city,
        country: country,
        to: to,
        from: from,
        offers: offers,
        tourId: bookingId,
      };
      axios
        .put(
          `${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/model/update/tours`,
          tour
        )
        .then((res) => {
          fetchUser();
          throwMessage("success", "Updated");
          handleClose();
          setOnce(false);
        })
        .catch((error) => {
          throwMessage("error", "Something went wrong");
          setOnce(false);
        });
    }
  };

  const handleDeleteTour = (id) => {
    if (!once) {
      setOnce(true);
      axios
        .put(
          `${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/model/update/tours`,
          { id: id }
        )
        .then((res) => {
          fetchUser();
          throwMessage("success", "Updated");
          setOnce(false);
        })
        .catch((error) => {
          throwMessage("error", "Something went wrong");
          setOnce(false);
        });
    }
  };

  const tourLength = () => {
    let a = moment(to);
    let b = moment(from);
    let total = a.diff(b, "days");
    return total + 1
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: dialog,
        }}
      >
        <DialogTitle sx={title}>New Tour</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} align="center" sx={{ margin: "0 auto" }}>
              <Selects
                id="country"
                helperText={"Country you are touring"}
                labelId="country"
                value={country ? country : ""}
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

            <Grid item xs={6} align="center">
              <Selects
                id="states"
                helperText={"State you are touring"}
                labelId="states"
                value={state ? state : ""}
                label="State"
                name="states"
                onChange={handleState}
                select={
                  country === "AU"
                    ? statesOfAustralia.map((item, i) => (
                        <MenuItem key={i} value={item.isoCode}>
                          {item.name}
                        </MenuItem>
                      ))
                    : country === "GB"
                    ? statesOfUK.map((item, i) => (
                        <MenuItem key={i} value={item.isoCode}>
                          {item.name}
                        </MenuItem>
                      ))
                    : country === "NZ"
                    ? statesOfNewZealand.map((item, i) => (
                        <MenuItem key={i} value={item.isoCode}>
                          {item.name}
                        </MenuItem>
                      ))
                    : country === "SG"
                    ? statesOfSinapore.map((item, i) => (
                        <MenuItem key={i} value={item.isoCode}>
                          {item.name}
                        </MenuItem>
                      ))
                    : null
                }
              />
            </Grid>

            <Grid item xs={6} align="center">
              <Selects
                multiple={true}
                helperText="City you are touring"
                id="city"
                labelId="city"
                value={city ? city : ""}
                label="City"
                name="city"
                onChange={handleCity}
                select={getCitiesOfState(userProfile.country, state)}
              />
            </Grid>
            <Grid item xs={12} align="center" sx={{ marginTop: "1em" }}>
              <p className={classes.length}>Tour length {tourLength()} days</p>
            </Grid>

            <Grid item xs={6} align="center">
              <MobileDatePicker
                value={from}
                onChange={handleChangeDateFrom}
                renderInput={(params) => (
                  <>
                    <TextField
                      name="from"
                      fullWidth
                      {...params}
                      className={classes.text}
                    />
                    <label htmlFor="start" className={classes.inputLabel}>
                      Tour start
                    </label>
                  </>
                )}
              />
            </Grid>

            <Grid item xs={6} align="center">
              <MobileDatePicker
                value={to}
                onChange={handleChangeDateTo}
                renderInput={(params) => (
                  <>
                    <TextField
                      name="from"
                      fullWidth
                      {...params}
                      className={classes.text}
                    />
                    <label htmlFor="start" className={classes.inputLabel}>
                      Tour end
                    </label>
                  </>
                )}
              />
            </Grid>

            <Grid item xs={12} align="center">
              <TextInput
                multiline={true}
                onChange={handleOffers}
                name="offers"
                value={offers ? offers : ""}
                label={!offers && "Offers"}
                type="text"
                helperText={"Offers"}
                rows={6}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleNewTour}>Create New Tour</Button>
        </DialogActions>
      </Dialog>

      {/* <h5 className={styles.title}>Active Tours</h5> */}
      <div className={styles.grid}>
        {userProfile.tours?.map((item) => (
          <div className={styles.tiles}>
            <p>
              {item.state}, {item.city}
            </p>
            <p>
              {moment(item.from).format("MMM Do Y")} -{" "}
              {moment(item.to).format("MMM Do Y")}
            </p>
            <Tooltip title={item.offers ? item.offers : ""} placement="bottom">
              {item.offers ? (
                <p style={{ cursor: "pointer" }}>Special Offers</p>
              ) : (
                <p>No Offers</p>
              )}
            </Tooltip>

            <DeleteForeverOutlinedIcon
              onClick={() => handleDeleteTour(item.tourId)}
              sx={deleteTour}
            />
          </div>
        ))}

        <div className={styles.tiles}>
          <h6 className={styles.add}>Add New Tour</h6>
          <AddCircleOutlineOutlinedIcon
            onClick={handleClickOpen}
            fontSize="large"
            sx={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </>
  );
};

export default Tours;
