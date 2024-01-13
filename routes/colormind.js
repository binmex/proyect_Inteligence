const router = require("express").Router()
const {generateColor} = require("../controllers/controller_colormind")

router.get('/',generateColor);

module.exports = router;