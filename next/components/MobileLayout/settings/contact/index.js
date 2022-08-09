import React from "react";
import bl from "./bl";
import Image from "next/image";
import {
  Grid,
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import TextInput from "../../inputs/Input";
import Btn from "../../btn/Save";

const Contact = () => {
  const {
    website,
    phone,
    email,
    twitter,
    insta,
    current,
    onSave,
    handleChange,
    change,
    moreInfo,
    handleInfo,
    pos,
    handleRadio,
    preferredContact,
  } = bl();

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const warning = {
    fontSize: "1.1em",
    letterSpacing: "1px",
    margin: "1em 0 0 0",
    color: "red",
    lineHeight: "1.8",
    textTransform: "capitalize",
  };

  const imageGrid = {
    cursor: "pointer",
  };

  const inputLabel = {
    margin: "1.2em 0 1em 0 ",
    fontWeight: "400",
    letterSpacing: "1px",
    fontSize: "0.8em",
    color: "RGB(255, 255, 255, 1)",
    height: "10px !important",
  };

  const radio = {
    color: "white",
    "&.Mui-checked": {
      color: "green",
    },
  };

  const radiomargin = {
    margin: "0 0 0 0",
  };

  const pcGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gridColumnGap: "0px",
    gridRowGap: "5px",
  };

  return (
    <>
      <Grid
        container
        spacing={4}
        align="center"
        sx={{ padding: "1em", marginBottom: "4em" }}
      >
        <Grid item xs={12}>
          <p style={warning}>
            All information entered below will be visible to clients
          </p>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <RadioGroup
              aria-labelledby="Place Of Service Radio Buttons"
              row
              name="pos"
              value={pos}
              onChange={handleRadio}
            >
              <FormControlLabel
                value="incall"
                control={<Radio sx={radio} />}
                label="Incall"
              />
              <FormControlLabel
                value="outcall"
                control={<Radio sx={radio} />}
                label="Outcall"
              />
              <FormControlLabel
                value="incall/outcall"
                control={<Radio sx={radio} />}
                label="Incall & Outcall"
                sx={radiomargin}
              />
            </RadioGroup>
            <label htmlFor="Place Of Service" style={inputLabel}>
              Place Of Service
            </label>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
      
          <TextInput
            onChange={handleChange}
            value={
              current === "website"
                ? website
                : current === "phone"
                ? phone
                : current === "email"
                ? email
                : current === "twitter"
                ? twitter
                : current === "instagram"
                ? insta
                : null
            }
            type={
              current === "website"
                ? "text"
                : current === "phone"
                ? "tel"
                : current === "email"
                ? "email"
                : current === "twitter"
                ? "text"
                : current === "instagram"
                ? "text"
                : null
            }
            label={
              current === "website" && !website
                ? "Enter Your Personal Website"
                : current === "phone" && !phone
                ? "Enter Your Mobile"
                : current === "email" && !email
                ? "Enter Your Working Email"
                : current === "twitter" && !twitter
                ? "Enter Your Twitter Handle"
                : current === "instagram" && !insta
                ? "Enter Your Instagram Handle"
                : null
            }
            helperText={
              current === "website"
                ? "Personal Website"
                : current === "phone"
                ? "Work Mobile"
                : current === "email"
                ? "Work Email"
                : current === "twitter"
                ? "Twitter"
                : current === "instagram"
                ? "Instagram"
                : null
            }
          />
        </Grid>
        <Grid item xs={6} sx={imageGrid}>
          <Image
            onClick={() => change("twitter")}
            loader={myLoader}
            alt="Twitter"
            src={current === "twitter" ? "/twitterC.png" : "/twitter.png"}
            height="50px"
            width="50px"
            objectFit="cover"
            quality={100}
          />
        </Grid>

        <Grid item xs={6} sx={imageGrid}>
          <Image
            onClick={() => change("instagram")}
            loader={myLoader}
            alt="Instagram"
            src={current === "instagram" ? "/instagramC.png" : "/instagram.png"}
            height="50px"
            width="50px"
            objectFit="cover"
            quality={100}
          />
        </Grid>

        <Grid item xs={4} sx={imageGrid}>
          <Image
            onClick={() => change("website")}
            loader={myLoader}
            alt="Personal Website"
            src={
              current === "website"
                ? "/world-wide-webC.png"
                : "/world-wide-web.png"
            }
            height="50px"
            width="50px"
            objectFit="cover"
            quality={100}
          />
        </Grid>
        <Grid item xs={4} sx={imageGrid}>
          <Image
            onClick={() => change("phone")}
            loader={myLoader}
            alt="Mobile Number"
            src={current === "phone" ? "/whatsappC.png" : "/whatsapp.png"}
            height="50px"
            width="50px"
            objectFit="cover"
            quality={100}
          />
        </Grid>

        <Grid item xs={4} sx={imageGrid}>
          <Image
            onClick={() => change("email")}
            loader={myLoader}
            alt="Email"
            src={current === "email" ? "/emailC.png" : "/email.png"}
            height="50px"
            width="50px"
            objectFit="cover"
            quality={100}
          />
        </Grid>

        <Grid item xs={12}>
          <TextInput
            multiline={true}
            rows={5}
            onChange={handleInfo}
            value={moreInfo}
            type="text"
            helperText={!moreInfo ? "" : "Further Contact Information Title"}
            label={moreInfo ? "" : "Further Contact Information Title"}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <RadioGroup
              aria-labelledby="Preferred Contact Radio Buttons"
              name="pc"
              value={preferredContact}
              onChange={handleRadio}
              sx={pcGrid}
            >
              <FormControlLabel
                value="sms"
                control={<Radio sx={radio} />}
                label="SMS Only"
              />
              <FormControlLabel
                value="form"
                control={<Radio sx={radio} />}
                label="Contact Form"
              />
              <FormControlLabel
                value="social"
                control={<Radio sx={radio} />}
                label="Social Media"
              />
              <FormControlLabel
                value="any"
                control={<Radio sx={radio} />}
                label="I Don't Mind"
              />
            </RadioGroup>
            <label
              htmlFor=" Preferred Method Of Contact For Clients"
              style={inputLabel}
            >
              Preferred Method Of Contact For Clients
            </label>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ margin: "2em 0 0 0" }}>
          <Btn function={onSave} name={"Save All"} />
        </Grid>
      </Grid>
    </>
  );
};

export default Contact;
