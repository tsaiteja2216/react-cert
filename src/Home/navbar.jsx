import React from "react";
import styles from "./home.module.css";
import { Login } from "./login";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <div>    <div id={styles.Navbar}>
      <div id={styles.img}>
        <img
          src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png"
          alt="Logo"
          height="30px"
          width="30px"
        ></img>
        <p>Kafene</p>
      </div>
      <div id={styles.list}>
        <a className={styles.list} href="/home">
          <Link to="/home">Orders</Link>
        </a>
        <a className={styles.list} href="/products">
          <Link to="/products">Products</Link>
        </a>
        <a className={styles.list} href="/users">
          <Link to="/users">Users</Link>
        </a>
      </div>
      <div id={styles.logout}>
        <a href="/" className={styles.list}>
       
            Logout
        
        </a>
      </div>
      </div>
     
      
    </div>
  );
};