const router = require("express").Router()
const {generateImage} = require("../controllers/controller_prodia")

router.get('/',generateImage);

module.exports = router;