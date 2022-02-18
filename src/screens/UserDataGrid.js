import React, { useState } from "react";
import DataList from "../components/DataList";
import Nav from "../components/Nav";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
    alignItems: "center",
    border: "1px solid purple",
    borderRadius: "0.5%",
  },
}));

export default function UserDataGrid() {
  const classes = useStyles();
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <>
      {!isLoggedIn ? (
        <Redirect to="login"></Redirect>
      ) : (
        <>
          <Nav></Nav>
          <></>
          <div className={classes.root}>
            <DataList></DataList>
          </div>
        </>
      )}
    </>
  );
}
