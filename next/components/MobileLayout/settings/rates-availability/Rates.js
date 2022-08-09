import styles from "./ratesAvailability.module.css";
import Selects from "../../inputs/Selects";
import TextInput from "../../inputs/Input";
import Btn from "../../btn/Save";
import bl from "./blRates";
import locations from "../aboutMe/locations";
import {
  MenuItem,
  Grid,
  InputAdornment,
  TextField,
  Chip,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

const info = {
  fontSize: "1.3em",
  textAlign: "center",
  letterSpacing: "1px",
  fontWeight: "200",
  lineHeight: "1.7",
  textTransform: "capitalize",
};

const info2 = {
  fontSize: "0.9em",
  textAlign: "center",
  letterSpacing: "1px",
  fontWeight: "200",
  marginTop: "-1.9em",
};

const text = {
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none !important",
  },
  margin: "1em 0 1em 0 ",
  borderRadius: "10px !important",
  margin: "0.8em auto !important",
  color: "#FFF !important",
  "& :-webkit-autofill": {
    transitionDelay: "999999999s",
  },
  backgroundColor: "RGB(255, 255, 255, 0.4)",

  label: {
    color: "RGB(255, 255, 255, 0.5) !important",
  },
  input: { color: "#FFF", fontSize: "16.5px" },
};

const label = {
  margin: "0 0 1em 0 ",
  padding: "0 0 0 0.5em",
  fontWeight: "400",
  letterSpacing: "1px",
  fontSize: "0.8em",
  color: "RGB(255, 255, 255, 1)",
  height: "10px !important",
};

const chips = {
  display: "flex",
  justifyContent: "space-evenly",
};

const warningText = {
  color: "red",
  fontWeight: "300",
  letterSpacing: "1px",
  fontSize: "1.2em",
  textAlign: "center",
  lineHeight: "1.6em",
};
const checkBox = {
  color: "white",
  "&.Mui-checked": {
    color: "red ",
  },
};

const toursWrapper = {
  margin: "0 auto 2em auto",
  display: "flex",
  justifyContent: "space-evenly",
};

const Rates = () => {
  const {
    handleDuration,
    handlePrice,
    duration,
    getTimes,
    price,
    extra,
    extraNotes,
    handleExtra,
    handleExtraNotes,
    addRate,
    rates,
    deleteRow,
    handleDelete,
    handleDeleteSelect,
    generatePreFill,
    warning,
    selected,
    save,
    handleCheckBox,
    touringRate,
    flyMeRate,
    permanentRate,
    state,
    city,
    handleLocation,
    handleCity,
    handleCountry,
    country,
    tours,
    handleTour,
    selectedCities,
    flyMeRates,
    touringRates,
    deleteRowTouring,
    deleteRowFly,
  } = bl();

  const {
    getCountries,
    getCitiesOfState,
    statesOfAustralia,
    statesOfNewZealand,
    statesOfUK,
    statesOfSinapore,
  } = locations();

  return (
    <>
      <Grid item xs={12} align="center">
        {touringRates.length || flyMeRates.length || rates.length > 0 ? (
          <>
            <h3 style={info}>Permanent City Rates</h3>
            <table className={styles.tableRates}>
              <tr>
                <th>Time</th>
                <th>Rate</th>
                <th>Info</th>
              </tr>
              {rates
                .sort((a, b) => a.duration - b.duration)
                .map((rate, index) => (
                  <>
                    <tr>
                      <td onClick={() => handleDeleteSelect(index, "rates")}>
                        {rate.duration}
                      </td>
                      <td onClick={() => handleDeleteSelect(index, "rates")}>
                        {rate.price}
                      </td>
                      <td onClick={() => handleDeleteSelect(index, "rates")}>
                        {rate.extra}
                      </td>

                      {deleteRow === index ? (
                        <td>
                          <ClearIcon
                            sx={{ color: "red" }}
                            onClick={() => handleDelete(rate.id, "rates")}
                          />
                        </td>
                      ) : null}
                    </tr>
                  </>
                ))}
            </table>

            <h3 style={info}>Fly Me To You Rates</h3>

            <table className={styles.tableRates}>
              <tr>
                <th>Rate</th>
                <th>City</th>
                <th>Info</th>
              </tr>
              {flyMeRates
                .sort((a, b) => a.price - b.price)
                .map((rate, index) => (
                  <>
                    <tr>
                      <td
                        onClick={() => handleDeleteSelect(index, "flyMeRates")}
                      >
                        {rate.price}
                      </td>

                      <td
                        onClick={() => handleDeleteSelect(index, "flyMeRates")}
                      >
                        {rate.city}
                      </td>
                      <td
                        onClick={() => handleDeleteSelect(index, "flyMeRates")}
                      >
                        {rate.extra}
                      </td>
                      {deleteRowFly === index ? (
                        <td>
                          <ClearIcon
                            sx={{ color: "red" }}
                            onClick={() => handleDelete(rate.id, "flyMeRates")}
                          />
                        </td>
                      ) : null}
                    </tr>
                  </>
                ))}
            </table>

            {tours.length > 0 ? (
              <>
                <h3 style={info}>Touring Rates</h3>
                <table className={styles.tableRates}>
                  <tr>
                    <th>Time</th>
                    <th>Rate</th>
                    <th>Info</th>
                    <th>Cities</th>
                  </tr>
                  {touringRates
                    .sort((a, b) => a.price - b.price)
                    .map((rate, index) => (
                      <>
                        <tr>
                          <td
                            onClick={() =>
                              handleDeleteSelect(index, "touringRates")
                            }
                          >
                            {rate.duration}
                          </td>

                          <td
                            onClick={() =>
                              handleDeleteSelect(index, "touringRates")
                            }
                          >
                            {rate.price}
                          </td>
                          <td
                            onClick={() =>
                              handleDeleteSelect(index, "touringRates")
                            }
                          >
                            {rate.extra}
                          </td>
                          <td
                            onClick={() =>
                              handleDeleteSelect(index, "touringRates")
                            }
                          >
                            {rate.cities.map(
                              (a, index) => (index ? ", " : "") + a.city
                            )}
                          </td>
                          {deleteRowFly === index ? (
                            <td>
                              <ClearIcon
                                sx={{ color: "red" }}
                                onClick={() =>
                                  handleDelete(rate.id, "touringRates")
                                }
                              />
                            </td>
                          ) : null}
                        </tr>
                      </>
                    ))}
                </table>{" "}
              </>
            ) : null}
          </>
        ) : (
          <p>No Rates To Display</p>
        )}

        {touringRates.length || flyMeRates.length || rates.length ? (
          <Grid item xs={12} sx={{ marginTop: "2em" }}>
            <TextInput
              multiline={true}
              rows={4}
              onChange={handleExtraNotes}
              onBlur={save}
              name="extraNotes"
              value={extraNotes ? extraNotes : ""}
              type="text"
              helperText={
                "Enter any further information or rates that are not listed above."
              }
            />
          </Grid>
        ) : null}
      </Grid>

      {/* <Grid item xs={12} align="center">
        <p style={info}>Add New Rates</p>
      </Grid> */}

      <Grid item xs={12} align="center" sx={{ margin: "1em auto" }}>
        <FormControlLabel
          control={
            <Checkbox
              sx={checkBox}
              onChange={handleCheckBox}
              name="flyMeRate"
              value={flyMeRate}
              checked={flyMeRate}
            />
          }
          label="Fly Me To You Rate"
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={checkBox}
              onChange={handleCheckBox}
              name="touringRate"
              value={touringRate}
              checked={touringRate}
            />
          }
          label="Touring Rate"
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={checkBox}
              onChange={handleCheckBox}
              name="permanentRate"
              value={permanentRate}
              checked={permanentRate}
            />
          }
          label="Permanent Rate"
        />
      </Grid>

      {flyMeRate || touringRate || permanentRate ? (
        <>
          {!flyMeRate && (
            <Grid item xs={6}>
              <Selects
                id="duration"
                helperText={"Duration"}
                labelId="duration"
                value={duration ? duration : ""}
                label="Duration"
                name="duration"
                onChange={handleDuration}
                select={getTimes().map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    {item.menu}
                  </MenuItem>
                ))}
              />
            </Grid>
          )}

          <Grid item xs={6}>
            <TextField
              sx={text}
              value={price ? price : ""}
              variant="outlined"
              onChange={handlePrice}
              name="extra"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon sx={{ color: "white" }} />
                  </InputAdornment>
                ),
              }}
            />
            <label style={label} for="price">
              Rate
            </label>
          </Grid>

          {flyMeRate && (
            <Grid item xs={6} align="center">
              <p>Price for you to fly to the city</p>
            </Grid>
          )}

          <Grid item xs={12}>
            <TextInput
              onChange={handleExtra}
              name="extra"
              value={extra ? extra : ""}
              type="text"
              helperText={"Extra Info"}
            />
          </Grid>
        </>
      ) : null}

      {flyMeRate ? (
        <Grid item xs={12}>
          <Selects
            id="country"
            helperText="Country"
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

          <Selects
            id="states"
            helperText={"State"}
            labelId="states"
            value={state}
            label="State"
            name="states"
            onChange={handleLocation}
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
          <Selects
            multiple={true}
            helperText="City"
            id="city"
            labelId="city"
            value={city}
            label="City"
            name="city"
            onChange={handleCity}
            select={getCitiesOfState(country, state)}
          />
        </Grid>
      ) : null}

      {touringRate ? (
        <>
          <Grid item xs={12} sx={toursWrapper}>
            {tours.length ? (
              tours.map((tour) => (
                <Chip
                  onClick={() => handleTour(tour.tourId, tour.city)}
                  sx={{
                    color: selectedCities.find(
                      (item) => item.tourId === tour.tourId
                    )
                      ? "orange"
                      : "white",
                    border: selectedCities.find(
                      (item) => item.tourId === tour.tourId
                    )
                      ? "1px solid orange"
                      : "1px solid white",
                  }}
                  label={tour.city}
                  variant="outlined"
                />
              ))
            ) : (
              <p>No Tours Created</p>
            )}
          </Grid>
          <p
            style={{
              textAlign: "center",
              margin: "0 auto 2em auto",
              fontWeight: "300",
              letterSpacing: "1px",
            }}
          >
            Which Cities Would You Like This Rate To Apply To ?
          </p>
        </>
      ) : null}

      <Grid item xs={12} align="center">
        <Btn
          icon={<AddIcon />}
          function={() => addRate()}
          name={"Add New Rate"}
        />
      </Grid>

      {/* <hr style={{ width: "90%", margin: "2em auto 0 auto" }} />
      <Grid item xs={12} align="center">
        {warning ? (
          <Grid item xs={12} align="center">
            <p style={warningText}>
              Warning changing selection will DELETE any saved rates
            </p>
          </Grid>
        ) : (
          <>
            <p style={info}>Choose From Our Pre-Filled Rates</p>
            <br />
            <p style={info2}>( You can then customize from there )</p>
          </>
        )}
      </Grid>
      <Grid item xs={12} align="center" sx={chips}>
        <Chip
          onClick={() => generatePreFill("$")}
          variant="outlined"
          sx={{
            color: selected === "$" ? "orange" : "white",
            border: selected === "$" ? " 1px solid orange" : " 1px solid white",
          }}
          label="$"
        />
        <Chip
          onClick={() => generatePreFill("$$")}
          variant="outlined"
          sx={{
            color: selected === "$$" ? "orange" : "white",
            border:
              selected === "$$" ? " 1px solid orange" : " 1px solid white",
          }}
          label="$$"
        />
        <Chip
          onClick={() => generatePreFill("$$$")}
          variant="outlined"
          sx={{
            color: selected === "$$$" ? "orange" : "white",
            border:
              selected === "$$$" ? " 1px solid orange" : " 1px solid white",
          }}
          label="$$$"
        />
        <Chip
          onClick={() => generatePreFill("$$$$")}
          variant="outlined"
          sx={{
            color: selected === "$$$$" ? "orange" : "white",
            border:
              selected === "$$$$" ? " 1px solid orange" : " 1px solid white",
          }}
          label="$$$$"
        />
      </Grid> */}
    </>
  );
};

export default Rates;
