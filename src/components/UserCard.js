import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

import "./UserCard.css";
import img from "./A2.jpg";
import profile from "../static/images/profile.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "5%",
    padding: "2%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "0.01em solid grey",
    borderRadius: "20px",
    boxShadow:
      "0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12)",
  },
  photo: {
    width: "80%",
    height: "auto",
  },
  card: {
    margin: "1%",
    padding: "1%",
    width: "80%",
    alignItems: "left",
  },

  header: {
    width: "100%",
    border: "2px solid red",
    maxWidth: "700px",
    fontSize: "20em",
    fontWeight: "900",
  },

  media: {
    maxWidth: "700px",
  },

  attribute: {
    display: "inline",
    fontSize: "1.2em",
  },
  data: {
    color: "grey",
    margin: "20px",
  },

  list: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function UserCard({ user }) {
  const classes = useStyles();
  let call = "tel:" + user.contact1;
  let [isEdit, setIsEdit] = useState(false);
  let f_hName = user.fatherName;
  if (user.gender === "Female") {
    if (user.fatherName) f_hName = "D/o" + user.fatherName;
    else if (user.husbandName) f_hName = "W/o " + user.husbandName;
  }
  const edit = () => {
    setIsEdit(true);
  };
  return (
    <>
      <div className={classes.root}>
        
        {isEdit ? (
          <Redirect
            id={user.id}
            to={{ pathname: "/update", state: { user: user } }}
          ></Redirect>
        ) : (
          <>
            <h3>Sewadal Details</h3>
            <br />
            <img
              className={classes.photo}
              // src={profile}
              src={user.photo}
              alt="phnnoto"
              width="600"
              height="400"
            ></img>
            <div className={classes.card}>
              <div className={classes.attribute}>
                <span>Name:</span>
                <span className={classes.data}>{user.name}</span>
              </div>
              <br />

              <div className={classes.attribute}>
                <span>Address:</span>
                <span className={classes.data}>{user.address}</span>
              </div>
              <br />


              
              <div className={classes.attribute}>
                <span>DOB:</span>
                <span className={classes.data}>{user.DOB}</span>
              </div>
              <br />
              
              <br />
            </div>
            
          </>
        )}
      </div>
    </>
  );
}
