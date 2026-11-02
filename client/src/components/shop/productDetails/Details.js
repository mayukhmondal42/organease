import React, { Fragment } from "react";
import ProductDetailsSection from "./ProductDetailsSection";

const Details = (props) => {
  return (
    <Fragment>
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <ProductDetailsSection />
        </div>
      </section>
    </Fragment>
  );
};

export default Details;