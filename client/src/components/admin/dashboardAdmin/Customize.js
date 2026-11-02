import React, { Fragment, useContext, useEffect } from "react";
import { DashboardContext } from "./";
import { uploadImage, sliderImages, deleteImage } from "./Action";

const apiURL = process.env.REACT_APP_API_URL;

const Customize = () => {
  const { data, dispatch } = useContext(DashboardContext);

  return (
    <Fragment>
      <div className="m-4 md:w-1/2">
        {!data.uploadSliderBtn ? (
          <button
            onClick={(e) => dispatch({ type: "uploadSliderBtn", payload: !data.uploadSliderBtn })}
            style={{ background: "#303031" }}
            className="cursor-pointer rounded-xl px-4 py-3 flex items-center gap-2 text-white text-sm font-semibold hover:bg-black hover:shadow-md transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
            Customize Slider Image
          </button>
        ) : ""}
      </div>
      {data.uploadSliderBtn ? <UploadImageSection /> : ""}
    </Fragment>
  );
};

const UploadImageSection = () => {
  const { data, dispatch } = useContext(DashboardContext);
  const uploadImageHandler = (image) => uploadImage(image, dispatch);

  return (
    <Fragment>
      <div className="relative m-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Site Slider Images</h1>
            <p className="text-xs text-gray-400 mt-0.5">Upload & manage homepage banner</p>
          </div>
          <button onClick={(e) => dispatch({ type: "uploadSliderBtn", payload: !data.uploadSliderBtn })} style={{ background: "#303031" }} className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-black transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <label className="relative inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-gray-900 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Upload File
          <input onChange={(e) => uploadImageHandler(e.target.files[0])} name="image" accept=".jpg,.png,.jpeg,.gif,.bmp,.tif,.tiff|image/*" className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
        </label>

        <AllImages />
      </div>
    </Fragment>
  );
};

const AllImages = () => {
  const { data, dispatch } = useContext(DashboardContext);

  useEffect(() => {
    sliderImages(dispatch);
  }, []);

  const deleteImageReq = (id) => deleteImage(id, dispatch);

  return (
    <Fragment>
      {data.imageUpload ? (
        <div className="flex items-center justify-center p-8">
          <div className="w-10 h-10 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : ""}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
        {data.sliderImages.length > 0 ? (
          data.sliderImages.map((item, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden border border-gray-100 group">
              <img className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" src={`${apiURL}/uploads/customize/${item.slideImage}`} alt="sliderImages" />
              <button onClick={(e) => deleteImageReq(item._id)} className="absolute top-2 right-2 w-7 h-7 bg-black/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 bg-orange-50 border border-orange-100 rounded-xl text-sm font-medium text-orange-700">
            No slide image found
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Customize;