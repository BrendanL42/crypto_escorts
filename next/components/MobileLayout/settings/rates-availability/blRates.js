import { useContext, useEffect } from "react";
import useState from "react-usestateref";
import axios from "axios";
import one from "../../../../lib/rates/one";
import AppContext from "../../../../lib/AppContext";

const blRates = () => {
  const { throwMessage, user } = useContext(AppContext);
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState(null);
  const [extra, setExtra] = useState("");

  const [deleteRow, setDeleteRow] = useState(0);
  const [deleteRowTouring, setDeleteRowTouring] = useState(0);
  const [deleteRowFly, setDeleteRowFly] = useState(0);

  const [warning, setWarning] = useState(false);
  const [selected, setSelected] = useState("");
  const [rates, setRates, refRates] = useState([]);
  const [flyMeRates, setFlyMeRates, refFlyMeRates] = useState([]);
  const [touringRates, setTouringRates, refTouringRates] = useState([]);
  const [extraNotes, setExtraNotes] = useState("");

  const [touringRate, setTouringRate] = useState(false);
  const [flyMeRate, setFlyMeRate] = useState(false);
  const [permanentRate, setPermanentRate] = useState(false);


  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [tours, setTours] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

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
        setTours(res.data.tours);
        setRates(res.data.rates);
        setTouringRates(res.data.touringRates);
        setFlyMeRates(res.data.flyMeRates);
        setExtraNotes(res.data.ratesNotes);
      })
      .catch((error) => {
        throwMessage("error", "Something went wrong");
      });
  };

  const getTimes = () => {
    const times = [
      { value: "15", menu: "15 Mins" },
      { value: "30", menu: "30 Mins" },
      { value: "45", menu: "45 Mins" },
      { value: "60", menu: "60 Mins" },
    ];
    return times;
  };

  const handleDuration = (event) => {
    setDuration(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleExtra = (event) => {
    setExtra(event.target.value);
  };

  const handleExtraNotes = (event) => {
    setExtraNotes(event.target.value);
  };

   
  const addRate = () => {
    const r = (Math.random() + 1).toString(36).substring(7);
    const newRate = {
      duration: duration,
      price: price,
      extra: extra,
      id: r,
    };
    if (price && duration && !touringRate && !flyMeRate) {
      setRates((oldArray) => [...oldArray, newRate]);
      save()
    } else if (selectedCities.length > 0) {
      const flyMe = {
        cities: selectedCities,
      };
      const merged = { ...newRate, ...flyMe };
      setTouringRates((oldArray) => [...oldArray, merged]);
      save()
      setSelectedCities([])
    } else if (state && city && country) {
      const flyMe = {
        country: country,
        state: state,
        city: city,
      };
      const merged = { ...newRate, ...flyMe };
      setFlyMeRates((oldArray) => [...oldArray, merged]);
      save()
      setCountry("")
      setCity("")
      setState("")
    }
    setPrice(0);
    setExtra("");
    setDuration("");
  };

  const handleDeleteSelect = (index, type) => {
    switch (type) {
      case "touringRates":
        setDeleteRowTouring(index);
        break;
      case "flyMeRates":
        setDeleteRowFly(index);
        break;
      case "rates":
        setDeleteRow(index);
        break;
    }
  };

  const handleDelete = (id, type) => {
    switch (type) {
      case "touringRates":
        setTouringRates(touringRates.filter((item) => item.id !== id));
        if (touringRates.length === 1) {
          save(true);
        }
        break;
      case "flyMeRates":
        setFlyMeRates(flyMeRates.filter((item) => item.id !== id));
        if (flyMeRates.length === 1) {
          save(true);
        }
        break;
      case "rates":
        setRates(rates.filter((item) => item.id !== id));
        if (rates.length === 1) {
          save(true);
        }
        break;
    }
  };

  const generatePreFill = (packages) => {
    if (warning) {
      switch (packages) {
        case "$":
          setSelected("$");
          setRates(one);
          setWarning(false);
          break;
        case "$$":
          setSelected("$$");
          setRates(one);
          setWarning(false);
          break;
        case "$$$":
          setSelected("$$$");
          setRates(one);
          setWarning(false);
          break;
        case "$$$$":
          setSelected("$$$$");
          setRates(one);
          setWarning(false);
          break;
      }
    } else {
      setWarning(true);
    }
  };

  const save = (rate) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/model/update`, {
        rates: !rate ? refRates.current : [],
        flyMeRates: !rate ? refFlyMeRates.current : [],
        touringRates: !rate ? refTouringRates.current : [],
        ratesNotes: extraNotes,
      })
      .then((res) => {
        throwMessage("success", "Updated");
      })
      .catch((error) => {
        throwMessage("error", "Something went wrong");
      });
  };

  const handleCheckBox = (e) => {
    if (e.target.name === "touringRate") {
      setTouringRate(e.target.checked);
      setFlyMeRate(false);
      setPermanentRate(false);
    } else if (e.target.name === "flyMeRate") {
      setFlyMeRate(e.target.checked);
      setTouringRate(false);
      setPermanentRate(false);
    }
    else if (e.target.name === "permanentRate") {
      setPermanentRate(e.target.checked);
      setTouringRate(false);
      setFlyMeRate(false);
    }
  };

  const handleLocation = (e) => {
    setState(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  const handleTour = (tourId, city) => {
    if (selectedCities.find((item) => item.tourId === tourId)) {
      setSelectedCities(
        selectedCities.filter((item) => item.tourId !== tourId)
      );
    } else {
      setSelectedCities((oldArray) => [
        ...oldArray,
        { tourId: tourId, city: city },
      ]);
    }
  };

  return {
    handleDuration,
    handlePrice,
    duration,
    getTimes,
    price,
    extra,
    handleExtra,
    extraNotes,
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
    country,
    handleLocation,
    handleCity,
    city,
    handleCountry,
    tours,
    handleTour,
    selectedCities,
    flyMeRates,
    touringRates,
    deleteRowTouring,
    deleteRowFly,
  };
};

export default blRates;
