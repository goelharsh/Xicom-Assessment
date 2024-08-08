import React, { useState } from "react";
import { GoUpload } from "react-icons/go";
import { FaSquarePlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    residentialStreet1: "",
    residentialStreet2: "",
    permanentStreet1: "",
    permanentStreet2: "",
  });

  const [documents, setDocuments] = useState([{ id: 1, file: null, fileName: "", fileType: "" }]);
  const [sameAsResidential, setSameAsResidential] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (index, e) => {
    const newDocuments = [...documents];
    newDocuments[index].file = e.target.files[0];
    setDocuments(newDocuments);
  };

  const handleSameAsResidentialChange = () => {
    setSameAsResidential(!sameAsResidential);
  };

  const addDocument = () => {
    const newId = documents.length + 1;
    setDocuments([...documents, { id: newId, file: null, fileName: "", fileType: "" }]);
  };

  const deleteDocument = (id) => {
    if (documents.length === 1) return;
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    
    documents.forEach((doc, index) => {
      if (doc.file) {
        data.append('documents', doc.file);
        data.append(`documents[${index}].fileName`, doc.fileName);
        data.append(`documents[${index}].fileType`, doc.fileType);
      }
    });

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/submitDocument", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response)
      alert("Documents submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting documents.");
    }
  };

  return (
    <div className="w-full h-auto">
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
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email and dob */}
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
                onChange={handleChange}
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
                  className={`w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent text-gray-500`}
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Residential address */}
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
                  name="residentialStreet1"
                  value={formData.residentialStreet1}
                  onChange={handleChange}
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
                    name="residentialStreet2"
                    value={formData.residentialStreet2}
                    onChange={handleChange}
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
            <label className=" text-[#3C3C3C]">Same as residential address</label>
          </div>

          {/* Permanent Address */}
          <div
            className={`flex flex-col mx-auto w-[90%] ${
              sameAsResidential ? "" : "mb-6"
            }`}
          >
            <label className="font-bold text-[#3C3C3C]">
              Permanent Address{" "}
              {sameAsResidential ? (
                ""
              ) : (
                <sup className="text-red-600 font-bold">*</sup>
              )}
            </label>

            <div className="flex gap-5">
              <div className="flex flex-col mb-3 mt-2">
                <label className="font text-[#3C3C3C]">
                  Street 1{" "}
                  {sameAsResidential ? (
                    ""
                  ) : (
                    <sup className="text-red-600 font-bold">*</sup>
                  )}
                </label>
                <input
                  placeholder="Enter your street address here..."
                  type="text"
                  className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                  name="permanentStreet1"
                  value={formData.permanentStreet1}
                  onChange={handleChange}
                  required={!sameAsResidential}
                />
              </div>
              <div className="flex flex-col mb-4 mt-2 relative">
                <label className="font text-[#3C3C3C]">
                  Street 2{" "}
                  {sameAsResidential ? (
                    ""
                  ) : (
                    <sup className="text-red-600 font-bold">*</sup>
                  )}
                </label>
                <div className="relative w-full">
                  <input
                    placeholder="Enter your street address here..."
                    type="text"
                    className="w-[18rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                    name="permanentStreet2"
                    value={formData.permanentStreet2}
                    onChange={handleChange}
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
                  <label className=" text-[#3C3C3C]">
                    File Name <sup className="text-red-600 font-bold">*</sup>{" "}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-[11rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                    value={doc.fileName}
                    onChange={(e) => {
                      const newDocuments = [...documents];
                      newDocuments[index].fileName = e.target.value;
                      setDocuments(newDocuments);
                    }}
                  />
                </div>

                <div className="flex flex-col">
                  <label className=" text-[#3C3C3C]">
                    Type of File <sup className="text-red-600 font-bold">*</sup>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-[11rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                    value={doc.fileType}
                    onChange={(e) => {
                      const newDocuments = [...documents];
                      newDocuments[index].fileType = e.target.value;
                      setDocuments(newDocuments);
                    }}
                  />
                  <span>{"(image, pdf.)"}</span>
                </div>

                <div className="flex flex-col">
                  <label className=" text-[#3C3C3C]">
                    Upload Document{" "}
                    <sup className="text-red-600 font-bold">*</sup>{" "}
                  </label>
                  <div className="flex relative">
                    <input
                      type="file"
                      required
                      className="w-[11rem] px-4 py-1 border border-gray-300 rounded-md focus:border-transparent"
                      onChange={(e) => handleFileChange(index, e)}
                    />
                    <GoUpload
                      className="absolute left-[9.4rem] top-[0.4rem] font-bold"
                      size={20}
                    />
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
            <button type="submit" className="bg-[#3C3C3C] p-2 text-white px-20">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;
