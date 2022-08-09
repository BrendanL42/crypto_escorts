import { useEffect, useContext } from "react";
import useState from "react-usestateref";
import axios from "axios";
import AppContext from "../../../../lib/AppContext";

// import { create as ipfsHttpClient } from "ipfs-http-client";

const bl = () => {
  const [photos, setPhotos, photosRef] = useState([]);
  const [urls, setUrls, urlsRef] = useState([]);
  const [once, setOnce] = useState(false);

  const [userProfile, setUserProfile, userProfileRef] = useState({});
  const { user, throwMessage, loadingModelClose } = useContext(AppContext);

  useEffect(() => {
    if (user._id) {
      readPhotos();
    }
  }, []);

  const readPhotos = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/model/read/${user._id}/photos `
      )
      .then((res) => {
        setPhotos(res.data.photos);
        setTimeout(() => {
          loadingModelClose();
        }, 200);
      })
      .catch((error) => {
        throwMessage("error", "Something went wrong", 3000);
        setOnce(false);
      });
  };

  // const uploadSingleFile = async (e, index) => {

  //   const size = e.target.files[0] ? e.target.files[0].size : 0;

  //   if (size < 2000000) {

  //     try {
  //       const added = await client.add(e.target.files[0], {
  //         progress: (prog) => console.log(`received: ${prog}`),
  //       });
  //       const url = `https://ipfs.infura.io/ipfs/${added.path}`;

  //       setUrls((state) => [...state, { thumbnail: false, url: url }]);
  //       photosRef.current.length > 0
  //         ? setPhotos((oldArray) => [
  //             ...oldArray,
  //             { thumbnail: false, url: url },
  //           ])
  //         : setPhotos({ thumbnail: false, url: url });
  //       callApi({ photos: photosRef.current });

  //     } catch (error) {

  //       throwMessage(
  //         "warning","Error uploading file")

  //       }

  //   } else {
  //     throwMessage(
  //       "warning",
  //       `File size size must be below 2mb, your file size is: ${(
  //         size /
  //         (1024 * 1024)
  //       ).toFixed(2)}mb`,
  //       3000
  //     );
  //   }
  // };

  const uploadSingleFile = (e, index) => {
    const size = e.target.files[0] ? e.target.files[0].size : 0;

    if (size < 7000000) {
      const formData = new FormData();
      formData.append("photo", e.target.files[0]);
      axios
        .post(
          `${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/images `,
          formData
        )
        .then((res) => {
          setUrls((state) => [...state, { thumbnail: false, url: res.data }]);
          photosRef.current.length > 0
            ? setPhotos((oldArray) => [
                ...oldArray,
                { thumbnail: false, url: res.data },
              ])
            : setPhotos({ thumbnail: false, url: res.data });
          callApi({ photos: photosRef.current });
        })
        .catch((error) => {
          throwMessage("error", "Something went wrong", 3000);
        });
    } else {
      throwMessage(
        "warning",
        `File size size must be below 2mb, your file size is: ${(
          size /
          (1024 * 1024)
        ).toFixed(2)}mb`,
        3000
      );
    }
  };

  // Handles changing boolean of main photo
  const handleThumbnail = (mainUrl) => {
    let myArray = photos;
    let objIndex = myArray.findIndex((obj) => obj.thumbnail === true);

    if (objIndex !== -1) {
      myArray[objIndex].thumbnail = false;
      setUrls(myArray);
      setUserProfile((prevState) => ({
        ...prevState,
        photos: urlsRef.current,
      }));
    }

    let myArray2 = photos;
    let objIndex2 = myArray2.findIndex((obj) => obj.url === mainUrl.url);
    myArray2[objIndex2].thumbnail = true;
    setUrls(myArray2);
    setUserProfile((prevState) => ({
      ...prevState,
      photos: urlsRef.current,
    }));
    handleSave();
  };

  // handles deleting individual photos
  const deleteFile = (e) => {
    const filtUrl = photos.filter((item) => item !== e);
    const removeDuplicates = [...new Set(filtUrl)];
    const formData = new FormData();
    formData.set("oldUrl", e.url);
    axios
      .post(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/images `, formData)
      .then(async (res) => {
        setUrls(removeDuplicates);
        setUserProfile((prevState) => ({
          ...prevState,
          photos: removeDuplicates,
        }));
        handleSave();
        setTimeout(() => {
          readPhotos();
        }, 3000);
      })
      .catch((error) => {
        throwMessage("error", "Something went wrong", 3000);
      });
  };

  const handleSave = (e) => {
    callApi(userProfileRef.current);
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
    photos,
    urls,
    deleteFile,
    handleThumbnail,
    uploadSingleFile,
    photosRef,
  };
};

export default bl;
