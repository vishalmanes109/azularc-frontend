import React, { useState ,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getUsers } from "../utils/ApiService";
import UserMeta from "../components/UserMeta";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

    // backgroundColor: "green",
    width: "150px",
  },
  container: {
    width: "95%",
    margin: "0 auto",
  },
}));

export default function Home() {
  const classes = useStyles();

  let [resultArray, setResultArray] = useState({
    name: "",
    age: "",
    email: "",
    dob: "",
    address: "",
    photo: ""
  });
  useEffect( async() => {
    let result = await getUsers();
    if (result ) {
        setError(true);
        setMessage(result.message);
        setResultArray(result);
        setTimeout(() => {
          setIsAuth(false);
        }, 3000);
      }
      if (result && result.success === 0) {
        // console.log(" success 0 Result:", result);
        setError(true);
        setMessage(result.message || "Error");
        return;
      }
      if (result && result.err) {
        setError(true);
        // console.log(" err Result:", result);
        setMessage("server error");
        return;
      }
      if (result && result.success === 1) {
        // console.log(" success Result 1:", result);
        setResultArray(result.data);
        setError(false);
        setMessage("");
        // console.log("resultArray:", resultArray);
        return;
      }
  });

  let [error, setError] = useState(false);
  let [isAuth, setIsAuth] = useState(true);
  let [message, setMessage] = useState("");
  
  
  

  return (
    <div className={classes.container}>
    
      <div>
        {!resultArray && resultArray.length < 0 ? (
          <div>No result to display</div>
        ) : (
          resultArray.map((user) => (
            <UserMeta key={user.id} user={user}></UserMeta>
          ))
        )}
      </div>
    </div>
  );
}
