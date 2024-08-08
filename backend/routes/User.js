const express = require("express")
const { submitDocument } = require("../controllers/User")
const router = express.Router()

router.post("/submitDocument", submitDocument)


module.exports = router