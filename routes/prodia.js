const router = require("express").Router()
const {generateImage} = require("../controllers/controller_prodia")

router.post('/',generateImage);
router.post('/test', (req, res) => {
    res.send(`req.body:----> ${req.body}  prompUser:----> ${req.body.prompUser}`)
    });

module.exports = router;