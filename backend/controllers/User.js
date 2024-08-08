const Document = require('../models/document');
const User = require('../models/user');

exports.submitDocument = async (req, res) => {
  try {
    const { firstName, lastName, email, dob, residentialAddress1, residentialAddress2, permanentAddress1, permanentAddress2, fileNames, fileTypes } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files were uploaded.'
      });
    }

    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const document = new Document({
        fileName: fileNames[i] || file.originalname,
        typeOfFile: fileTypes[i] || file.mimetype,
        document: file.path
      });
      await document.save();
      uploadedFiles.push(document._id);
    }

    const user = new User({
      firstName,
      lastName,
      email,
      dateOfBirth: dob,
      residentialAddress: residentialAddress1 + ' ' + residentialAddress2,
      permanentAddress: permanentAddress1 + ' ' + permanentAddress2,
      uploadedDocuments: uploadedFiles
    });

    await user.save();
    return res.status(201).json({
      success: true,
      message: 'Documents and user information saved successfully',
      data: user
    });
  } catch (error) {
    console.error('Error submitting document:', error);
    return res.status(500).json({
      success: false,
      message: 'Error saving document and user information',
      error: error.message
    });
  }
};
