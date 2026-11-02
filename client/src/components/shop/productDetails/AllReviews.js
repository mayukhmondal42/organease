import React, { Fragment, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "./Action";

import moment from "moment";
import { LayoutContext } from "../layout";
import { deleteReview } from "./Action";
import { isAuthenticate } from "../auth/fetchApi";
import { getSingleProduct } from "./FetchApi";

const AllReviews = (props) => {
  const { data, dispatch } = useContext(LayoutContext);
  const { pRatingsReviews } = data.singleProductDetail;
  let { id } = useParams();

  const [fData, setFdata] = useState({
    success: false,
  });

  if (fData.success) {
    setTimeout(() => {
      setFdata({ ...fData, success: false });
    }, 2000);
  }

  const fetchData = async () => {
    try {
      let responseData = await getSingleProduct(id);
      if (responseData.Product) {
        dispatch({
          type: "singleProductDetail",
          payload: responseData.Product,
        });
      }
      if (responseData.error) {
        console.log(responseData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="md:mx-16 lg:mx-20 xl:mx-24 flex flex-col">
        {fData.success ? Alert("red", fData.success) : ""}
      </div>

      <div className="mt-6 mb-12 md:mx-16 lg:mx-20 xl:mx-24">
        {pRatingsReviews.length > 0 ? (
          <div className="flex flex-col gap-5">
            {pRatingsReviews.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <img
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-yellow-100 shrink-0"
                      src="https://secure.gravatar.com/avatar/676d90a1574e9d3ebf98dd36f7adad60?s=60&d=mm&r=g"
                      alt="pic"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-gray-900 text-[15px] leading-tight truncate">
                            {item.user ? item.user.name : ""}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {moment(item.createdAt).format("lll")}
                          </p>
                        </div>

                        <div className="flex shrink-0 bg-yellow-50 px-2.5 py-1.5 rounded-full">
                          {[...Array(Number(item.rating))].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          {[...Array(5 - Number(item.rating))].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-700 text-[14px] leading-relaxed mt-3">
                        {item.review}
                      </p>

                      {item.user &&
                      isAuthenticate() &&
                      item.user._id === isAuthenticate().user._id ? (
                        <div className="mt-3">
                          <button
                            onClick={(e) =>
                              deleteReview(
                                item._id,
                                data.singleProductDetail._id,
                                fetchData,
                                setFdata
                              )
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete Review
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl py-10 text-center text-gray-500 text-sm">
            No Review found
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AllReviews;