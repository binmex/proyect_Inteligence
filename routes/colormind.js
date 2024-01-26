const router = require("express").Router()
const {generateColor,listModels} = require("../controllers/controller_colormind")

router.get('/',generateColor);
router.get('/listModels',listModels)

module.exports = router;