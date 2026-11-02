import React, { Fragment } from "react";
import Layout from "../layout";
import SingleWishProduct from "./SingleWishProduct";

const WishList = () => {
  return (
    <Fragment>
      <div className="min-h-screen bg-[#f8f8f8]">
        <Layout children={<SingleWishProduct />} />
      </div>
    </Fragment>
  );
};

export default WishList;