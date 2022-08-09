import React from "react";
import bl from "./bl";
import styles from "./photos.module.css";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import Image from "next/image";
import cx from "classnames";

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${20}`;
};

const useStyles = makeStyles((props) => ({
  image: {
    objectFit: "cover",
    borderRadius: "50%",
    opacity: "0.9",
    cursor: "pointer",
  },

  imageBorder: {
    border: "5px solid #FC9918 !important",
  },

  deletePhoto: {
    position: "absolute",
    top: "-25px",
    left: "-20px",
    zIndex: "2",
  },
  addPhoto: {
    position: "absolute",
    bottom: "-25px",
    left: "109px",
    zIndex: "2",
  },

  addPhotoPlaHol: {
    position: "absolute",
    bottom: "0px",
    right: "0px",
    zIndex: "2",
  },
}));

const Photos = () => {
  const classes = useStyles();
  const { photos, urls, deleteFile, handleThumbnail, uploadSingleFile, photosRef } = bl();
  const placeholders = 4;
  return (
    <>
      <div className={styles.photoWrapper}>
        {photos?.length < 1 &&
          [...Array(placeholders)].map((e, i) => (
            <div key={i} className={styles.plaHol}>
              {urls.length - 1 && (
                <Button component="label" className={classes.addPhotoPlaHol}>
                  <Image
                    width={35}
                    height={35}
                    layout="fixed"
                    src={"/upload.png"}
                    alt=""
                  />
                  <input
                    onChange={(e) => uploadSingleFile(e, 0)}
                    type="file"
                    accept="image/*"
                    hidden
                    disabled={urls.length === 8}
                  />
                </Button>
              )}
            </div>
          ))}

        {photos?.length > 0 &&
          photos?.map((item, index) => {
            return (
              <div key={index} className={styles.box}>
                <Button
                  className={classes.deletePhoto}
                  component="label"
                  onClick={() => deleteFile(item)}
                >
                  <Image
                    width={30}
                    height={30}
                    layout="fixed"
                    src={"/bin.png"}
                    alt=""
                  />
                </Button>

                <Image
                  priority
                  onClick={() => handleThumbnail(item)}
                  className={
                    item.thumbnail
                      ? cx(classes.image, classes.imageBorder)
                      : cx(classes.image)
                  }
                  width={100}
                  height={100}
                  layout="responsive"
                  src={item.url}
                  loader={myLoader}
                  alt=""
                />

                {item.thumbnail && (
                  <span className={styles.thumbnail}>Thumbnail</span>
                )}

                {index + 1 === photosRef.current?.length && (
                  <Button component="label" className={classes.addPhoto}>
                    <Image
                      width={30}
                      height={30}
                      layout="fixed"
                      src={"/upload.png"}
                      alt=""
                    />
                    <input
                      onChange={(e) => uploadSingleFile(e, index + 1)}
                      type="file"
                      accept="image/*"
                      hidden
                      disabled={urls.length === 6}
                    />
                  </Button>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Photos;
