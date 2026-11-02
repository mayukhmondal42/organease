import React, { Fragment, useState } from "react";
import Layout from "../layout";

const ContactUs = () => {
  const [sent, setSent] = useState(false);

  return (
    <Fragment>
      <Layout>
        <div className="pt-40 md:pt-32 px-4 md:px-6 pb-16 min-h-screen bg-gray-50">
          <div className="text-center mb-8">
            <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">CONTACT US</span>
            <h1 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight">Get in Touch</h1>
            <p className="text-gray-500 mt-2">OrganEase - Organ Donation & Request</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white shadow-sm border rounded-[24px] p-6">
              <h2 className="text-lg font-bold mb-5">Our Details</h2>
              <div className="space-y-3 text-[15px]">
                <p className="flex justify-between bg-gray-50 p-3 rounded-xl"><span className="text-gray-500">Name</span><b>Mayukh Mondal</b></p>
                <p className="flex justify-between bg-gray-50 p-3 rounded-xl"><span className="text-gray-500">Location</span><b className="text-right">Jalpaiguri, West Bengal</b></p>
                <p className="flex justify-between bg-gray-50 p-3 rounded-xl"><span className="text-gray-500">Phone</span><a href="tel:+918101308803" className="font-bold">+91 81013 08803</a></p>
                <p className="flex justify-between bg-gray-50 p-3 rounded-xl"><span className="text-gray-500">Email</span><a href="mailto:mayukhmondal42@gmail.com" className="font-bold text-xs mt-1">mayukhmondal42@gmail.com</a></p>
                <p className="flex justify-between bg-gray-50 p-3 rounded-xl"><span className="text-gray-500">Time</span><b>Mon - Sat, 9 AM - 6 PM</b></p>
              </div>

              <a href="https://wa.me/918101308803" target="_blank" rel="noreferrer" className="mt-5 block text-center bg-green-500 text-white py-3.5 rounded-full font-bold">WhatsApp Us</a>
              <div className="flex justify-center mt-2">
                <a href="https://www.linkedin.com/in/mayukh-mondal42" target="_blank" rel="noreferrer" style={{ backgroundColor: "#0A66C2" }} className="w-1/2 block text-center bg-blue-600 text-white py-3 rounded-full font-bold text-sm">LinkedIn</a>
              </div>
            </div>

            <div className="bg-white shadow-sm border rounded-[24px] p-6">
              <h2 className="text-lg font-bold mb-5">Send Message</h2>
              {sent ? (
                <div className="bg-green-50 border border-green-100 text-green-700 p-4 rounded-xl font-medium text-center">✅ Message Sent! Mayukh will reply soon.</div>
              ) : (
                <form onSubmit={(e)=>{e.preventDefault(); setSent(true);}} className="space-y-3">
                  <input required placeholder="Your Name" className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none p-3.5 rounded-xl text-[15px]" />
                  <input required placeholder="Your Phone" className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none p-3.5 rounded-xl text-[15px]" />
                  <textarea required placeholder="Your Message" rows="4" className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none p-3.5 rounded-xl text-[15px]"></textarea>
                  <button className="w-full bg-black text-white py-3.5 rounded-full font-bold hover:bg-gray-800">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default ContactUs;