import React, { useState } from "react";
import { GoUpload } from "react-icons/go";
import { FaSquarePlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';

const CandidateForm = () => {
  const [documents, setDocuments] = useState([{ id: 1 }, { id: 2 }]);
  const [sameAsResidential, setSameAsResidential] = useState(false);

  // const [fileType, setFileType] =useState(false)
  // function handleFileType(){
  //   setFileType(true)
  // }
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    residentialAddress1: "",
    residentialAddress2: "",
    permanentAddress1: "",
    permanentAddress2: "",
    files: [], // Array to store file objects and metadata
    fileNames: [], // Array to store file names
    fileTypes: [] // Array to store file types
  });

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const newFiles = [...formData.files];
    newFiles[index] = file;
    setFormData({ ...formData, files: newFiles });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleArrayInputChange = (event, index, arrayName) => {
    const { value } = event.target;
    const updatedArray = [...formData[arrayName]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [arrayName]: updatedArray
    });
  };

  const handleSameAsResidentialChange = () => {
    setSameAsResidential(!sameAsResidential);
  };

  const addDocument = () => {
    const newId = documents.length + 1;
    setDocuments([...documents, { id: newId }]);
    setFormData({
      ...formData,
      files: [...formData.files, null],
      fileNames: [...formData.fileNames, ""],
      fileTypes: [...formData.fileTypes, ""]
    });
  };

  const deleteDocument = (id) => {
    if (documents.length === 2) {
      return; // Prevent deleting the last permanent document
    }
    setDocuments(documents.filter((doc) => doc.id !== id));
    setFormData({
      ...formData,
      files: formData.files.filter((_, index) => index !== id - 1),
      fileNames: formData.fileNames.filter((_, index) => index !== id - 1),
      fileTypes: formData.fileTypes.filter((_, index) => index !== id - 1),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare form data
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "files") {
        formData.files.forEach((file, index) => {
          if (file) {
            formDataToSubmit.append('files', file);
            formDataToSubmit.append(`fileNames[${index}]`, formData.fileNames[index]);
            formDataToSubmit.append(`fileTypes[${index}]`, formData.fileTypes[index]);
          }
        });
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/submitDocument', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Form Data Submitted:", response.data);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };
  
  return (
    <div className="w-full h-auto bg-slate-100">
      <div className="w-[50%] h-auto mx-auto">
        <h1 className="text-2xl text-[#3C3C3C] w-[90%] font-bold mb-8 text-center">
          Candidate Form
        </h1>
        <form className="w-[100%] mx-auto flex flex-col" onSubmit={handleSubmit}>
          {/* Firstname and lastname */}
          <div className="flex w-[90%] mx-auto gap-5">
            <div className="flex flex-col mb-4">
              <label className="font-bold text-[#3C3C3C]">
                First Name <sup className="text-red-600 font-bold">*</sup>
              </label>
              <input
                placeholder="Enter your first name here..."
                type="text"
                className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="font-bold text-[#3C3C3C]">
                Last Name <sup className="text-red-600 font-bold">*</sup>
              </label>
              <input
                placeholder="Enter your last name here..."
                type="text"
                className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* email and dob */}
          <div className="flex w-[90%] mx-auto gap-5">
            <div className="flex flex-col mb-4">
              <label className="font-bold text-[#3C3C3C]">
                Email <sup className="text-red-600 font-bold">*</sup>
              </label>
              <input
                placeholder="ex: myname@example.com"
                type="email"
                className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col mb-4 relative">
              <label className="font-bold text-[#3C3C3C]">
                Date of Birth <sup className="text-red-600 font-bold">*</sup>
              </label>
              <div className="relative w-full">
                <input
                  type="date"
                  className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent text-gray-500"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* residential address */}
          <div className="flex flex-col mx-auto w-[90%] mb-6">
            <label className="font-bold text-[#3C3C3C]">
              Residential Address{" "}
              <sup className="text-red-600 font-bold">*</sup>
            </label>

            <div className="flex gap-5">
              <div className="flex flex-col mb-4 mt-2">
                <label className="font text-[#3C3C3C]">
                  Street 1 <sup className="text-red-600 font-bold">*</sup>
                </label>
                <input
                  placeholder="Enter your street address here..."
                  type="text"
                  className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                  name="residentialAddress1"
                  value={formData.residentialAddress1}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col mb-4 mt-2 relative">
                <label className="font text-[#3C3C3C]">
                  Street 2<sup className="text-red-600 font-bold">*</sup>
                </label>
                <div className="relative w-full">
                  <input
                    placeholder="Enter your street address here..."
                    type="text"
                    className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                    name="residentialAddress2"
                    value={formData.residentialAddress2}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Same as Residential checkbox */}
          <div className="flex w-[90%] gap-2 mx-auto font-bold mb-4">
            <input
              type="checkbox"
              className="w-4"
              checked={sameAsResidential}
              onChange={handleSameAsResidentialChange}
            />
            <label className=" text-[#3C3C3C]">
              Same as residential address
            </label>
          </div>

          {/* Permanent Address */}
          <div
            className={`flex flex-col mx-auto w-[90%] ${
              sameAsResidential ? "" : "mb-6"
            }`}
          >
            <label className="font-bold text-[#3C3C3C]">
              Permanent Address{" "}
              {sameAsResidential ? "" : <sup className="text-red-600 font-bold">*</sup>}
            </label>

            <div className="flex gap-5">
              <div className="flex flex-col mb-3 mt-2">
                <label className="font text-[#3C3C3C]">
                  Street 1{" "}
                  {sameAsResidential ? "" : <sup className="text-red-600 font-bold">*</sup>}
                </label>
                <input
                  placeholder="Enter your street address here..."
                  type="text"
                  className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                  name="permanentAddress1"
                  value={formData.permanentAddress1}
                  onChange={handleInputChange}
                  required={!sameAsResidential}
                />
              </div>
              <div className="flex flex-col mb-3 mt-2 relative">
                <label className="font text-[#3C3C3C]">
                  Street 2{" "}
                  {sameAsResidential ? "" : <sup className="text-red-600 font-bold">*</sup>}
                </label>
                <div className="relative w-full">
                  <input
                    placeholder="Enter your street address here..."
                    type="text"
                    className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                    name="permanentAddress2"
                    value={formData.permanentAddress2}
                    onChange={handleInputChange}
                    required={!sameAsResidential}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Upload Documents */}
          {documents.map((doc, index) => (
            <div key={doc.id} className="flex flex-col mx-auto w-[90%] mb-6">
              <label className="font-bold text-[#3C3C3C]">
                Upload Document {index + 1}{" "}
                <sup className="text-red-600 font-bold">*</sup>
              </label>

              <div className="flex gap-4">
                <div className="flex flex-col">
                  <label className="text-[#3C3C3C]">
                    File Name <sup className="text-red-600 font-bold">*</sup>{" "}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-[11rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                    value={formData.fileNames[index] || ""}
                    onChange={(e) => handleArrayInputChange(e, index, 'fileNames')}
                    name="fileNames"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[#3C3C3C]">
                    Type of File <sup className="text-red-600 font-bold">*</sup>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-[11rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                    value={formData.fileTypes[index] || ""}
                    onChange={(e) => handleArrayInputChange(e, index, 'fileTypes')}
                    name="fileTypes"
                  />
                  <span>{"(image, pdf.)"}</span>
                </div>

                <div className="flex flex-col">
                  <label className="text-[#3C3C3C]" htmlFor={`files_${index}`}>
                    Upload Document{" "}
                    <sup className="text-red-600 font-bold">*</sup>{" "}
                  </label>
                  <div className="flex relative">
                    <input
                      id={`files_${index}`}
                      type="file"
                      // type={fileType ? "file" : "text"}
                      // onClick={handleFileType}
                      onChange={(event) => handleFileChange(event, index)}
                      className="w-[11rem] px-4 py-1 border bg-white border-gray-300 rounded-md focus:border-transparent input-files"
                    />
                    <label htmlFor={`files_${index}`} className="file-input-label">
                      <GoUpload
                        className="absolute left-[9rem] top-[0.4rem] font-bold"
                        size={20}
                      />
                      <span className="sr-only">Upload file</span>
                    </label>
                  </div>
                </div>

                {/* Render plus icon for the first document only */}
                {index === 0 && (
                  <div className="relative">
                    <FaSquarePlus
                      size={30}
                      className="absolute top-6"
                      onClick={addDocument}
                    />
                  </div>
                )}

                {/* Render delete icon for all documents except the first */}
                {index > 0 && (
                  <div className="relative">
                    <RiDeleteBin6Line
                      size={30}
                      className="absolute top-6 text-black cursor-pointer"
                      onClick={() => deleteDocument(doc.id)}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="w-[90%] flex justify-center items-center mb-10">
            <button type="submit" className="bg-[#3C3C3C] p-2 text-white px-20">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;
