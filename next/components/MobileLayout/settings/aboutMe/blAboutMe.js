import { useEffect, useContext } from "react";
import bl from "../bl";
import AppContext from "../../../../lib/AppContext";
import useState from "react-usestateref";
import { MenuItem } from "@mui/material";
import axios from "axios";

const blAboutMe = () => {
  const [userProfile, setUserProfile, userProfileRef] = useState({
    age: undefined,
    fName: "",
    lName: "",
    height: "",
    hair: "",
    bio: "",
    title: "",
    gender: "",
    cup: "",
    nationality: "",
    country: "",
    state: "",
    city: "",
    available: "",
    bodyType: "",
    eyes: "",
  });

  const [gender, setGender] = useState("");

  const [once, setOnce] = useState(false);
  const { auth, user, throwMessage } = useContext(AppContext);
  // const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
  const { setAuthSwitch } = bl();

  useEffect(() => {
    if (user._id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/model/read/${user._id} `
        )
        .then((res) => {
          setAuthSwitch(auth);
          setUserProfile((prevState) => ({
            ...prevState,
            fName: res.data.fName,
            lName: res.data.lName,
            age: res.data.age,
            height: res.data.height,
            hair: res.data.hair,
            bio: res.data.bio,
            title: res.data.title,
            cup: res.data.cup,
            gender: res.data.gender,
            nationality: res.data.nationality,
            country: res.data.country,
            state: res.data.state,
            city: res.data.city,
            available: res.data.available,
            bodyType: res.data.bodyType,
            eyes: res.data.eyes,
          }));
        })
        .catch((error) => {
          throwMessage("error", "Something went wrong", 3000);
          setOnce(false);
        });
    }
  }, []);

  const getAges = () => {
    let ages = [];
    for (let i = 18; i < 81; i++) {
      ages.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
    }
    return ages;
  };

  const getHeights = () => {
    let heights = [];
    for (let i = 120; i < 210; i++) {
      heights.push(
        <MenuItem key={i} value={i}>
          {i} cm
        </MenuItem>
      );
    }
    return heights;
  };

  const getBusts = () => {
    const busts = [
      { value: "a-b", menu: "A-B" },
      { value: "c-d", menu: "C-D" },
      { value: "dd", menu: "DD & Above" },
    ];

    return busts;
  };

  const getHair = () => {
    const hair = [
      { value: "blonde", menu: "Blonde" },
      { value: "red", menu: "Red" },
      { value: "black", menu: "Black" },
      { value: "brunette", menu: "Brunette" },
      { value: "auburn", menu: "Auburn" },
      { value: "platinum blonde", menu: "Platinum Blonde" },
      { value: "stawberry Blonde", menu: "Stawberry Blonde" },
      { value: "pastel", menu: "Pastel" },
      { value: "pink", menu: "Pink" },

      { value: "blue", menu: "Blue" },

      { value: "green", menu: "Green" },
    ];

    return hair;
  };

  const getbodyType = () => {
    const body = [
      { value: "curvy", menu: "Curvy" },
      { value: "athletic", menu: "Athletic" },
      { value: "slim", menu: "Slim" },
      { value: "voluptuous", menu: "Voluptuous" },
      { value: "busty", menu: "Busty" },
      { value: "bbw", menu: "BBW" },
    ];
    return body;
  };

  const getEyes = () => {
    const eyes = [
      { value: "brown", menu: "Brown" },
      { value: "blue", menu: "Blue" },
      { value: "green", menu: "Green" },
      { value: "hazel", menu: "Hazel" },
      { value: "blue/green", menu: "Blue/Green" },
      { value: "black", menu: "Black" },
      { value: "grey", menu: "Grey" },
    ];
    return eyes;
  };

  const handleGender = (gender) => {
    switch (gender) {
      case "female":
        setUserProfile((prevState) => ({
          ...prevState,
          gender: "female",
        }));
        break;

      case "male":
        setUserProfile((prevState) => ({
          ...prevState,
          gender: "male",
        }));
        break;
      case "trans":
        setUserProfile((prevState) => ({
          ...prevState,
          gender: "trans",
        }));
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    callApi(userProfileRef.current);
  };

  const handlesetAvailable = () => {
    setUserProfile((prevState) => ({
      ...prevState,
      available: userProfileRef.current.available ? false : true,
    }));

    handleSave();
  };

  const callApi = (value) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/model/update `,
        value
      )
      .then((res) => {
        throwMessage("success", "Updated", 3000);
      })
      .catch((error) => {
        throwMessage("error", "Something went wrong", 3000);
        setOnce(false);
      });
  };

  return {
    handlesetAvailable,
    handleSave,
    handleChange,
    handleGender,
    getHair,
    getBusts,
    getHeights,
    getEyes,
    getbodyType,
    getAges,
    userProfileRef,
    userProfile,
    gender,
  };
};

export default blAboutMe;
