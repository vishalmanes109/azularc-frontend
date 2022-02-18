import React from "react";
import { Redirect } from "react-router";
import Nav from "../components/Nav";
import UserForm from "../components/UserForm";

export default function AddUser() {
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <>
      <Nav></Nav>
      <UserForm name="Add"></UserForm>
    </>
  );
}
