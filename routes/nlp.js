const { processText } = require("../controllers/controller_nlp")

const router = require("express").Router()

router.post('/validate', processText)

module.exports = router