import React, { Fragment } from "react";

const Footer = (props) => {
  return (
    <Fragment>
      <footer className="z-10 py-6 px-4 md:px-12 text-center border-t bg-white">
        <span className="font-bold tracking-widest text-gray-800">ORGANEASE</span>
        <span className="text-gray-600"> © {new Date().getFullYear()}</span>
        <p className="text-sm text-gray-500 mt-1">Saving Lives, One Organ at a Time</p>
      </footer>
    </Fragment>
  );
};

export default Footer;