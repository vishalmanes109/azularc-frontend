import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Button from "@material-ui/core/Button";
import { addUser } from "../utils/ApiService";
import Alert from "@material-ui/lab/Alert";
import { isValidEmail } from "../utils/validator";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  header: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  submit: {
    margin: theme.spacing(1),

    backgroundColor: "green",
    width: "20px",
  },
}));

export default function UserForm({ name }) {
  const classes = useStyles();

  let [userData, setUserData] = useState({
    name: "",
    age: "",
    email: "",
    dob: Date,
    address: "",
    photo: ""
  });

  let [error, setError] = useState(false);
  let [success, setSuccess] = useState(false);
  let [message, setMessage] = useState("");
  const handleInput = (e) => {
    const { id, value } = e.target;
    // ...prevState means it takes prev object and spreads it value .... eg. initial time prevSate object id {name: "",email:"",password:"" }
    // so it got spread as name="", email="",  single variable and not an array

    // [id]:value => this takes value from e.target.value and put it into e.target.id for every entity in prevState object
    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const resetData = () => {
    setUserData({
      name: "",
      age: "",
      email: "",
      dob: Date,
      address: "",
      photo: ""
    });
  };
  const validateData = () => {
    if (!userData.name) {
      setError(true);
      setMessage("Please enter valid name");
      return false;
    }
    if (!userData.email || !isValidEmail(userData.email)) {
      setError(true);
      setMessage("Please enter valid email");
      return false;
    }
    if (!userData.age) {
      setError(true);
      setMessage("Please enter valid age");
      return false;
    }
    if (!userData.address) {
      setError(true);
      setMessage("Please enter valid address");
      return false;
    }

    if (!userData.DOB) {
      setError(true);
      setMessage("Please enter valid DOB");
      return false;
    }

    return true;
  };

  const submit = async (e) => {
    let isValide = true;
    e.preventDefault();
    console.log(userData);
    window.scrollTo({ top: 0, behavior: "smooth" });

    isValide = validateData();
    // console.log(isValide);
    if (isValide === false) return;
    try {
      setSuccess(true);

      setError(false);
      setMessage("");
      let result = await addUser(userData);
      // console.log("result login", result);

      if (result && result.success !== 1) {
        setError(true);
        setMessage("user addition Falied");
        return;
      }

      if (result && result.success === 1) {
        // console.log("lol:", result.data);
        resetData();
        setError(false);
        setSuccess(true);
        setMessage("User Added Succesfully!");

        return;
      }
    } catch (err) {
      setError(true);
      setMessage("Error! please try again");
    }
  };
  return (
    <>
      <div className={classes.header}>
        <h3>{name} Employee Details</h3>
        <Avatar className={classes.avatar}>
          <PostAddIcon />
        </Avatar>
        {error === true ? (
          <Alert severity="error">{message}</Alert>
        ) : (
          <div></div>
        )}
        {success === true ? (
          <Alert severity="info">{message}</Alert>
        ) : (
          <div></div>
        )}
      </div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={submit}
      >
        <Grid className={classes.form} container spacing={3}>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="name"
              label="Name"
              value={userData.name}
              helperText="Enter Name "
              variant="outlined"
              required
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              id="age"
              label="Age"
              value={userData.age}
              helperText="Enter Age "
              variant="outlined"
              required
              onChange={handleInput}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="address"
              label="Address"
              value={userData.address}
              variant="outlined"
              required
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              value={userData.email}
              variant="outlined"
              required
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              type="date"
              defaultValue="1980-05-24"
              id="DOB"
              // value={userData.DOB}
              label="Enter DOB"
              variant="outlined"
              onChange={handleInput}
            />
          </Grid>



          <Grid item xs={12} sm={6}>
            <p>Upload photo </p>
            <TextField
              fullWidth
              type="file"
              id="photo"
              value={userData.photo}
              variant="outlined"
              onChange={handleInput}
            />
          </Grid>
        </Grid>
        <Button
          onClick={submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </>
  );
}
