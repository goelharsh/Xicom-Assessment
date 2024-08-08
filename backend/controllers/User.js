const cloudinary = require("cloudinary").v2; // Import Cloudinary
const Document = require('../models/document');
const User = require("../models/User")

exports.submitDocument = async (req, res) => {
  try {
    const {
      firstName, lastName, email, dateOfBirth,
      residentialStreet1, residentialStreet2,
      permanentStreet1, permanentStreet2,
      documents
    } = req.body; 
    console.log(firstName, lastName, email, dateOfBirth,
      residentialStreet1, residentialStreet2,
      permanentStreet1, permanentStreet2,
      documents)
    // Validate required fields
    if (!firstName || !lastName || !email || !dateOfBirth || !residentialStreet1 || !residentialStreet2) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields"
      });
    }

    // Check if the user is at least 18 years old
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      return res.status(400).json({
        success: false,
        message: "User must be at least 18 years old"
      });
    }

    // Handle file uploads
    const uploadedDocs = [];
    for (const doc of documents) {
      if (doc.file) {
        const uploadResponse = await cloudinary.uploader.upload(doc.file.tempFilePath, {
          folder: "candidate_documents",
          resource_type: "auto"
        });
        
        // Create new Document entry
        const newDocument = new Document({
          fileName: doc.fileName,
          typeOfFile: doc.fileType,
          document: uploadResponse.secure_url
        });
        await newDocument.save();

        uploadedDocs.push(newDocument._id);
      }
    }

    // Save candidate data
    const newUser = new User({
      firstName,
      lastName,
      email,
      dateOfBirth,
      residentialAddress: `${residentialStreet1}, ${residentialStreet2}`,
      permanentAddress: `${permanentStreet1 || "N/A"}, ${permanentStreet2 || "N/A"}`,
      uploadedDocuments: uploadedDocs
    });
    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "Documents submitted successfully",
      data: {
        firstName,
        lastName,
        email,
        dateOfBirth,
        residentialAddress: { street1: residentialStreet1, street2: residentialStreet2 },
        permanentAddress: { street1: permanentStreet1, street2: permanentStreet2 },
        documents: uploadedDocs
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to submit documents. Please try again later."
    });
  }
};
