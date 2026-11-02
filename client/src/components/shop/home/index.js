import React, { Fragment, createContext, useReducer } from "react";
import Layout from "../layout";
import Slider from "./Slider";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";

export const HomeContext = createContext();

const HomeComponent = () => {
  return (
    <Fragment>
      <Slider />

      <section className="m-4 md:mx-8 md:my-6">
        <ProductCategory />
      </section>

      <section className="m-4 md:mx-8 md:my-6">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-[20px] md:text-[24px] font-bold">Available Organs</h2>
          <span className="text-xs font-bold text-gray-400">Fresh & Verified</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          <SingleProduct />
        </div>
      </section>
    </Fragment>
  );
};

const Home = (props) => {
  const [data, dispatch] = useReducer(homeReducer, homeState);
  return (
    <Fragment>
      <HomeContext.Provider value={{ data, dispatch }}>
        <Layout children={<HomeComponent />} />
      </HomeContext.Provider>
    </Fragment>
  );
};

export default Home;