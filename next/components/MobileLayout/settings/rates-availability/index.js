import { useState } from "react";
import Rates from "./Rates";
import Availability from "./Availability";
import styles from "./ratesAvailability.module.css";
import { Grid, ButtonGroup, Button } from "@mui/material";

const RatesAvailability = () => {
  const [panel, setPanel] = useState(0);

  const switchPanel = () => {
    !panel ? setPanel(1) : setPanel(0);
  };

  return (
    <Grid container spacing={1} sx={{ padding: "1em 1em 6em 1em" }}>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Button
          style={{ color: panel === 0 ? "orange" : "white" }}
          onClick={switchPanel}
        >
          Rates
        </Button>
        <Button
          style={{ color: panel === 1 ? "orange" : "white" }}
          onClick={switchPanel}
        >
          Availability
        </Button>
      </Grid>
      {!panel ? <Rates /> : <Availability />}
    </Grid>
  );
};

export default RatesAvailability;
