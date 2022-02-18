import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import Nav from "../components/Nav";
import UserCard from "../components/UserCard";

export default function UserDetail(props) {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  //console.log("props: from detauls", props.location.state.user);
  let [user, setUser] = useState({});
  useEffect(() => {
    setUser(props.location.state.user);
  }, []);
  //console.log("newUser", user);
  return (
    <>
      <Nav></Nav>
      <UserCard user={user}></UserCard>
    </>
  );
}
