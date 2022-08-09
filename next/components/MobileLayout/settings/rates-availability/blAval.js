import { useState, useContext, useEffect } from "react";
import axios from "axios";
import AppContext from "../../../../lib/AppContext";
import moment from "moment";

const blAval = () => {
  const { throwMessage, user } = useContext(AppContext);

  // times
  const [mondayFrom, setMondayFrom] = useState(new Date());
  const [mondayTo, setMondayTo] = useState(new Date());
  const [tuesdayFrom, setTuesdayFrom] = useState(new Date());
  const [tuesdayTo, setTuesdayTo] = useState(new Date());
  const [wednesdayFrom, setWednesdayFrom] = useState(new Date());
  const [wednesdayTo, setWednesdayTo] = useState(new Date());
  const [thursdayFrom, setThursdayFrom] = useState(new Date());
  const [thursdayTo, setThursdayTo] = useState(new Date());
  const [fridayFrom, setFridayFrom] = useState(new Date());
  const [fridayTo, setFridayTo] = useState(new Date());
  const [saturdayFrom, setSaturdayFrom] = useState(new Date());
  const [saturdayTo, setSaturdayTo] = useState(new Date());
  const [sundayFrom, setSundayFrom] = useState(new Date());
  const [sundayTo, setSundayTo] = useState(new Date());

  // extra notes
  const [notes, setNotes] = useState();

  // checkboxes
  const [twentyFour, setTwentyFour] = useState(false);
  const [appointment, setAppointment] = useState(false);
  const [contactMe, setContactMe] = useState(false);
  const [flexible, setFlexible] = useState(false);
  const [shortNotice, setShortNotice] = useState(false);

  // active days
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  const handleCheckBox = (event, name) => {
    switch (name) {
      case "twentyFour":
        setTwentyFour(event.target.checked);
        break;
      case "appointment":
        setAppointment(event.target.checked);
        break;
      case "contactMe":
        setContactMe(event.target.checked);
        break;
      case "flexible":
        setFlexible(event.target.checked);
        break;
      case "shortNotice":
        setShortNotice(event.target.checked);
        break;
    }
  };

  const datePicker = (date, when) => {
    switch (when) {
      case "mondayFrom":
        setMondayFrom(date);
        break;
      case "mondayTo":
        setMondayTo(date);
        break;
      case "tuesdayFrom":
        setTuesdayFrom(date);
        break;
      case "tuesdayTo":
        setTuesdayTo(date);
        break;
      case "wednesdayFrom":
        setWednesdayFrom(date);
        break;
      case "wednesdayTo":
        setWednesdayTo(date);
        break;

      case "thursdayFrom":
        setThursdayFrom(date);
        break;
      case "thursdayTo":
        setThursdayTo(date);
        break;

      case "fridayFrom":
        setFridayFrom(date);
        break;
      case "fridayTo":
        setFridayTo(date);
        break;

      case "saturdayFrom":
        setSaturdayFrom(date);
        break;
      case "saturdayTo":
        setSaturdayTo(date);
        break;

      case "sundayFrom":
        setSundayFrom(date);
        break;
      case "sundayTo":
        setSundayTo(date);
        break;
    }
  };

  const handleNotes = (e) => {
    setNotes(e.target.value);
  };

  const changeAval = (name) => {
    switch (name) {
      case "monday":
        monday ? setMonday(false) : setMonday(true);
        break;
      case "tuesday":
        tuesday ? setTuesday(false) : setTuesday(true);
        break;
      case "wednesday":
        wednesday ? setWednesday(false) : setWednesday(true);
        break;
      case "thursday":
        thursday ? setThursday(false) : setThursday(true);
        break;
      case "friday":
        friday ? setFriday(false) : setFriday(true);
        break;
      case "saturday":
        saturday ? setSaturday(false) : setSaturday(true);
        break;
      case "sunday":
        sunday ? setSunday(false) : setSunday(true);
        break;
    }
  };

  useEffect(() => {
    if (user._id) {
      fetchUser();
    }
  }, []);

  const fetchUser = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/model/read/${user._id} `
      )
      .then((res) => {
        setTwentyFour(res.data.availability.twentyFour);
        setAppointment(res.data.availability.appointment);
        setContactMe(res.data.availability.contactMe);
        setFlexible(res.data.availability.flexible);
        setShortNotice(res.data.availability.shortNotice);
        setMondayFrom(res.data.availability.mondayFrom);
        setMondayTo(res.data.availability.mondayTo);
        setTuesdayFrom(res.data.availability.tuesdayFrom);
        setTuesdayTo(res.data.availability.tuesdayTo);
        setWednesdayFrom(res.data.availability.wednesdayFrom);
        setWednesdayTo(res.data.availability.wednesdayTo);
        setThursdayFrom(res.data.availability.thursdayFrom);
        setThursdayTo(res.data.availability.thursdayTo);
        setFridayFrom(res.data.availability.fridayFrom);
        setFridayTo(res.data.availability.fridayTo);
        setSaturdayFrom(res.data.availability.saturdayFrom);
        setSaturdayTo(res.data.availability.saturdayTo);
        setSundayFrom(res.data.availability.sundayFrom);
        setSundayTo(res.data.availability.sundayTo);
        setNotes(res.data.availability.notes);

        setMonday(
          res.data.availability.mondayFrom === "Not Available" ||
            res.data.availability.mondayFrom === undefined
            ? false
            : true
        );
        setTuesday(
          res.data.availability.tuesdayFrom === "Not Available" ||
            res.data.availability.mondayFrom === undefined
            ? false
            : true
        );
        setWednesday(
          res.data.availability.wednesdayFrom === "Not Available" ||
            res.data.availability.mondayFrom === undefined
            ? false
            : true
        );
        setThursday(
          res.data.availability.thursdayFrom === "Not Available" ||
            res.data.availability.mondayFrom === undefined
            ? false
            : true
        );
        setFriday(
          res.data.availability.fridayFrom === "Not Available" ||
            res.data.availability.mondayFrom === undefined
            ? false
            : true
        );
        setSaturday(
          res.data.availability.saturdayFrom === "Not Available" ||
            res.data.availability.mondayFrom === undefined
            ? false
            : true
        );
        setSunday(
          res.data.availability.sundayFrom === "Not Available" ||
            res.data.availability.mondayFrom === undefined
            ? false
            : true
        );
      })
      .catch((error) => {
        throwMessage("error", "Something went wrong");
      });
  };

  const handleSave = (rate) => {
    const availability = {
      mondayFrom: monday ? mondayFrom : "Not Available",
      mondayTo: monday ? mondayTo : "Not Available",
      tuesdayFrom: tuesday ? tuesdayFrom : "Not Available",
      tuesdayTo: tuesday ? tuesdayTo : "Not Available",
      wednesdayFrom: wednesday ? wednesdayFrom : "Not Available",
      wednesdayTo: wednesday ? wednesdayTo : "Not Available",
      thursdayFrom: thursday ? thursdayFrom : "Not Available",
      thursdayTo: thursday ? thursdayTo : "Not Available",
      fridayFrom: friday ? fridayFrom : "Not Available",
      fridayTo: friday ? fridayTo : "Not Available",
      saturdayFrom: saturday ? saturdayFrom : "Not Available",
      saturdayTo: saturday ? saturdayTo : "Not Available",
      sundayFrom: sunday ? sundayFrom : "Not Available",
      sundayTo: sunday ? sundayTo : "Not Available",
      notes: notes,
      shortNotice: shortNotice,
      appointment: appointment,
      contactMe: contactMe,
      flexible: flexible,
      twentyFour: twentyFour,
    };
    axios
      .put(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/model/update`, {
        availability: availability,
      })
      .then((res) => {
        throwMessage("success", "Updated");
      })
      .catch((error) => {
        throwMessage("error", "Something went wrong");
      });
  };

  const applyAll = () => {
    if (
      mondayFrom === undefined ||
      mondayFrom === "Not Available" ||
      mondayTo === "Not Available" ||
      mondayTo === undefined
    ) {
      throwMessage("warning", "Please fill in MONDAY to use APPLY ALL feature");
    } else {
      setMondayFrom(mondayFrom);
      setMondayTo(mondayTo);
      setTuesdayFrom(mondayFrom);
      setTuesdayTo(mondayTo);
      setWednesdayFrom(mondayFrom);
      setWednesdayTo(mondayTo);
      setThursdayFrom(mondayFrom);
      setThursdayTo(mondayTo);
      setFridayFrom(mondayFrom);
      setFridayTo(mondayTo);
      setSaturdayFrom(mondayFrom);
      setSaturdayTo(mondayTo);
      setSundayFrom(mondayFrom);
      setSundayTo(mondayTo);

      for (let i = 0; i < 7; i++) {
        switch (i) {
          case 1:
            changeAval("tuesday");
            break;
          case 2:
            changeAval("wednesday");
            break;
          case 3:
            changeAval("thursday");
            break;
          case 4:
            changeAval("friday");
            break;
          case 5:
            changeAval("saturday");
            break;
          case 6:
            changeAval("sunday");
            break;
        }
      }
    }
  };

  return {
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
  };
};

export default blAval;
