import { useContext, useEffect } from "react";
import useState from "react-usestateref";
import services from "../../../../lib/services";
import categorie from "../../../../lib/categorie";
import AppContext from "../../../../lib/AppContext";
import axios from "axios";

const bl = () => {
  const [categories, setCategories, categoriesRef] = useState([]);
  const [service, setService, serviceRef] = useState([]);
  const { throwMessage, user } = useContext(AppContext);
  const [servicesInfo, setServicesInfo] = useState("");

  useEffect(() => {
    if (user._id) {
      fetchUser();
    }
  }, []);

  const handleTextField = (e) => {
    setServicesInfo(e.target.value);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeService = (event) => {
    const {
      target: { value },
    } = event;
    setService(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const onSave = (input) => {
    if (input === "categories") {
      callApi({ categories: categories }, false);
    } else if (input === "services") {
      callApi({ services: service }, false);
      callApi({ servicesInfo: servicesInfo }, true);
    }
  };
  const callApi = (data, set) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/model/update/${
          !set ? "servicesCatergories" : ""
        }`,
        data
      )
      .then((res) => {
        !set && throwMessage("success", "Updated");
      })
      .catch((error) => {
        throwMessage("error", "Something went wrong");
      });
  };

  const fetchUser = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/model/read/${user._id} `
      )
      .then((res) => {
        setService(res.data.services);
        setCategories(res.data.categories);
        setServicesInfo(res.data.servicesInfo);
      })
      .catch((error) => {
        throwMessage("error", "Something went wrong");
      });
  };

  return {
    handleChange,
    categorie,
    services,
    onSave,
    categoriesRef,
    serviceRef,
    handleChangeService,
    servicesInfo,
    handleTextField,
  };
};

export default bl;
