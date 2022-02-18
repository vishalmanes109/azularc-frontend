import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import PostAddIcon from "@material-ui/icons/PostAdd";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { addUser, getUserById, updateUser } from "../utils/ApiService";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router";
import Nav from "../components/Nav";

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

    backgroundColor: "primary",
  },
}));

export default function UpdateUser(props) {
  const classes = useStyles();
  console.log("props: from update", props.location.state.user.id);
  let id = props.location.state.user.id;
  let [userData, setUserData] = useState({
    name: "",
    age: "",
    email: "",
    dob: "",
    address: "",
    photo: ""
  });

  useEffect(() => {
    async function fetchData() {
      let resultData = await getUserById(id);
      setUserData(resultData.data[0]);
      console.log("fetching data");
    }
    fetchData();
  }, []);
  let [error, setError] = useState(false);
  let [success, setSuccess] = useState(false);
  let [message, setMessage] = useState("");
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleInput = (e) => {
    const { id, value } = e.target;
    // ...prevState means it takes prev object and spreads it value .... eg. initial time prevSate object id {name: "",email:"",password:"" }
    // so it got spread as name="", email="", password="" single variable and not an array

    // [id]:value => this takes value from e.target.value and put it into e.target.id for every entity in prevState object
    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const resetData = () => {
    setUserData({
      name: "",
      fatherName: "",
      husbandName: "",
      address: "",
      DOE: "",
      DOB: "",
      DOBelt: "",
      DOAddition: "",
      qualification: "",
      occupation: "",
      contact1: "",
      contact2: "",
      gender: "",
      remark: "",
      groupIncharge: "",
      status: "",
      role: "",
      bloodGroup: "",
      testScore: "",
      attendence: "",
      photo: "",
      details: "",
    });
  };
  const validateData = () => {
    if (!userData.name) {
      setError(true);
      setMessage("Please enter valid name");
      return false;
    }
    if (!userData.address) {
      setError(true);
      setMessage("Please enter valid address");
      return false;
    }

    if (!userData.fatherName && !userData.husbandName) {
      setError(true);
      setMessage("Please enter fatherName/husband name");
      return false;
    }
    if (!userData.DOE) {
      setError(true);
      setMessage("Please enter valid DOE");
      return false;
    }
    if (!userData.DOB) {
      setError(true);
      setMessage("Please enter valid DOB");
      return false;
    }
    if (!userData.DOBelt) {
      setError(true);
      setMessage("Please enter valid Date of batch & belt");
      return false;
    }
    if (!userData.DOAddition) {
      setError(true);
      setMessage("Please enter valid Date of Addition");
      return false;
    }
    if (!userData.qualification) {
      setError(true);
      setMessage("Please enter valid qualification");
      return false;
    }
    if (!userData.occupation) {
      setError(true);
      setMessage("Please enter valid occupation");
      return false;
    }
    if (!userData.contact1) {
      setError(true);
      setMessage("Please enter valid contact number");
      return false;
    }
    if (!userData.gender) {
      setError(true);
      setMessage("Please select  gender");
      return false;
    }
    if (!userData.status) {
      setError(true);
      setMessage("Please select  status");
      return false;
    }

    return true;
  };

  const submit = async (e) => {
    let isValide = true;
    e.preventDefault();
    // // console.log(userData);
    window.scrollTo({ top: 0, behavior: "smooth" });

    isValide = validateData();
    // console.log(isValide);
    if (isValide === false) return;
    try {
      setSuccess(true);

      setError(false);
      setMessage("");
      let result = await updateUser(userData);
      // console.log("result login", result);

      if (result && result.success !== 1) {
        setError(true);
        setMessage("user updation Falied");
        return;
      }

      if (result && result.success === 1) {
        // console.log("lol:", result.data);
        resetData();
        setError(false);
        setSuccess(true);
        setMessage("User updated Succesfully!");

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
        <h3>Employee Details</h3>
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
              label="First Name"
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
