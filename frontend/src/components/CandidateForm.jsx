import React, { useState } from "react";
import { GoUpload } from "react-icons/go";
import { FaSquarePlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

const CandidateForm = () => {
  const [documents, setDocuments] = useState([{ id: Date.now() }]);

  const addDocument = () => {
    setDocuments([...documents, { id: Date.now() }]);
  };

  const removeDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <div className="w-full h-auto">
      <div className="w-[50%] h-auto mx-auto">
        <h1 className="text-2xl w-[90%] font-bold mb-8 text-center">Candidate Form</h1>
        <form className="w-[100%] mx-auto flex flex-col">
          {/* Firstname and lastname*/}
          <div className="flex w-[90%] mx-auto gap-5">
            <div className="flex flex-col mb-4">
              <label className="font-bold">
                First Name <sup className="text-red-600 font-bold">*</sup>
              </label>
              <input
                placeholder="Enter your first name here..."
                type="text"
                className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                name="firstName"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="font-bold">
                Last Name <sup className="text-red-600 font-bold">*</sup>
              </label>
              <input
                placeholder="Enter your last name here..."
                type="text"
                className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                name="lastName"
              />
            </div>
          </div>

          {/* email and dob  */}
          <div className="flex w-[90%] mx-auto gap-5">
            <div className="flex flex-col mb-4">
              <label className="font-bold">
                Email <sup className="text-red-600 font-bold">*</sup>
              </label>
              <input
                placeholder="ex: myname@example.com"
                type="email"
                className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                name="email"
              />
            </div>
            <div className="flex flex-col mb-4 relative">
              <label className="font-bold">
                Date of Birth <sup className="text-red-600 font-bold">*</sup>
              </label>
              <div className="relative w-full">
                <input
                  type="date"
                  className={`w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent text-gray-500`}
                  name="dateOfBirth"
                />
              </div>
            </div>
          </div>

          {/* residential address  */}
          <div className="flex flex-col mx-auto w-[90%] mb-6">
            <label className="font-bold">
              Residential Address{" "}
              <sup className="text-red-600 font-bold">*</sup>
            </label>

            <div className="flex gap-5">
              <div className="flex flex-col mb-4 mt-2">
                <label className="font">
                  Street 1 <sup className="text-red-600 font-bold">*</sup>
                </label>
                <input
                  placeholder="Enter your street address here..."
                  type="text"
                  className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                  name="residentialStreet1"
                />
              </div>
              <div className="flex flex-col mb-4 mt-2 relative">
                <label className="font">
                  Street 2<sup className="text-red-600 font-bold">*</sup>
                </label>
                <div className="relative w-full">
                  <input
                    placeholder="Enter your street address here..."
                    type="text"
                    className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                    name="residentialStreet2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* checkbox */}
          <div className="flex w-[90%] gap-2 mx-auto font-bold mb-4">
            <input type="checkbox" className="w-4" />
            <label>Same as residential address</label>
          </div>

          {/* Permanent address  */}
          <div className="flex flex-col mx-auto w-[90%]">
            <label className="font-bold">
              Permanent Address{" "}
              <sup className="text-red-600 font-bold">*</sup>
            </label>

            <div className="flex gap-5">
              <div className="flex flex-col mb-3 mt-2">
                <label className="font">
                  Street 1 <sup className="text-red-600 font-bold">*</sup>
                </label>
                <input
                  placeholder="Enter your street address here..."
                  type="text"
                  className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                  name="permanentStreet1"
                />
              </div>
              <div className="flex flex-col mb-4 mt-2 relative">
                <label className="font">
                  Street 2<sup className="text-red-600 font-bold">*</sup>
                </label>
                <div className="relative w-full">
                  <input
                    placeholder="Enter your street address here..."
                    type="text"
                    className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                    name="permanentStreet2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mx-auto w-[90%] mb-6">
            <label className="font-bold">
              Upload Documents <sup className="text-red-600 font-bold">*</sup>
            </label>

            {documents.map((doc) => (
              <div className="flex gap-4 uploadPlusDocument" key={doc.id}>
                <div className="flex flex-col">
                  <label>
                    File Name <sup className="text-red-600 font-bold">*</sup>{" "}
                  </label>
                  <input
                    type="text"
                    className="w-[11rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                  />
                </div>

                <div className="flex flex-col">
                  <label>
                    Type of File <sup className="text-red-600 font-bold">*</sup>
                  </label>
                  <input
                    type="text"
                    className="w-[11rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                  />
                  <span>{"(image, pdf.)"}</span>
                </div>
                <div className="flex flex-col">
                  <label>
                    Upload Document{" "}
                    <sup className="text-red-600 font-bold">*</sup>{" "}
                  </label>
                  <div className="flex relative">
                    <input
                      type="text"
                      className="w-[11rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                    />
                    <GoUpload
                      className="absolute left-[9.4rem] top-[0.4rem] font-bold"
                      size={20}
                    />
                  </div>
                </div>
                <div className="relative">
                  <FaSquarePlus size={30} className="absolute top-6 cursor-pointer" onClick={addDocument} />
                  {documents.length > 1 && (
                    <RiDeleteBin6Line
                      size={30}
                      className="absolute top-6 right-[-40px] text-black cursor-pointer"
                      onClick={() => removeDocument(doc.id)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="w-[90%] flex justify-center items-center mb-10">
            <button className="bg-gray-800 p-2 text-white px-20">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;
