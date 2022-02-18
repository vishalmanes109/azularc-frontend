import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

export default function Nav() {

  let dropdowns = document.querySelectorAll(".navbar .dropdown-toggler");
  let dropdownIsOpen = false;

  if (dropdowns.length) {
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("click", (event) => {
        let target = document.querySelector(
          "#" + event.target.dataset.dropdown
        );

        if (target) {
          if (target.classList.contains("show")) {
            target.classList.remove("show");
            dropdownIsOpen = false;
          } else {
            target.classList.add("show");
            dropdownIsOpen = true;
          }
        }
      });
    });
  }

  // Handle closing dropdowns if a user clicked the body
  window.addEventListener("mouseup", (event) => {
    if (dropdownIsOpen) {
      dropdowns.forEach((dropdownButton) => {
        let dropdown = document.querySelector(
          "#" + dropdownButton.dataset.dropdown
        );
        let targetIsDropdown = dropdown === event.target;

        if (dropdownButton === event.target) {
          return;
        }

        if (!targetIsDropdown && !dropdown.contains(event.target)) {
          dropdown.classList.remove("show");
        }
      });
    }
  });

  // Open links in mobiles
  function handleSmallScreens() {
    document.querySelector(".navbar-toggler").addEventListener("click", () => {
      let navbarMenu = document.querySelector(".navbar-menu");

      if (navbarMenu.style.display === "flex") {
        navbarMenu.style.display = "none";
        return;
      }

      navbarMenu.style.display = "flex";
    });
  }

  // handleSmallScreens();
  useEffect(() => {
    handleSmallScreens();
  }, []);

 
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-header">
          <button className="navbar-toggler" data-toggle="open-navbar1">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Link to="home">
            <h4>
            azularc<span>Employee</span>Mngr.
            </h4>
          </Link>
        </div>
        <div className="navbar-menu" id="open-navbar1">
          <ul className="navbar-nav">
            
            <li>
              <Link to="search">Search</Link>
            </li>
            <li>
              <Link to="adduser">Add</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
