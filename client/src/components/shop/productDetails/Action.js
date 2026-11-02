import React from "react";
import { postAddReview, postDeleteReview } from "./FetchApi";
import { isAuthenticate } from "../auth/fetchApi";

export const Alert = (color, text) => (
  <div
    className={`flex items-center gap-2 px-4 py-3 my-3 rounded-xl text-sm font-medium shadow-sm border ${
      color === "red"
        ? "bg-red-50 text-red-700 border-red-200"
        : color === "green"
        ? "bg-green-50 text-green-700 border-green-200"
        : `bg-${color}-100 text-gray-800 border-gray-200`
    }`}
  >
    <span className="text-base">✓</span> {text}
  </div>
);

export const reviewSubmitHanlder = (fData, setFdata, fetchData) => {
  if (!fData.rating || !fData.review) {
    setFdata({ ...fData, error: "Rating and review must be required" });
  } else if (!isAuthenticate()) {
    setFdata({ ...fData, error: "You must need login to review" });
  } else {
    addReview(fData, setFdata, fetchData);
  }
};

export const deleteReview = async (
  reviewId,
  productId,
  fetchData,
  setFdata
) => {
  try {
    let responseData = await postDeleteReview({
      rId: reviewId,
      pId: productId,
    });
    if (responseData.success) {
      fetchData();
      setFdata({ success: responseData.success });
    } else if (responseData.error) {
      fetchData();
    }
  } catch (error) {
    console.log(error);
  }
};

export const addReview = async (fData, setFdata, fetchData) => {
  let formData = {
    rating: fData.rating,
    review: fData.review,
    pId: fData.pId,
    uId: JSON.parse(localStorage.getItem("jwt")).user._id,
  };
  try {
    let responseData = await postAddReview(formData);
    if (responseData.success) {
      setFdata({
        ...fData,
        success: responseData.success,
        review: "",
        rating: "",
      });
      fetchData();
    } else if (responseData.error) {
      setFdata({ ...fData, error: responseData.error, review: "", rating: "" });
      fetchData();
    }
  } catch (error) {
    console.log(error);
  }
};