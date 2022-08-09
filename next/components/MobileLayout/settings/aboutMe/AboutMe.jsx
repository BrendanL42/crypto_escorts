import React from "react";
import { makeStyles } from "@mui/styles";
import styles from "../../../../styles/AboutMe.module.css";
import blAboutMe from "./blAboutMe";

import Image from "next/image";

import TextInput from "../../inputs/Input";
import Btn from "../../btn/Save";
import Selects from "../../inputs/Selects";

import nationality from ".././nationality";
import SaveIcon from "@mui/icons-material/Save";

import { MenuItem } from "@mui/material";

const useStyles = makeStyles((props) => ({
  inputLabel: {
    margin: "0 0 1em 0 ",
    padding: "0 0 0 0.5em",
    fontWeight: "400",
    letterSpacing: "1px",
    fontSize: "0.8em",
    color: "RGB(255, 255, 255, 1)",
    height: "1px !important",
  },
}));

const AboutMe = () => {
  const classes = useStyles();
  const {
    handleSave,
    handleChange,
    handleGender,
    getbodyType,
    getEyes,
    getHair,
    getBusts,
    getHeights,
    getAges,
    userProfile,
    gender,
  } = blAboutMe();

  return (
    <form noValidate className={styles.wrapper}>
      <TextInput
        onChange={handleChange}
        name="fName"
        value={userProfile.fName ? userProfile.fName : ""}
        label={!userProfile.fName && "Name"}
        type="text"
        helperText={!userProfile.fName ? "" : "Name"}
      />

      <TextInput
        onChange={handleChange}
        name="lName"
        value={userProfile.lName ? userProfile.lName : ""}
        label={!userProfile.lName && "Surname"}
        type="text"
        helperText={!userProfile.lName ? "" : "Surname"}
      />
      <Selects
        defaultValue=""
        id="nationality"
        helperText={"Nationality"}
        labelId="nationality"
        value={!userProfile.nationality ? "" : userProfile.nationality}
        label="Nationality"
        name="nationality"
        onChange={handleChange}
        select={nationality.map((item, i) => (
          <MenuItem key={i} value={item.Nationality}>
            {item.Nationality}
          </MenuItem>
        ))}
      />
      <div className={styles.atributes}>
        <Selects
          defaultValue=""
          id="age"
          helperText={"Age"}
          labelId="age"
          value={!userProfile.age ? "" : userProfile.age}
          label="Age"
          name="age"
          onChange={handleChange}
          select={getAges()}
        />

        <Selects
          defaultValue=""
          id="height"
          helperText={"Height"}
          labelId="height"
          value={!userProfile.height ? "" : userProfile.height}
          label="Height"
          name="height"
          onChange={handleChange}
          select={getHeights()}
        />

        <Selects
          defaultValue=""
          id="cup"
          helperText={"Cup Size"}
          labelId="cup"
          value={!userProfile.cup ? "" : userProfile.cup}
          label="Bust Size"
          name="cup"
          onChange={handleChange}
          select={getBusts().map((item, index) => (
            <MenuItem value={item.value} key={index}>
              {item.menu}
            </MenuItem>
          ))}
        />

        <Selects
          defaultValue=""
          id="hair"
          helperText="Hair Colour"
          labelId="hair"
          value={!userProfile.hair ? "" : userProfile.hair}
          label="Hair Colour"
          name="hair"
          onChange={handleChange}
          select={getHair().map((item, index) => (
            <MenuItem value={item.value} key={index}>
              {item.menu}
            </MenuItem>
          ))}
        />

        <Selects
          defaultValue=""
          id="eyes"
          helperText="Eye Colour"
          labelId="eyes"
          value={!userProfile.eyes ? "" : userProfile.eyes}
          label="Eye Colour"
          name="eyes"
          onChange={handleChange}
          select={getEyes().map((item, index) => (
            <MenuItem value={item.value} key={index}>
              {item.menu}
            </MenuItem>
          ))}
        />
        <Selects
          defaultValue=""
          id="bodyType"
          helperText={"Body Type"}
          labelId="bodyType"
          value={!userProfile.bodyType ? "" : userProfile.bodyType}
          label="Body Type"
          name="bodyType"
          onChange={handleChange}
          select={getbodyType().map((item, i) => (
            <MenuItem key={i} value={item.value}>
              {item.menu}
            </MenuItem>
          ))}
        />
      </div>

      <div
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          margin: "1.5em auto 1.3em auto",
          height: "35px",
        }}
      >
        <Image
          onClick={() => handleGender("female")}
          width={
            userProfile.gender === "female"
              ? 50
              : gender === "male"
              ? 30
              : gender === "female"
              ? 30
              : 30
          }
          height={
            userProfile.gender === "female"
              ? 50
              : gender === "male"
              ? 30
              : gender === "female"
              ? 30
              : 30
          }
          layout="fixed"
          src={"/female.svg"}
          alt="female"
        />

        <Image
          onClick={() => handleGender("male")}
          width={
            userProfile.gender === "male"
              ? 50
              : gender === "male"
              ? 30
              : gender === "female"
              ? 30
              : 30
          }
          height={
            userProfile.gender === "male"
              ? 50
              : gender === "male"
              ? 30
              : gender === "female"
              ? 30
              : 30
          }
          layout="fixed"
          src={"/male.svg"}
          alt="male"
        />

        <Image
          onClick={() => handleGender("trans")}
          width={
            userProfile.gender === "trans"
              ? 50
              : gender === "male"
              ? 30
              : gender === "female"
              ? 30
              : 30
          }
          height={
            userProfile.gender === "trans"
              ? 50
              : gender === "male"
              ? 30
              : gender === "female"
              ? 30
              : 30
          }
          layout="fixed"
          src={"/trans.svg"}
          alt="trans"
        />
      </div>

      <span style={{margin: "1em 0 1.5em 0"}} className={classes.inputLabel}>Gender</span>

      <TextInput
        multiline={true}
        onChange={handleChange}
        name="title"
        value={userProfile.title ? userProfile.title : ""}
        label={!userProfile.title && "Profile Title"}
        type="text"
        helperText={!userProfile.title ? "" : "Profile Title"}
        rows={2}
      />
      <TextInput
        multiline={true}
        onChange={handleChange}
        name="bio"
        value={userProfile.bio ? userProfile.bio : ""}
        label={!userProfile.bio && "Profile Bio"}
        type="text"
        helperText={!userProfile.bio ? "" : " Profile Bio"}
        rows={7}
      />

      <Btn icon={<SaveIcon />} name="Save" function={handleSave} />
    </form>
  );
};

export default AboutMe;
