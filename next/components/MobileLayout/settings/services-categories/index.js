import React from "react";
import { makeStyles } from "@mui/styles";
import bl from "./bl";
import Btn from "../../btn/Save";
import TextInput from "../../inputs/Input";
import {
  Chip,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Box,
  Grid,
} from "@mui/material";

const useStyles = makeStyles(() => ({
  formControl: {
    backgroundColor: "RGB(255, 255, 255, 0.4)",
    color: "#FFF !important",
    width: "100% !important",
    borderRadius: "10px",
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },

  chip: {
    color: "#2f3542",
    backgroundColor: "#ced6e0",
    letterSpacing: "1px",
    borderRadius: "10px",
    border: "0.5px solid white",
    cursor: "pointer",
  },

  label: {
    color: "#FFF",
  },
}));

const title = {
  fontSize: "1.4em",
  textAlign: "center",
  margin: "0.5em auto 0em auto",
  letterSpacing: "2px",
  fontWeight: "300",
};

const info = {
  fontSize: "1em",
  textAlign: "center",
  letterSpacing: "1px",
  fontWeight: "200",
  lineHeight: "1.7",
  textTransform: "capitalize",
  marginBottom: "-0.3em",
};

const ServicesCategories = () => {
  const classes = useStyles();
  const {
    handleChange,
    handleChangeService,
    categoriesRef,
    serviceRef,
    categorie,
    services,
    onSave,
    servicesInfo,
    handleTextField,
  } = bl();

  const ITEM_HEIGHT = 100;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{ padding: "1em 1em 6em 1em", height: "auto" }}
      >
        <Grid item xs={12}>
          <h6 style={title}>Categories</h6>
          <p style={info}>
            Select which categories you would like to appear in
          </p>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <Select
              className={classes.inputLabelSelect}
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={categoriesRef.current}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.7 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categorie.map((categories) => (
                <MenuItem key={categories} value={categories}>
                  {categories}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Btn function={() => onSave("categories")} name={"Save"} />
        </Grid>

        <Grid item xs={12}>
          <h6 style={title}>Services</h6>
          <p style={info}>Select which services you are willing to provide</p>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <Select
              className={classes.inputLabelSelect}
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={serviceRef.current}
              onChange={handleChangeService}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.7 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {services.map((service) => (
                <MenuItem key={service} value={service}>
                  {service}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextInput
            multiline={true}
            rows={6}
            onChange={handleTextField}
            name="servicesInfo"
            value={servicesInfo ? servicesInfo : ""}
            label={!servicesInfo && "Enter any further services information"}
            helperText={servicesInfo && "Enter any further services information"}
            type="text"
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Btn function={() => onSave("services")} name={"Save"} />
        </Grid>
      </Grid>
    </>
  );
};

export default ServicesCategories;
