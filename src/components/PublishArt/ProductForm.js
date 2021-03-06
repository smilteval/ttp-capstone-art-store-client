import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { makeStyles } from "@material-ui/core/styles";

import { green } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const categories = [
  {
    value: "Emoji Art",
    label: "Emoji Art",
  },
  {
    value: "Paintings",
    label: "Paintings",
  },
  {
    value: "Photography",
    label: "Photography",
  },
  {
    value: "Drawings",
    label: "Drawings",
  },
  {
    value: "Sculptures",
    label: "Sculptures",
  },
  {
    value: "Crafts",
    label: "Crafts",
  },
  {
    value: "Graphic Design",
    label: "Graphic Design",
  },
  {
    value: "Calligraphy",
    label: "Calligraphy",
  },
  {
    value: "Pixel Art",
    label: "Pixel Art",
  },
  {
    value: "Gifs",
    label: "Gifs",
  },
];

export default function ProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState();
  const [artist, setArtist] = useState("Anonymous");


  const fileInputRef = useRef();

  const timer = React.useRef();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);



  //image preview
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  //sending form data to Strapi
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({ title, description, price, category, artist })
    );
    formData.append("files.image", image);

    const response = await fetch(
      "https://ttp-art-store.herokuapp.com/products",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();

    if (response.status !== 200) {
      setOpenError(true);
    } else {
      setOpenSuccess(true);
    }

    console.log("data", data);
    console.log("artist", artist);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSuccess(false);
  };

  return (
    <div className="upload-art">
      <form onSubmit={handleSubmit} id="product-upload-form">
        <div id="product-image-upload">
          {imagePreview ? (
            <img id="product-photo-preview" src={imagePreview} />
          ) : (
            <button
              id="upload-photo-btn"
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
            >
              <i id="upload-img-text">Please upload an image of your product</i>
            </button>
          )}

          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files[0];
              if (file && file.type.substr(0, 5) === "image") {
                setImage(file);
              } else {
                setImage(null);
              }
            }}
          />
        </div>
        <div id="product-info-upload">
          <h3>Please provide information about your art</h3>
          <TextField
            label="Title"
            variant="filled"
            size="small"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <br></br>
          <TextField
            label="Description"
            variant="filled"
            size="small"
            multiline
            rowsMax={5}
            rows={5}
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <br></br>
          <FormControl fullWidth variant="filled">
            <InputLabel>Price*</InputLabel>
            <FilledInput
              type="number"
              size="small"
              required
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
          <br></br>
          <TextField
            label="Art category"
            variant="filled"
            helperText="Please select one category"
            size="small"
            select
            required
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((option) => (
              <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}
          </TextField>
          <br></br>
          <TextField
            label="Full Name"
            variant="filled"
            size="small"
            helperText="Please enter your username (if you don't wish to provide one, you will be named anonymous)"
            required
            value={artist}
            onChange={(event) => setArtist(event.target.value)}
          />

          <br></br>
          <Button
            id="publish-btn"
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
          >
            Publish
          </Button>
        </div>

        <Snackbar
          open={openSuccess}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Your art was published successfully!
          </Alert>
        </Snackbar>
        <Snackbar>
          <Alert open={openError} onClose={handleClose} severity="error">
            We couldn't upload your art, please try again...
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
}
