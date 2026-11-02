import React, { Fragment } from "react";
import moment from "moment";

const Footer = (props) => {
  return (
    <Fragment>
      <footer
        style={{ background: "#ffffff", color: "#374151" }}
        className="z-10 py-6 px-4 md:px-12 text-center border-t"
      >
        <span className="font-bold tracking-widest text-gray-800">ORGANEASE</span>
        <span> © {moment().format("YYYY")} - Made by Mayukh Mondal</span>
        <p className="text-sm text-gray-500 mt-1">Saving Lives, One Organ at a Time</p>
      </footer>
    </Fragment>
  );
};

export default Footer;