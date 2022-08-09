import { useEffect, useContext } from "react";
import useState from "react-usestateref";
import axios from "axios";
import AppContext from "../../../../lib/AppContext";

const bl = () => {
  const [userProfile, setUserProfile, userProfileRef] = useState({
    country: "",
    cityOne: "",
    stateOne: "",
    cityTwo: "",
    stateTwo: "",
    cityThree: "",
    stateThree: "",
    cityFour: "",
    stateFour: "",
    cityFive: "",
    stateFive: "",
    tours: [],
  });

  const [tabs, setTabs] = useState([1, 2, 3, 4, 5]);
  const [currentCity, setCurrentCity] = useState(1);
  const [touring, setTouring] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, throwMessage } = useContext(AppContext);

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
        setUserProfile((prevState) => ({
          ...prevState,
          country: res.data.country,
          cityOne: res.data.cityOne,
          stateOne: res.data.stateOne,
          cityTwo: res.data.cityTwo,
          stateTwo: res.data.stateTwo,
          cityThree: res.data.cityThree,
          stateThree: res.data.stateThree,
          cityFour: res.data.cityFour,
          stateFour: res.data.stateFour,
          cityFive: res.data.cityFive,
          stateFive: res.data.stateFive,
          tours: res.data.tours,
          touring: res.data.touring,
        }));
      })
      .catch((error) => {
        throwMessage("error", "Something went wrong");
      });
  };

  const handleCountry = (event) => {
    setUserProfile((prevState) => ({
      ...prevState,
      country: event.target.value,
    }));
  };

  const handleState = (event) => {
    switch (currentCity) {
      case 1:
        setUserProfile((prevState) => ({
          ...prevState,
          stateOne: event.target.value,
        }));
        break;
      case 2:
        setUserProfile((prevState) => ({
          ...prevState,
          stateTwo: event.target.value,
        }));
        break;
      case 3:
        setUserProfile((prevState) => ({
          ...prevState,
          stateThree: event.target.value,
        }));
        break;
      case 4:
        setUserProfile((prevState) => ({
          ...prevState,
          stateFour: event.target.value,
        }));
        break;
      case 5:
        setUserProfile((prevState) => ({
          ...prevState,
          stateFive: event.target.value,
        }));
        break;
    }
  };

  const handleCity = (event) => {
    switch (currentCity) {
      case 1:
        setUserProfile((prevState) => ({
          ...prevState,
          cityOne: event.target.value,
        }));
        break;
      case 2:
        setUserProfile((prevState) => ({
          ...prevState,
          cityTwo: event.target.value,
        }));
        break;
      case 3:
        setUserProfile((prevState) => ({
          ...prevState,
          cityThree: event.target.value,
        }));
        break;
      case 4:
        setUserProfile((prevState) => ({
          ...prevState,
          cityFour: event.target.value,
        }));
        break;
      case 5:
        setUserProfile((prevState) => ({
          ...prevState,
          cityFive: event.target.value,
        }));
        break;
    }
  };

  const selectCurrentCity = (model) => {
    setCurrentCity(model);

  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTouring = (event) => {
    setUserProfile((prevState) => ({
      ...prevState,
      country: "",
      cityOne: "",
      stateOne: "",
      cityTwo: "",
      stateTwo: "",
      cityThree: "",
      stateThree: "",
      cityFour: "",
      stateFour: "",
      cityFive: "",
      stateFive: "",
      touring: touring ? false : true,
    }));
    touring ? setTouring(false) : setTouring(true);
    handleClose();
    onSave();
  };

  const onSave = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/model/update`,
        userProfileRef.current
      )
      .then((res) => {
        throwMessage("success", "Updated");
      })
      .catch((error) => {
        throwMessage("error", "Something went wrong");
      });
  };

  return {
    userProfile,
    handleCountry,
    handleCity,
    handleState,
    setUserProfile,
    tabs,
    setTabs,
    selectCurrentCity,
    currentCity,
    touring,
    handleTouring,
    onSave,
    fetchUser,
    handleClickOpen,
    handleClose,
    open,
  };
};

export default bl;
