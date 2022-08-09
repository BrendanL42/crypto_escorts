import styles from "./ratesAvailability.module.css";

import bl from "./blAval";
import {
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TextInput from "../../inputs/Input";
import Btn from "../../btn/Save";
import SaveIcon from "@mui/icons-material/Save";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const time = {
  color: "#FFF !important",
  "& :-webkit-autofill": {
    transitionDelay: "999999999s",
  },
  "& input": {
    color: "RGB(255, 255, 255, 1) !important",
    cursor: "pointer !important",
    border: "none",
    textAlign: "center",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
};

const checkboxes = {
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: "column",
  flexWrap: "wrap",
  padding: "1em",
};

const checkBox = {
  color: "white",
  "&.Mui-checked": {
    color: "red ",
  },
};

const avalLight = {
  color: "green",
};

const Availability = () => {
  const {
    mondayFrom,
    mondayTo,
    tuesdayFrom,
    tuesdayTo,
    wednesdayFrom,
    wednesdayTo,
    thursdayFrom,
    thursdayTo,
    fridayFrom,
    fridayTo,
    saturdayFrom,
    saturdayTo,
    sundayFrom,
    sundayTo,
    datePicker,
    handleNotes,
    notes,
    handleSave,
    handleCheckBox,
    shortNotice,
    appointment,
    contactMe,
    flexible,
    twentyFour,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    changeAval,
    applyAll,
  } = bl();

  return (
    <>
      <Grid item xs={12} align="center">
        <Button sx={{color: "white", borderBottom: "1px solid white", borderRadius: "0"}} endIcon={<ContentCopyIcon sx={{color: "grey"}}/>} onClick={applyAll} >Apply All</Button>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: "1.5em" }}>
        <table className={styles.tableRates}>
          <tr>
            <th>Aval</th>
            <th>Day</th>
            <th>From</th>
            <th>To</th>
          </tr>
          <tr>
            <td>
              {monday ? (
                <RadioButtonCheckedIcon
                  onClick={() => changeAval("monday")}
                  sx={avalLight}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  onClick={() => changeAval("monday")}
                />
              )}
            </td>
            <td>Mon</td>
            <td>
              {monday ? (
                <MobileTimePicker
                  value={mondayFrom}
                  onChange={(value) => datePicker(value, "mondayFrom")}
                  renderInput={(params) => (
                    <>
                      <TextField name="mondayFrom" sx={time} {...params} />
                    </>
                  )}
                />
              ) : (
                <p style={{ textAlign: "center", width: "100%" }}>
                  Not Available
                </p>
              )}
            </td>
            <td>
              {monday ? (
                <MobileTimePicker
                  value={mondayTo}
                  onChange={(value) => datePicker(value, "mondayTo")}
                  renderInput={(params) => (
                    <>
                      <TextField name="mondayTo" sx={time} {...params} />
                    </>
                  )}
                />
              ) : (
                <p style={{ textAlign: "center", width: "100%" }}>
                  Not Available
                </p>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {tuesday ? (
                <RadioButtonCheckedIcon
                  onClick={() => changeAval("tuesday")}
                  sx={avalLight}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  onClick={() => changeAval("tuesday")}
                />
              )}
            </td>
            <td>Tue</td>
            <td>
              {tuesday ? (
                <MobileTimePicker
                  value={tuesdayFrom}
                  onChange={(value) => datePicker(value, "tuesdayFrom")}
                  renderInput={(params) => (
                    <>
                      <TextField name="start" sx={time} {...params} />
                    </>
                  )}
                />
              ) : (
                <p style={{ textAlign: "center" }}>Not Available</p>
              )}
            </td>
            <td>
              {tuesday ? (
                <MobileTimePicker
                  value={tuesdayTo}
                  onChange={(value) => datePicker(value, "tuesdayTo")}
                  renderInput={(params) => (
                    <>
                      <TextField name="start" sx={time} {...params} />
                    </>
                  )}
                />
              ) : (
                <p style={{ textAlign: "center" }}>Not Available</p>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {wednesday ? (
                <RadioButtonCheckedIcon
                  onClick={() => changeAval("wednesday")}
                  sx={avalLight}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  onClick={() => changeAval("wednesday")}
                />
              )}
            </td>
            <td>Wed</td>
            <td>
              {wednesday ? (
                <MobileTimePicker
                  value={wednesdayFrom}
                  onChange={(value) => datePicker(value, "wednesdayFrom")}
                  renderInput={(params) => (
                    <>
                      <TextField name="start" sx={time} {...params} />
                    </>
                  )}
                />
              ) : (
                <p style={{ textAlign: "center" }}>Not Available</p>
              )}
            </td>
            <td>
              {wednesday ? (
                <MobileTimePicker
                  value={wednesdayTo}
                  onChange={(value) => datePicker(value, "wednesdayTo")}
                  renderInput={(params) => (
                    <>
                      <TextField name="start" sx={time} {...params} />
                    </>
                  )}
                />
              ) : (
                <p style={{ textAlign: "center" }}>Not Available</p>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {thursday ? (
                <RadioButtonCheckedIcon
                  onClick={() => changeAval("thursday")}
                  sx={avalLight}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  onClick={() => changeAval("thursday")}
                />
              )}
            </td>
            <td>Thu</td>
            <td>
              {thursday ? (
                <MobileTimePicker
                  value={thursdayFrom}
                  onChange={(value) => datePicker(value, "thursdayFrom")}
                  renderInput={(params) => (
                    <>
                      <TextField name="start" sx={time} {...params} />
                    </>
                  )}
                />
              ) : (
                <p style={{ textAlign: "center" }}>Not Available</p>
              )}
            </td>
            <td>
              {thursday ? (
                <MobileTimePicker
                  value={thursdayTo}
                  onChange={(value) => datePicker(value, "thursdayTo")}
                  renderInput={(params) => (
                    <>
                      <TextField name="start" sx={time} {...params} />
                    </>
                  )}
                />
              ) : (
                <p style={{ textAlign: "center" }}>Not Available</p>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {friday ? (
                <RadioButtonCheckedIcon
                  onClick={() => changeAval("friday")}
                  sx={avalLight}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  onClick={() => changeAval("friday")}
                />
              )}
            </td>
            <td>Fri</td>
            <td>
              {friday ? (
                <MobileTimePicker
                  value={fridayFrom}
                  onChange={(value) => datePicker(value, "fridayFrom")}
                  renderInput={(params) => (
                    <>
                      <TextField name="start" sx={time} {...params} />
                    </>
                  )}
                />
              ) : (
                <p style={{ textAlign: "center" }}>Not Available</p>
              )}
            </td>
            <td>
              {friday ? (
                <MobileTimePicker
                  value={fridayTo}
                  onChange={(value) => datePicker(value, "fridayTo")}
                  renderInput={(params) => (
                    <>
                      <TextField name="start" sx={time} {...params} />
                    </>
                  )}
                />
              ) : (
                <p style={{ textAlign: "center" }}>Not Available</p>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {saturday ? (
                <RadioButtonCheckedIcon
                  onClick={() => changeAval("saturday")}
                  sx={avalLight}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  onClick={() => changeAval("saturday")}
                />
              )}
            </td>
            <td>Sat</td>
            <td>
              {saturday ? (
                <MobileTimePicker
                  value={saturdayFrom}
                  onChange={(value) => datePicker(value, "saturdayFrom")}
                  renderInput={(params) => (
                    <>
                      <TextField name="start" sx={time} {...params} />
                    </>
                  )}
                />
              ) : (
                <p style={{ textAlign: "center" }}>Not Available</p>
              )}
            </td>
            <td>
              {saturday ? (
                <MobileTimePicker
                  value={saturdayTo}
                  onChange={(value) => datePicker(value, "saturdayTo")}
                  renderInput={(params) => (
                    <>
                      <TextField name="start" sx={time} {...params} />
                    </>
                  )}
                />
              ) : (
                <p style={{ textAlign: "center" }}>Not Available</p>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {sunday ? (
                <RadioButtonCheckedIcon
                  onClick={() => changeAval("sunday")}
                  sx={avalLight}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  onClick={() => changeAval("sunday")}
                />
              )}
            </td>
            <td>Sun</td>
            <td>
              {sunday ? (
                <MobileTimePicker
                  value={sundayFrom}
                  onChange={(value) => datePicker(value, "sundayFrom")}
                  renderInput={(params) => (
                    <>
                      <TextField name="start" sx={time} {...params} />
                    </>
                  )}
                />
              ) : (
                <p style={{ textAlign: "center" }}>Not Available</p>
              )}
            </td>
            <td>
              {sunday ? (
                <MobileTimePicker
                  value={sundayTo}
                  onChange={(value) => datePicker(value, "sundayTo")}
                  renderInput={(params) => (
                    <>
                      <TextField name="start" sx={time} {...params} />
                    </>
                  )}
                />
              ) : (
                <p style={{ textAlign: "center" }}>Not Available</p>
              )}
            </td>
          </tr>
        </table>
      </Grid>
      <Grid item xs={12}>
        <TextInput
          rows={4}
          multiline={true}
          onChange={handleNotes}
          value={notes ? notes : ""}
          type="text"
          helperText={"Enter any further information that is not listed above."}
        />
      </Grid>
      <hr style={{ width: "90%", margin: "2em auto 1em auto" }} />
      <Grid item xs={12} sx={checkboxes}>
        <FormControlLabel
          control={
            <Checkbox
              sx={checkBox}
              onChange={(e) => {
                handleCheckBox(e, "twentyFour");
              }}
              name="twentyFour"
              value={twentyFour}
              checked={twentyFour}
            />
          }
          label="24 Hours Notice Required"
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={checkBox}
              onChange={(e) => {
                handleCheckBox(e, "appointment");
              }}
              name="appointment"
              value={appointment}
              checked={appointment}
            />
          }
          label="Available By Appointment"
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={checkBox}
              onChange={(e) => {
                handleCheckBox(e, "contactMe");
              }}
              name="contactMe"
              value={contactMe}
              checked={contactMe}
            />
          }
          label="Please Contact Me For My Availability"
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={checkBox}
              onChange={(e) => {
                handleCheckBox(e, "flexible");
              }}
              name="flexible"
              value={flexible}
              checked={flexible}
            />
          }
          label="Flexible Hours By Appointment"
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={checkBox}
              onChange={(e) => {
                handleCheckBox(e, "shortNotice");
              }}
              name="shortNotice"
              checked={shortNotice}
            />
          }
          label="Pre Bookings Preferred, But Can Be Available At Short Notice"
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Btn icon={<SaveIcon />} name="Save" function={handleSave} />
      </Grid>
    </>
  );
};

export default Availability;
