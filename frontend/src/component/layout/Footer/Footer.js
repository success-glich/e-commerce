import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./footer.css";
const currentYear = new Date().getFullYear();
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="AppStore" />
      </div>
      <div className="midFooter">
        <h1>ELECTRIFY.</h1>
        <p>High Quality is our firs priority</p>
        <p>CopyRights {currentYear} &copy; MeSaphal </p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://instagram.com">Instagram</a>
        <a href="https://facebook.com">LinkedIn</a>
        <a href="https://google.com">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
