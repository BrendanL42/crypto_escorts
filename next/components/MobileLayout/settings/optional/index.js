import React from "react";
import Btn from "../../btn/Save";
import bl from "./bl";
import {
  MenuItem,
  Grid,
  Select,
  Chip,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const inputLabelSelect = {
  color: "#FFF !important",
  borderRadius: "15px !important",
};

const formControl = {
  backgroundColor: "RGB(255, 255, 255, 0.4)",
  color: "#FFF !important",
  borderRadius: "15px",
  margin: "0.8em auto !important",
  width: "100% !important",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const label = {
  fontSize: "1.2em",
  fontWeight: "200",
  margin: "1em 0 1.5em 0",
  textAlign: "center",
};

const Optional = () => {
  const { getWishes, handleSelect, wishList, handleSave } = bl();

  return (
    <Grid container spacing={1} sx={{ padding: "1em 1em 6em 1em" }}>
      <Grid item xs={12} sx={{ marginBottom: "1em" }}>
        <h6 style={label}>
          This lets clients know what sort of gifts you may like
        </h6>
        <FormControl sx={formControl}>
          {wishList ? (
            <InputLabel sx={inputLabelSelect} id="wishList">
              Wish List
            </InputLabel>
          ) : null}

          <Select
            sx={inputLabelSelect}
            labelId="wishList"
            multiple
            name="wishList"
            value={wishList}
            onChange={handleSelect}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value, index) => (
                  <Chip
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.774)",
                    }}
                    key={index}
                    label={value}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {getWishes().map((item, index) => (
              <MenuItem value={item.value} key={index}>
                {item.menu}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Btn icon={<SaveIcon />} name="Save" function={() => handleSave()} />
    </Grid>
  );
};

export default Optional;
