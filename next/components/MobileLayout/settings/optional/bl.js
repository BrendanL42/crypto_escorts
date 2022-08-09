import { useState, useContext, useEffect } from "react";
import AppContext from "../../../../lib/AppContext";
import axios from "axios";

const bl = () => {
  const [wishList, setWishList] = useState([]);

  const { user, throwMessage, setTriggerReAuth } = useContext(AppContext);

  useEffect(() => {
    readWishList();
  }, []);

  const readWishList = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/model/read/${user._id} `
      )
      .then((res) => {
        setWishList(res.data.wishList);
      })
      .catch((error) => {
        throwMessage("error", "Something went wrong", 3000);
      });
  };

  const getWishes = () => {
    const wishes = [
      { value: "wine ", menu: "Wine" },
      { value: "vouchers", menu: "Vouchers" },
      { value: "toys", menu: "Toys" },
      { value: "spa/massage", menu: "Spa / Massage" },
      { value: "skinCare", menu: "Skin Care" },
      { value: "shoes", menu: "Shoes" },
      { value: "perfume", menu: "Perfume" },
      { value: "music", menu: "Music" },
      { value: "lingerie", menu: "Lingerie" },
      { value: "jewellery", menu: "Jewellery" },
      { value: "handbags", menu: "Handbags" },
      { value: "giftcard", menu: "Giftcards" },
      { value: "food", menu: "Food" },
      { value: "flowers", menu: "Flowers" },
      { value: "costumes", menu: "Costumes" },
      { value: "choclate", menu: "Choclate" },
      { value: "books", menu: "Books" },
      { value: "art", menu: "Art" },
    ];
    return wishes;
  };

  const handleSelect = (event) => {
    const {
      target: { value },
    } = event;
    setWishList(typeof value === "string" ? value.split(",") : value);
  };

  const handleSave = (value) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/model/update `, {
        wishList: wishList,
      })
      .then((res) => {
        throwMessage("success", "Updated");
        readWishList();
      })
      .catch((error) => {
        throwMessage("error", "Something went wrong");
      });
  };

  return { getWishes, handleSelect, wishList, handleSave };
};

export default bl;
