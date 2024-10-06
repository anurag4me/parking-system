import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const defaultContact = {
    username: "",
    email: "",
    message: "",
  };
  const [contact, setContact] = useState(defaultContact);

  const navigate = useNavigate();
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContact);
        alert("Feedback sent successfully.");
        navigate("/");
      } else alert("Invalid Credentials");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      id="feedback"
      className="text-black"
    >
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238132.6728888523!2d72.65748223205493!3d21.15944056645878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1715166752866!5m2!1sen!2sin"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
            loading="lazy"
          ></iframe>
          <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-white-900 tracking-widest text-xs">
                ADDRESS
              </h2>
              <p className="mt-1">
                C.K. Pithawala college of engineering and technology near surat
                airport, Surat, Gujarat, India
              </p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-white-900 tracking-widest text-xs">
                EMAIL
              </h2>
              <a className="text-indigo-500 leading-relaxed">
                example@email.com
              </a>
              <h2 className="title-font font-semibold text-white-900 tracking-widest text-xs mt-4">
                PHONE
              </h2>
              <p className="leading-relaxed">123-456-7890</p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="lg:w-1/3 md:w-1/2 bg-gray-300 flex flex-col md:ml-auto w-full md:py-8 mt-8 p-8 md:mt-0"
        >
          <h2 className="text-white-900 text-lg mb-1 font-medium title-font">
            Contact Us
          </h2>
          <p className="leading-relaxed mb-5 text-white-600">
            Let us know your concerns to us
          </p>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-white-600">
              Userame
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={contact.username}
              onChange={handleInput}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-white-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={contact.email}
              onChange={handleInput}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-white-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={contact.message}
              onChange={handleInput}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-white-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Button
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
